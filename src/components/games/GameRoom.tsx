import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, DollarSign } from 'lucide-react';
import { useGameStore, type GameRoom as GameRoomType } from '../../lib/store/game';
import GameChat from './GameChat';
import PlayerList from './PlayerList';
import GameControls from './GameControls';

interface GameRoomProps {
  roomId: string;
}

export default function GameRoom({ roomId }: GameRoomProps) {
  const { currentRoom, setCurrentRoom } = useGameStore();

  useEffect(() => {
    // Simulate fetching room data
    const fetchRoom = async () => {
      const mockRoom: GameRoomType = {
        id: roomId,
        name: 'High Stakes Poker',
        gameType: 'poker',
        players: [],
        maxPlayers: 6,
        minBet: 100,
        maxBet: 1000,
        isPrivate: false,
        status: 'waiting',
        createdAt: new Date(),
      };
      setCurrentRoom(mockRoom);
    };

    fetchRoom();
  }, [roomId, setCurrentRoom]);

  if (!currentRoom) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Game Info */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">{currentRoom.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>{currentRoom.players.length}/{currentRoom.maxPlayers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <span>{currentRoom.minBet} - {currentRoom.maxBet}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{currentRoom.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 h-[400px] flex items-center justify-center">
            <p className="text-gray-400">Game interface will be rendered here</p>
          </div>

          <GameControls />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <PlayerList players={currentRoom.players} />
          <GameChat roomId={currentRoom.id} />
        </div>
      </div>
    </motion.div>
  );
}