import React from "react"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", icon: "??", label: "Den" },
    { id: "mining", icon: "??", label: "Hunt" },
    { id: "refs", icon: "??", label: "Pack" },
    { id: "tasks", icon: "?", label: "Tasks" },
    { id: "wallet", icon: "??", label: "Vault" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === tab.id ? "text-inu-red" : "text-gray-500"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && <div className="w-1 h-1 bg-inu-red rounded-full"></div>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation
