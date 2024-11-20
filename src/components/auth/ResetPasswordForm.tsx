import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { resetPasswordSchema } from '../../lib/validations/auth';
import { RATE_LIMIT } from '../../lib/utils/security';

type ResetPasswordFormData = {
  email: string;
};

interface ResetPasswordFormProps {
  onBack: () => void;
}

export default function ResetPasswordForm({ onBack }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('If an account exists with this email, you will receive reset instructions.');
      onBack();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-gray-400 mb-4">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Send Instructions'
          )}
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center">
        Note: For security reasons, you can only request a password reset once every hour.
      </p>
    </form>
  );
}