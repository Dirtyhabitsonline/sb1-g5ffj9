import { create } from 'zustand';
import { socket } from '../socket';

export interface Player {
  id: string;
  username: string;
  avatarUrl?: string;
  credits: number;
  currentBet?: number;
  isReady: boolean;
}

export interface GameRoom {
  id: string;
  name: string;
  gameType: 'poker' | 'blackjack' | 'slots';
  players: Player[];
  maxPlayers: number;
  minBet: number;
  maxBet: number;
  isPrivate: boolean;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: Date;
}

interface GameState {
  currentRoom: GameRoom | null;
  joinedRooms: GameRoom[];
  setCurrentRoom: (room: GameRoom | null) => void;
  addJoinedRoom: (room: GameRoom) => void;
  removeJoinedRoom: (roomId: string) => void;
  updateRoom: (roomId: string, updates: Partial<GameRoom>) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  placeBet: (amount: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentRoom: null,
  joinedRooms: [],
  setCurrentRoom: (room) => set({ currentRoom: room }),
  addJoinedRoom: (room) => 
    set((state) => ({
      joinedRooms: [...state.joinedRooms, room]
    })),
  removeJoinedRoom: (roomId) =>
    set((state) => ({
      joinedRooms: state.joinedRooms.filter((room) => room.id !== roomId)
    })),
  updateRoom: (roomId, updates) =>
    set((state) => ({
      joinedRooms: state.joinedRooms.map((room) =>
        room.id === roomId ? { ...room, ...updates } : room
      ),
      currentRoom:
        state.currentRoom?.id === roomId
          ? { ...state.currentRoom, ...updates }
          : state.currentRoom,
    })),
  joinRoom: (roomId) => {
    socket.emit('room:join', { roomId }, (response: { success: boolean; room?: GameRoom; error?: string }) => {
      if (response.success && response.room) {
        set({ currentRoom: response.room });
      }
    });
  },
  leaveRoom: (roomId) => {
    socket.emit('room:leave', { roomId });
    set({ currentRoom: null });
  },
  placeBet: (amount) => {
    const { currentRoom } = get();
    if (!currentRoom) return;
    
    socket.emit('game:bet', {
      roomId: currentRoom.id,
      amount
    });
  }
}));

// Socket event listeners
socket.on('room:updated', (room: GameRoom) => {
  useGameStore.getState().updateRoom(room.id, room);
});

socket.on('room:player_joined', ({ roomId, player }: { roomId: string; player: Player }) => {
  const currentRoom = useGameStore.getState().currentRoom;
  if (currentRoom?.id === roomId) {
    useGameStore.getState().updateRoom(roomId, {
      players: [...currentRoom.players, player]
    });
  }
});

socket.on('room:player_left', ({ roomId, playerId }: { roomId: string; playerId: string }) => {
  const currentRoom = useGameStore.getState().currentRoom;
  if (currentRoom?.id === roomId) {
    useGameStore.getState().updateRoom(roomId, {
      players: currentRoom.players.filter(p => p.id !== playerId)
    });
  }
});