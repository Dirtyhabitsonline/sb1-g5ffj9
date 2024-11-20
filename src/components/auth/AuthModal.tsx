import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'login' | 'register';
  onToggleView: () => void;
}

export default function AuthModal({ isOpen, onClose, view, onToggleView }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {view === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {view === 'login' ? <LoginForm /> : <RegisterForm />}

              <div className="mt-6 text-center text-gray-400">
                {view === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      onClick={onToggleView}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={onToggleView}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}