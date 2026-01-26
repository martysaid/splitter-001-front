import { Button } from './ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useRouter } from '@tanstack/react-router';

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Determine if we're on a sub-page that should show the back button
  const currentPath = router.state.location.pathname;
  const isSubPage =
    currentPath.startsWith('/houses/') ||
    (currentPath !== '/' &&
      currentPath !== '/dashboard' &&
      currentPath !== '/login' &&
      currentPath !== '/signup' &&
      !currentPath.startsWith('/auth/'));

  const handleBack = () => {
    router.history.back();
  };

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/' });
  };

  return (
    <header className="px-6 py-6 md:px-8 md:py-6">
      <div className="mx-auto flex items-center justify-between">
        <a href="/">
          <div className="text-base font-semibold text-foreground hover:text-foreground/75 md:text-[1.55rem]">
            Split
          </div>
        </a>

        <div className="flex items-center gap-8">
          {isSubPage && (
            <Button variant="split_ghost" onClick={handleBack}>
              Back
            </Button>
          )}

          {isAuthenticated ? (
            <Button variant="split" onClick={handleLogout}>
              Logout
            </Button>
          ) : currentPath === '/login' ? (
            <Button variant="split" asChild>
              <a href="/signup">Sign up</a>
            </Button>
          ) : currentPath === '/signup' ? (
            <Button variant="split" asChild>
              <a href="/login">Login</a>
            </Button>
          ) : (
            <Button variant="split" asChild>
              <a href="/login">Login</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
