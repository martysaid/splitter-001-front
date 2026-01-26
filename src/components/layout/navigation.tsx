import { Link, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/' });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-lg font-semibold">
              App
            </Link>
            <div className="hidden space-x-4 md:flex">
              <Link
                to="/dashboard"
                className="text-sm hover:text-primary [&.active]:font-medium [&.active]:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-sm hover:text-primary [&.active]:font-medium [&.active]:text-primary"
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
