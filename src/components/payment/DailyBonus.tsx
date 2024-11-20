import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock } from 'lucide-react';
import { useAuthStore } from '../../lib/store/auth';
import { usePaymentStore } from '../../lib/store/payment';
import { toast } from 'sonner';

const BONUS_AMOUNT = 100;
const BONUS_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export default function DailyBonus() {
  const user = useAuthStore((state) => state.user);
  const { transactions, addTransaction } = usePaymentStore();
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    const lastBonus = transactions
      .filter((t) => t.type === 'bonus')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    const updateTimeRemaining = () => {
      if (!lastBonus) {
        setTimeRemaining(0);
        return;
      }

      const elapsed = Date.now() - new Date(lastBonus.timestamp).getTime();
      const remaining = Math.max(0, BONUS_COOLDOWN - elapsed);
      setTimeRemaining(remaining);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [transactions]);

  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const claimBonus = async () => {
    if (!user || timeRemaining > 0) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addTransaction({
        userId: user.id,
        type: 'bonus',
        amount: BONUS_AMOUNT,
        status: 'completed',
        description: 'Daily bonus claimed',
      });

      toast.success(`Claimed ${BONUS_AMOUNT} credits bonus!`);
    } catch (error) {
      toast.error('Failed to claim bonus');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center"
        >
          <Gift className="w-10 h-10 text-purple-400" />
        </motion.div>

        <h2 className="text-2xl font-bold mb-2">Daily Bonus</h2>
        <p className="text-gray-300 mb-6">
          Claim your daily bonus of {BONUS_AMOUNT} credits!
        </p>

        {timeRemaining > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Clock className="w-5 h-5" />
              <span>Next bonus available in: {formatTimeRemaining(timeRemaining)}</span>
            </div>
            <button
              disabled
              className="bg-gray-700 text-gray-400 px-8 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Claim Bonus
            </button>
          </div>
        ) : (
          <button
            onClick={claimBonus}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Claim {BONUS_AMOUNT} Credits
          </button>
        )}
      </div>
    </div>
  );
}