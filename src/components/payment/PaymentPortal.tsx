import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Gift, History } from 'lucide-react';
import { useAuthStore } from '../../lib/store/auth';
import CreditPurchase from './CreditPurchase';
import TransactionHistory from './TransactionHistory';
import DailyBonus from './DailyBonus';

export default function PaymentPortal() {
  const [activeTab, setActiveTab] = React.useState<'purchase' | 'history' | 'bonus'>('purchase');
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Credit Management</h1>
            <div className="bg-purple-600/20 px-4 py-2 rounded-full">
              <span className="text-sm text-gray-300">Current Balance:</span>
              <span className="ml-2 font-semibold">{user.credits} credits</span>
            </div>
          </div>

          <div className="flex gap-4 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('purchase')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'purchase'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Purchase Credits
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Transaction History
              </div>
            </button>
            <button
              onClick={() => setActiveTab('bonus')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'bonus'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Daily Bonus
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'purchase' && <CreditPurchase />}
        {activeTab === 'history' && <TransactionHistory />}
        {activeTab === 'bonus' && <DailyBonus />}
      </div>
    </motion.div>
  );
}