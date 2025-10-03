import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import miningReducer from "./slices/miningSlice"
import tasksReducer from "./slices/tasksSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    mining: miningReducer,
    tasks: tasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
