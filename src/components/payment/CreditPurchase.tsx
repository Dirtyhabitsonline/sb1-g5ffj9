import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Package } from 'lucide-react';
import { useAuthStore } from '../../lib/store/auth';
import { usePaymentStore } from '../../lib/store/payment';

const creditPackages = [
  { id: 1, credits: 1000, price: 10, bonus: 0 },
  { id: 2, credits: 2500, price: 20, bonus: 250 },
  { id: 3, credits: 5000, price: 35, bonus: 1000 },
  { id: 4, credits: 10000, price: 60, bonus: 3000 },
];

const purchaseSchema = z.object({
  packageId: z.number(),
  termsAccepted: z.boolean().refine((val) => val, {
    message: 'You must accept the terms and conditions',
  }),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

export default function CreditPurchase() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
  });

  const user = useAuthStore((state) => state.user);
  const addTransaction = usePaymentStore((state) => state.addTransaction);

  const onSubmit = async (data: PurchaseFormData) => {
    if (!user) return;

    const selectedPackage = creditPackages.find((pkg) => pkg.id === data.packageId);
    if (!selectedPackage) return;

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addTransaction({
        userId: user.id,
        type: 'deposit',
        amount: selectedPackage.credits + selectedPackage.bonus,
        status: 'completed',
        description: `Purchased ${selectedPackage.credits} credits with ${selectedPackage.bonus} bonus credits`,
      });

      toast.success('Credits purchased successfully!');
    } catch (error) {
      toast.error('Failed to process payment');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Select Credit Package</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            {creditPackages.map((pkg) => (
              <label
                key={pkg.id}
                className="relative flex items-center p-4 cursor-pointer bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <input
                  type="radio"
                  value={pkg.id}
                  {...register('packageId', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{pkg.credits} Credits</span>
                      {pkg.bonus > 0 && (
                        <span className="ml-2 text-sm text-purple-400">
                          +{pkg.bonus} Bonus
                        </span>
                      )}
                    </div>
                    <span className="font-bold">${pkg.price}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('termsAccepted')}
                className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300">
                I accept the terms and conditions
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-400">{errors.termsAccepted.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Purchase Credits'
            )}
          </button>
        </form>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold">Package Benefits</h2>
        </div>
        
        <ul className="space-y-4 text-gray-300">
          <li className="flex items-center gap-2">
            • Instant credit delivery</li>
          <li className="flex items-center gap-2">
            • Bonus credits on larger packages</li>
          <li className="flex items-center gap-2">
            • Secure payment processing</li>
          <li className="flex items-center gap-2">
            • 24/7 support</li>
        </ul>

        <div className="mt-6 p-4 bg-purple-600/20 rounded-lg">
          <p className="text-sm text-purple-300">
            Note: All transactions are for virtual credits only and have no real-world monetary value.
            Credits cannot be exchanged, transferred, or refunded.
          </p>
        </div>
      </div>
    </div>
  );
}