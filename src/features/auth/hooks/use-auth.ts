import { create } from 'zustand';

import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import {
  type AuthState,
  type User,
  type MagicLinkFormData,
} from '@/features/auth/types/auth.types';
import { toast } from '@/stores/toast.store';
import { getAuthErrorMessage, logError } from '@/lib/error-messages';

interface AuthActions {
  requestMagicLink: (data: MagicLinkFormData) => Promise<void>;
  verifyToken: (data: { token: string }) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, _get) => {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user: User | null) => {
      set({ user, isAuthenticated: !!user });
    },

    setLoading: (isLoading: boolean) => {
      set({ isLoading });
    },

    requestMagicLink: async (data: MagicLinkFormData) => {
      try {
        set({ isLoading: true });
        const response = await authService.requestMagicLink(data);
        toast({
          title: 'Magic link sent!',
          description: response.message,
        });
      } catch (error) {
        logError('requestMagicLink', error);
        toast({
          title: 'Error',
          description: getAuthErrorMessage(error),
          variant: 'destructive',
        });
      } finally {
        set({ isLoading: false });
      }
    },

    verifyToken: async (data: { token: string }) => {
      try {
        set({ isLoading: true });
        const response = await authService.verifyToken(data);
        set({ user: response.data.user, isAuthenticated: true });
        toast({
          title: 'Welcome!',
          description: response.message,
        });
      } catch (error) {
        logError('verifyToken', error);
        toast({
          title: 'Error',
          description: getAuthErrorMessage(error),
          variant: 'destructive',
        });
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      try {
        set({ isLoading: true });
        await authService.logout();
        set({ user: null, isAuthenticated: false });
      } catch (error) {
        logError('logout', error);
        toast({
          title: 'Error',
          description: getAuthErrorMessage(error),
          variant: 'destructive',
        });
      } finally {
        set({ isLoading: false });
      }
    },

    getCurrentUser: async () => {
      try {
        set({ isLoading: true });
        const response = await userService.getCurrentUser();
        set({ user: response.data.user, isAuthenticated: true });
      } catch (error) {
        logError('getCurrentUser', error);
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

// Initialize auth state on app startup
// This should be called once before rendering the app
export const initializeAuth = async (): Promise<void> => {
  try {
    const response = await userService.getCurrentUser();
    useAuthStore.setState({
      user: response.data.user,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    // Only log unexpected errors, not 401s (no session is a valid initial state)
    const isUnauthorized =
      error instanceof Error &&
      'response' in error &&
      (error as { response?: { status?: number } }).response?.status === 401;
    if (!isUnauthorized) {
      logError('initializeAuth', error);
    }
  }
};
