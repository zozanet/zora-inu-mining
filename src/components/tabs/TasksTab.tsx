import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { completeTask } from "../../store/slices/tasksSlice"
import { updateBalance } from "../../store/slices/userSlice"

const TasksTab: React.FC = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks)
  const user = useSelector((state: RootState) => state.user)

  const handleCompleteTask = (taskId: string, reward: number) => {
    dispatch(completeTask({ taskId, multiplier: user.multiplier }))
    dispatch(updateBalance(reward * user.multiplier))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-inu-red text-center">Pack Activities</h2>

      <div className="space-y-4">
        {tasks.tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-inu-red font-bold">{task.reward * user.multiplier} $ZIN</p>
              </div>
              <button
                onClick={() => handleCompleteTask(task.id, task.reward)}
                disabled={task.completed}
                className={`px-4 py-2 rounded-lg font-bold ${
                  task.completed ? "bg-gray-300" : "bg-inu-red text-white"
                }`}
              >
                {task.completed ? "?" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TasksTab
