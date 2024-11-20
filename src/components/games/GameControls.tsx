import React from 'react';
import { useGameStore } from '../../lib/store/game';
import { Play, Plus, Minus } from 'lucide-react';

export default function GameControls() {
  const { currentRoom, placeBet } = useGameStore();
  const [betAmount, setBetAmount] = React.useState(currentRoom?.minBet || 0);

  const handleBetChange = (amount: number) => {
    if (!currentRoom) return;
    const newAmount = Math.max(
      currentRoom.minBet,
      Math.min(currentRoom.maxBet, amount)
    );
    setBetAmount(newAmount);
  };

  const handlePlaceBet = () => {
    placeBet(betAmount);
  };

  if (!currentRoom) return null;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleBetChange(betAmount - 100)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <div className="bg-gray-700 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Bet Amount</span>
            <p className="font-semibold">{betAmount} credits</p>
          </div>
          
          <button
            onClick={() => handleBetChange(betAmount + 100)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <button 
          onClick={handlePlaceBet}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Play className="w-5 h-5" />
          Place Bet
        </button>
      </div>
    </div>
  );
}