import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../lib/store/auth';

export default function VerifyEmail() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.isVerified) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-600/20 border border-purple-500/20 rounded-lg p-4 mb-8"
    >
      <div className="flex items-center gap-4">
        <div className="bg-purple-600/20 p-2 rounded-full">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">Verify your email</h3>
          <p className="text-sm text-gray-300">
            Please check your inbox and verify your email address to unlock all features
          </p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          <span>Verify</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}