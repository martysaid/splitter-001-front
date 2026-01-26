import env from '@/config/env';
import axios from 'axios';
import { getSessionToken } from '@/features/auth/hooks/use-session-token';

export interface ApiError {
  status: string;
  statusCode: number;
  message: string;
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const token = getSessionToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Clear auth state when unauthorized - uses dynamic import to avoid circular dependency
async function clearAuthState() {
  const { useAuthStore } = await import('@/features/auth/hooks/use-auth');
  useAuthStore.getState().setUser(null);
}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearAuthState();
    }
    return Promise.reject(error);
  }
);

if (env.VITE_TEST_SLOW_API) {
  api.interceptors.request.use(req => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(req);
      }, 1000);
    });
  });
}
