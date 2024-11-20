import React from 'react';
import { type Player } from '../../lib/store/game';
import { User, Crown } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <h3 className="font-semibold mb-4">Players</h3>
      
      <div className="space-y-2">
        {players.length === 0 ? (
          <p className="text-sm text-gray-400">Waiting for players...</p>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3"
            >
              {player.avatarUrl ? (
                <img
                  src={player.avatarUrl}
                  alt={player.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{player.username}</span>
                  {player.isReady && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-400">{player.credits} credits</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}