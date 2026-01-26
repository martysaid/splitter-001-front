import { useAuthStore } from './use-auth';

export function getSessionToken(): string | null {
  const state = useAuthStore.getState();

  // For now, we'll use the user's presence as an indicator of authentication
  // In the future, if we switch to JWT tokens in localStorage/sessionStorage,
  // we would retrieve the actual token here
  if (state.isAuthenticated && state.user) {
    // Return a dummy token or implement actual token retrieval logic
    // This is where you'd get the JWT from storage if using that approach
    return 'authenticated';
  }

  return null;
}
