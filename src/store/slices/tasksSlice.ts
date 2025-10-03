import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  type: "ad" | "social" | "learning" | "community"
}

interface TasksState {
  tasks: Task[]
  earnedToday: number
}

const initialState: TasksState = {
  tasks: [
    { id: "ad-1", title: "Watch Ad #1", description: "Watch a short video", reward: 5, completed: false, type: "ad" },
    { id: "ad-2", title: "Watch Ad #2", description: "Watch a short video", reward: 5, completed: false, type: "ad" },
    { id: "social-1", title: "Follow on Twitter", description: "Follow @ZoraInu", reward: 10, completed: false, type: "social" },
    { id: "learn-1", title: "Watch Tutorial", description: "Learn about Zora Inu", reward: 25, completed: false, type: "learning" }
  ],
  earnedToday: 0
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    completeTask: (state, action: PayloadAction<{ taskId: string; multiplier: number }>) => {
      const { taskId, multiplier } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      
      if (task && !task.completed) {
        task.completed = true
        state.earnedToday += task.reward * multiplier
      }
    },
    resetDailyTasks: (state) => {
      state.earnedToday = 0
      state.tasks.forEach(task => {
        task.completed = false
      })
    }
  },
})

export const { completeTask, resetDailyTasks } = tasksSlice.actions
export default tasksSlice.reducer
