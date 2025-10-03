import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: string
  username: string
  tier: string
  multiplier: number
  balance: number
  sessionsCompleted: number
  referrals: number
  minedToday: number
  totalMined: number
}

const initialState: UserState = {
  id: "",
  username: "Hunter",
  tier: "INU_PACK",
  multiplier: 1,
  balance: 0,
  sessionsCompleted: 0,
  referrals: 0,
  minedToday: 0,
  totalMined: 0
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<{ username?: string }>) => {
      state.id = "INU_" + Math.random().toString(36).substr(2, 9).toUpperCase()
      state.username = action.payload.username || "Hunter"
      state.tier = "INU_PACK"
      state.multiplier = 1
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload
      state.minedToday += action.payload
      state.totalMined += action.payload
    },
    addReferral: (state) => {
      state.referrals += 1
      state.balance += 200
      state.totalMined += 200
    },
    completeSession: (state) => {
      state.sessionsCompleted += 1
    },
    resetDailyMining: (state) => {
      state.minedToday = 0
    }
  },
})

export const { initializeUser, updateBalance, addReferral, completeSession, resetDailyMining } = userSlice.actions
export default userSlice.reducer
