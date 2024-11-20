import React from 'react';
import { Calendar, Gift } from 'lucide-react';

export default function EventsBanner() {
  return (
    <section className="py-16">
      <div className="bg-gradient-to-r from-purple-800 to-violet-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Special Events</h2>
            <p className="text-gray-200 max-w-xl">
              Join our weekend tournament for a chance to win exclusive rewards and climb the leaderboard!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              <Calendar className="w-5 h-5" />
              View Schedule
            </button>
            <button className="flex items-center justify-center gap-2 bg-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
              <Gift className="w-5 h-5" />
              Claim Bonus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}