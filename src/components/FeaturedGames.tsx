import React from 'react';
import { motion } from 'framer-motion';

const games = [
  {
    id: 1,
    title: "Poker Night",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
    players: "1,234",
    category: "Cards"
  },
  {
    id: 2,
    title: "Lucky Slots",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
    players: "2,567",
    category: "Slots"
  },
  {
    id: 3,
    title: "Blackjack Pro",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    players: "987",
    category: "Cards"
  }
];

export default function FeaturedGames() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">Featured Games</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="aspect-video relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-purple-600 px-3 py-1 rounded-full">
                    {game.category}
                  </span>
                  <span className="text-gray-300">
                    {game.players} playing
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}