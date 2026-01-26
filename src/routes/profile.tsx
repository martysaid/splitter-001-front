import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { UserProfile } from '@/features/users/components/user-profile';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AuthGuard>
      <UserProfile />
    </AuthGuard>
  );
}
