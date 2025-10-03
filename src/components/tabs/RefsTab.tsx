import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { addReferral } from "../../store/slices/userSlice"

const RefsTab: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [copied, setCopied] = useState(false)

  const referralCode = "ZORA-" + user.id.slice(-8)

  const copyReferralCode = async () => {
    await navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-inu-red text-center">Pack Invitation</h2>

      <div className="bg-white rounded-2xl p-6 text-center">
        <div className="text-3xl font-bold text-inu-red mb-2">{user.referrals}</div>
        <div className="text-gray-600">Pups Recruited</div>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-3">Your Invitation Code</h3>
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 bg-gray-100 p-3 rounded-lg text-center font-mono">
            {referralCode}
          </div>
          <button 
            onClick={copyReferralCode}
            className="bg-inu-red text-white px-4 rounded-lg"
          >
            {copied ? "?" : "??"}
          </button>
        </div>
        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold">
          Share to Telegram
        </button>
      </div>
    </div>
  )
}

export default RefsTab
