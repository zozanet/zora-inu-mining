import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { initializeUser } from "../../store/slices/userSlice"

const DashboardTab: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const mining = useSelector((state: RootState) => state.mining)
  const tasks = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    if (!user.id) {
      const tg = (window as any).Telegram?.WebApp
      const tgUser = tg?.initDataUnsafe?.user
      dispatch(initializeUser({ 
        username: tgUser?.username || tgUser?.first_name || "Hunter" 
      }))
    }
  }, [dispatch, user.id])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-inu-red">Zora Inu Pack</h1>
        <p className="text-gray-600">Welcome, {user.username}!</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <div className="text-4xl font-bold text-inu-red mb-2">
          {user.balance.toLocaleString()}
        </div>
        <div className="text-gray-600">$ZIN Collected</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-inu-red">{mining.sessions.filter(s => s.completed).length}/3</div>
          <div className="text-sm text-gray-600">Hunts Today</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{tasks.tasks.filter(t => t.completed).length}</div>
          <div className="text-sm text-gray-600">Tasks Done</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTab
