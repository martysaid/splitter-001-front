import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { authService } from '@/services/auth.service';
import { logError, ERROR_MESSAGES } from '@/lib/error-messages';

interface UseVerifyTokenProps {
  token?: string;
}

interface VerificationState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function useVerifyToken({ token }: UseVerifyTokenProps) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<VerificationState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const performVerification = useCallback(async () => {
    if (!token) {
      setState({
        isLoading: false,
        error: ERROR_MESSAGES.INVALID_TOKEN,
        isSuccess: false,
      });

      if (!import.meta.env.DEV) {
        setTimeout(() => {
          navigate({ to: '/login' });
        }, 3000);
      }
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.verifyToken({ token });

      const { user, isNewOrganizer } = response.data;

      // Set user in auth store
      setUser(user);

      setState({
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      // Determine redirect based on user role and new organizer status
      if (user.role === 'organizer' && isNewOrganizer) {
        // TODO: improve path
        await navigate({ to: '/auth/callback' });
      } else {
        // Returning organizers and tenants go to dashboard
        await navigate({ to: '/dashboard' });
      }
    } catch (error) {
      logError('tokenVerification', error);
      setState({
        isLoading: false,
        error: ERROR_MESSAGES.VERIFICATION_FAILED,
        isSuccess: false,
      });

      if (!import.meta.env.DEV) {
        setTimeout(() => {
          navigate({ to: '/login' });
        }, 3000);
      }
    }
  }, [token, setUser, navigate]);

  useEffect(() => {
    performVerification();
  }, [performVerification]);

  return state;
}
