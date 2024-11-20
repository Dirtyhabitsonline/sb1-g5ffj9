import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dices, User, Bell, Menu, X } from 'lucide-react';
import { useAuthStore } from '../lib/store/auth';
import AuthModal from './auth/AuthModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const openAuthModal = (view: 'login' | 'register') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Dices className="w-8 h-8 text-purple-400" />
              <span className="font-bold text-xl">DirtyHabits</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/games" className="text-gray-300 hover:text-white transition-colors">
                Games
              </Link>
              <Link to="/tournaments" className="text-gray-300 hover:text-white transition-colors">
                Tournaments
              </Link>
              <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">
                Shop
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <button className="p-2 text-gray-300 hover:text-white">
                    <Bell className="w-6 h-6" />
                  </button>
                  <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full">
                    <User className="w-5 h-5" />
                    <span>{user.username}</span>
                    <button
                      onClick={logout}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-300 hover:text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/games"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              >
                Games
              </Link>
              <Link
                to="/tournaments"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              >
                Tournaments
              </Link>
              <Link
                to="/leaderboard"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              >
                Leaderboard
              </Link>
              <Link
                to="/shop"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              >
                Shop
              </Link>
              {!user && (
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="w-full text-left px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        view={authView}
        onToggleView={() => setAuthView(view => view === 'login' ? 'register' : 'login')}
      />
    </>
  );
}