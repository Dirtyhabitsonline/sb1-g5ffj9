import React from 'react';
import { Link } from 'react-router-dom';
import { Dices, Twitter, Facebook, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/30 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Dices className="w-8 h-8 text-purple-400" />
              <span className="font-bold text-xl">DirtyHabits</span>
            </Link>
            <p className="text-gray-400">
              Your premier destination for virtual gaming entertainment.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-gray-400 hover:text-white">Games</Link></li>
              <li><Link to="/tournaments" className="text-gray-400 hover:text-white">Tournaments</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DirtyHabits Gameroom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}