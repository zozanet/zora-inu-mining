import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

const WalletTab: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-inu-red text-center">Bone Vault</h2>

      <div className="bg-gradient-to-r from-inu-red to-orange-500 rounded-2xl p-8 text-white text-center">
        <div className="text-5xl font-bold mb-2">
          {user.balance.toLocaleString()}
        </div>
        <div className="text-xl">$ZIN</div>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">Vesting Schedule</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Available at TGE:</span>
            <span className="font-bold">{(user.balance * 0.3).toLocaleString()} $ZIN</span>
          </div>
          <div className="flex justify-between">
            <span>Vesting (3 months):</span>
            <span className="font-bold">{(user.balance * 0.7).toLocaleString()} $ZIN</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletTab
