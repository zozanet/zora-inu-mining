import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MiningSession {
  id: string
  name: string
  start: number
  end: number
  baseReward: number
  completed: boolean
  startTime?: number
  progress: number
  earned: number
}

interface MiningState {
  activeSession: MiningSession | null
  sessions: MiningSession[]
  minedToday: number
  totalMined: number
  isMining: boolean
}

const initialSessions: MiningSession[] = [
  { id: "dawn-hunt", name: "Dawn Hunt", start: 0, end: 8, baseReward: 10, completed: false, progress: 0, earned: 0 },
  { id: "day-hunt", name: "Day Hunt", start: 9, end: 17, baseReward: 10, completed: false, progress: 0, earned: 0 },
  { id: "night-hunt", name: "Night Hunt", start: 18, end: 23, baseReward: 10, completed: false, progress: 0, earned: 0 }
]

const initialState: MiningState = {
  activeSession: null,
  sessions: initialSessions,
  minedToday: 0,
  totalMined: 0,
  isMining: false
}

export const miningSlice = createSlice({
  name: "mining",
  initialState,
  reducers: {
    startMiningSession: (state, action: PayloadAction<{ sessionId: string; multiplier: number }>) => {
      const { sessionId, multiplier } = action.payload
      const session = state.sessions.find(s => s.id === sessionId)
      
      if (session && !session.completed && !state.activeSession) {
        state.activeSession = { ...session, startTime: Date.now(), progress: 0, earned: 0 }
        state.isMining = true
      }
    },
    updateMiningProgress: (state) => {
      if (state.activeSession && state.activeSession.startTime) {
        const elapsedHours = (Date.now() - state.activeSession.startTime) / (1000 * 60 * 60)
        state.activeSession.progress = Math.min(elapsedHours, 9)
        state.activeSession.earned = state.activeSession.baseReward * (state.activeSession.progress / 9)
      }
    },
    completeMiningSession: (state) => {
      if (state.activeSession) {
        const session = state.sessions.find(s => s.id === state.activeSession!.id)
        if (session) session.completed = true
        
        state.minedToday += state.activeSession.earned
        state.totalMined += state.activeSession.earned
        state.activeSession = null
        state.isMining = false
      }
    },
    resetDailyMining: (state) => {
      state.minedToday = 0
      state.sessions.forEach(session => {
        session.completed = false
        session.progress = 0
      })
      state.activeSession = null
      state.isMining = false
    }
  },
})

export const { startMiningSession, updateMiningProgress, completeMiningSession, resetDailyMining } = miningSlice.actions
export default miningSlice.reducer
