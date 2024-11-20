import React from 'react';
import { motion } from 'framer-motion';
import { GameController, Trophy, Users, Sparkles } from 'lucide-react';
import FeaturedGames from '../components/FeaturedGames';
import EventsBanner from '../components/EventsBanner';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          DirtyHabits Gameroom
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your Premier Destination for Virtual Gaming Entertainment
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
            Play Now
          </button>
          <button className="border border-purple-600 hover:bg-purple-600/20 text-white px-8 py-3 rounded-full font-semibold transition-all">
            Learn More
          </button>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {[
          {
            icon: <GameController className="w-8 h-8 text-purple-400" />,
            title: "Multiple Games",
            description: "From classic cards to exciting slots"
          },
          {
            icon: <Users className="w-8 h-8 text-purple-400" />,
            title: "Multiplayer",
            description: "Play with friends in real-time"
          },
          {
            icon: <Trophy className="w-8 h-8 text-purple-400" />,
            title: "Tournaments",
            description: "Compete for glory and prizes"
          },
          {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "Daily Bonuses",
            description: "Free credits every day"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <FeaturedGames />
      <EventsBanner />
    </div>
  );
}