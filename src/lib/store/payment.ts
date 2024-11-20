import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'bonus' | 'bet' | 'win';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description: string;
}

interface PaymentState {
  transactions: Transaction[];
  pendingTransaction: Transaction | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  setPendingTransaction: (transaction: Transaction | null) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      transactions: [],
      pendingTransaction: null,
      addTransaction: (transaction) => 
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
            ...state.transactions,
          ],
        })),
      setPendingTransaction: (transaction) => 
        set({ pendingTransaction: transaction }),
      updateTransactionStatus: (id, status) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        })),
    }),
    {
      name: 'payment-storage',
    }
  )
);