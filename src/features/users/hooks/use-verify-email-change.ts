import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/hooks/use-auth';
import { userService } from '@/services/user.service';
import { getErrorMessage, logError, ERROR_MESSAGES } from '@/lib/error-messages';

interface UseVerifyEmailChangeProps {
  token?: string;
}

interface VerificationState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function useVerifyEmailChange({ token }: UseVerifyEmailChangeProps) {
  const setUser = useAuthStore(state => state.setUser);
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

      setTimeout(() => {
        navigate({ to: '/profile' });
      }, 3000);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await userService.verifyEmailChange({ token });

      const { user } = response.data;

      // Set updated user in auth store
      setUser(user);

      setState({
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      // Redirect to profile after a short delay
      setTimeout(() => {
        navigate({ to: '/profile' });
      }, 3000);
    } catch (error) {
      logError('[use-verify-email-change] performVerification', error);
      setState({
        isLoading: false,
        error: getErrorMessage(error),
        isSuccess: false,
      });

      setTimeout(() => {
        navigate({ to: '/profile' });
      }, 3000);
    }
  }, [token, setUser, navigate]);

  useEffect(() => {
    performVerification();
  }, [performVerification]);

  return state;
}
