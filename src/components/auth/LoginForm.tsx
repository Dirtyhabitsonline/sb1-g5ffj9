import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { loginSchema } from '../../lib/validations/auth';
import { useAuthStore } from '../../lib/store/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: '1',
        email: data.email,
        username: 'Player1',
        credits: 1000,
        isVerified: false,
      });
      
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
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
          'Sign In'
        )}
      </button>
    </form>
  );
}