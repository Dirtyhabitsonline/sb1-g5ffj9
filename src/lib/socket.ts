import { io } from 'socket.io-client';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('Connected to game server');
});

socket.on('connect_error', () => {
  toast.error('Connection to game server failed');
});

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    toast.error('Disconnected from game server');
    socket.connect();
  }
});

export const connectSocket = (userId: string) => {
  socket.auth = { userId };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};