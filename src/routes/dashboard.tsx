import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { Dashboard } from '@/features/dashboard/components/dashboard';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
