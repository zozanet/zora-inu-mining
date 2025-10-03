import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { startMiningSession, completeMiningSession } from "../../store/slices/miningSlice"
import { updateBalance, completeSession } from "../../store/slices/userSlice"

const MiningTab: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const mining = useSelector((state: RootState) => state.mining)

  const handleStartSession = (sessionId: string) => {
    dispatch(startMiningSession({ sessionId, multiplier: user.multiplier }))
  }

  const handleCompleteSession = () => {
    if (mining.activeSession) {
      const finalReward = mining.activeSession.earned * user.multiplier
      dispatch(completeMiningSession())
      dispatch(updateBalance(finalReward))
      dispatch(completeSession())
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-inu-red text-center">Hunting Grounds</h2>

      {mining.activeSession && (
        <div className="bg-gradient-to-r from-inu-red to-orange-500 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg">Active: {mining.activeSession.name}</h3>
          <p>Progress: {(mining.activeSession.progress / 9 * 100).toFixed(1)}%</p>
          <button onClick={handleCompleteSession} className="w-full bg-white text-inu-red py-3 rounded-xl font-bold mt-4">
            Complete Hunt ({(mining.activeSession.earned * user.multiplier).toFixed(1)} $ZIN)
          </button>
        </div>
      )}

      <div className="space-y-4">
        {mining.sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{session.name}</h3>
                <p className="text-gray-600">{session.start}:00 - {session.end}:59 UTC</p>
                <p className="text-inu-red font-bold">{session.baseReward * user.multiplier} $ZIN</p>
              </div>
              {!session.completed && !mining.activeSession && (
                <button 
                  onClick={() => handleStartSession(session.id)}
                  className="bg-inu-red text-white px-4 py-2 rounded-lg"
                >
                  Start Hunt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiningTab
