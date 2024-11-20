import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function generateDeviceId(): string {
  const nav = window.navigator;
  const screen = window.screen;
  const deviceData = [
    nav.userAgent,
    screen.height,
    screen.width,
    screen.colorDepth,
    new Date().getTimezoneOffset()
  ].join('');
  
  return btoa(deviceData).slice(0, 32);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}

export function getSessionDuration(rememberMe: boolean): number {
  return rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 24 hours
}

export const RATE_LIMIT = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_TIMEOUT: 15 * 60 * 1000, // 15 minutes
  PASSWORD_RESET_TIMEOUT: 60 * 60 * 1000, // 1 hour
};