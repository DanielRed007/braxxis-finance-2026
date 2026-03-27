'use client';

import type { AuthTokens } from '@braxxis/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

let getAuthTokens: (() => { accessToken: string | null; refreshToken: string | null }) | null = null;
let onTokenRefreshed: ((tokens: AuthTokens) => void) | null = null;
let onAuthFailed: (() => void) | null = null;

export function registerAuthCallbacks(callbacks: {
  getTokens: () => { accessToken: string | null; refreshToken: string | null };
  onRefreshed: (tokens: AuthTokens) => void;
  onFailed: () => void;
}): void {
  getAuthTokens = callbacks.getTokens;
  onTokenRefreshed = callbacks.onRefreshed;
  onAuthFailed = callbacks.onFailed;
}

async function refreshAccessToken(refreshToken: string): Promise<AuthTokens | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) return null;
    return response.json() as Promise<AuthTokens>;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  const tokens = getAuthTokens?.();
  if (tokens?.accessToken) {
    headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }

  let response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401 && tokens?.refreshToken) {
    const newTokens = await refreshAccessToken(tokens.refreshToken);
    if (newTokens) {
      onTokenRefreshed?.(newTokens);
      headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
      response = await fetch(`${API_URL}${path}`, { ...options, headers });
    } else {
      onAuthFailed?.();
      throw new Error('Session expired');
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
