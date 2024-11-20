import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { registerSchema } from '../../lib/validations/auth';
import { useAuthStore } from '../../lib/store/auth';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setUser({
        id: '1',
        email: data.email,
        username: data.username,
        credits: 1000,
        isVerified: false,
      });
      
      toast.success('Account created successfully! Please verify your email.');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Choose a username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
        )}
      </div>

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
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
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
          'Create Account'
        )}
      </button>
    </form>
  );
}