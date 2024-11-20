import React from 'react';
import { format } from 'date-fns';
import { usePaymentStore } from '../../lib/store/payment';
import { ArrowUpRight, ArrowDownRight, Gift, Coins, Trophy } from 'lucide-react';

const transactionIcons = {
  deposit: <ArrowUpRight className="w-5 h-5 text-green-400" />,
  withdrawal: <ArrowDownRight className="w-5 h-5 text-red-400" />,
  bonus: <Gift className="w-5 h-5 text-purple-400" />,
  bet: <Coins className="w-5 h-5 text-yellow-400" />,
  win: <Trophy className="w-5 h-5 text-yellow-400" />,
};

export default function TransactionHistory() {
  const transactions = usePaymentStore((state) => state.transactions);

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
        
        {transactions.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    {transactionIcons[transaction.type]}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    ['deposit', 'bonus', 'win'].includes(transaction.type)
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {['deposit', 'bonus', 'win'].includes(transaction.type) ? '+' : '-'}
                    {transaction.amount} credits
                  </p>
                  <p className={`text-sm ${
                    transaction.status === 'completed'
                      ? 'text-green-400'
                      : transaction.status === 'pending'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}