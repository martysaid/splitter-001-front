import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export const Route = createFileRoute('/payment/cancel')({
  component: PaymentCancel,
});

function PaymentCancel() {
  return (
    <div className="container mx-auto flex justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
          <CardTitle>Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled. You can try again or return to the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/" search={{}}>
                Try Payment Again
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
