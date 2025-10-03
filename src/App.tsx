import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"
import DashboardTab from "./components/tabs/DashboardTab"
import MiningTab from "./components/tabs/MiningTab"
import RefsTab from "./components/tabs/RefsTab"
import TasksTab from "./components/tabs/TasksTab"
import WalletTab from "./components/tabs/WalletTab"
import TabNavigation from "./components/common/TabNavigation"

function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
    }
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />
      case "mining": return <MiningTab />
      case "refs": return <RefsTab />
      case "tasks": return <TasksTab />
      case "wallet": return <WalletTab />
      default: return <DashboardTab />
    }
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 font-sans">
        <div className="container mx-auto px-4 py-6 pb-24">
          {renderTab()}
        </div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Provider>
  )
}

export default App
