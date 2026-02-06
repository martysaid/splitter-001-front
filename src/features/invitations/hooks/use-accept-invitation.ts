import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { invitationsService } from '@/services/invitations.service';
import { getInvitationErrorMessage, logError, ERROR_MESSAGES } from '@/lib/error-messages';

interface UseAcceptInvitationProps {
  token?: string;
}

interface AcceptInvitationState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  houseName?: string;
}

export function useAcceptInvitation({ token }: UseAcceptInvitationProps) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<AcceptInvitationState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const performAcceptance = useCallback(async () => {
    if (!token) {
      setState({
        isLoading: false,
        error: ERROR_MESSAGES.INVITATION_INVALID,
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
      const response = await invitationsService.acceptInvitation({ token });
      const { user, houseName } = response.data;

      // Set user in auth store
      setUser(user);

      setState({
        isLoading: false,
        error: null,
        isSuccess: true,
        houseName,
      });

      // Redirect to dashboard after a brief moment
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 5000);
    } catch (error) {
      logError('acceptInvitation', error);
      setState({
        isLoading: false,
        error: getInvitationErrorMessage(error),
        isSuccess: false,
      });

      if (!import.meta.env.DEV) {
        setTimeout(() => {
          navigate({ to: '/login' });
        }, 3000);
      }
    }
  }, [token, setUser, navigate]);

  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    performAcceptance();
  }, [performAcceptance]);

  return state;
}
