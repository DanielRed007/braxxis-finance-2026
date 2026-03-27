import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient, registerAuthCallbacks } from './api-client';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('apiClient', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    registerAuthCallbacks({
      getTokens: () => ({ accessToken: 'test-token', refreshToken: 'test-refresh' }),
      onRefreshed: vi.fn(),
      onFailed: vi.fn(),
    });
  });

  it('should attach authorization header', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'ok' }),
    });

    await apiClient.get('/test');

    expect(mockFetch).toHaveBeenCalledOnce();
    const [, options] = mockFetch.mock.calls[0];
    const headers = options.headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should send POST body as JSON', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'ok' }),
    });

    await apiClient.post('/test', { email: 'a@b.com' });

    const [, options] = mockFetch.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.body).toBe(JSON.stringify({ email: 'a@b.com' }));
  });

  it('should throw on non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Bad request' }),
    });

    // Disable auto-refresh for this test
    registerAuthCallbacks({
      getTokens: () => ({ accessToken: 'test-token', refreshToken: null }),
      onRefreshed: vi.fn(),
      onFailed: vi.fn(),
    });

    await expect(apiClient.get('/test')).rejects.toThrow('Bad request');
  });
});
