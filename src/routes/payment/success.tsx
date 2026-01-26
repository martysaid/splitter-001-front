import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useCheckout } from '@/features/payments/hooks/use-payment';
import type { CheckoutSession } from '@/features/payments/types/payment.types';

interface PaymentSuccessSearch {
  session_id?: string;
}

export const Route = createFileRoute('/payment/success')({
  validateSearch: (search: Record<string, unknown>): PaymentSuccessSearch => {
    return {
      session_id: search.session_id as string,
    };
  },
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const { session_id } = Route.useSearch();
  const { getCheckoutSession } = useCheckout();
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = session_id;

    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const sessionData = await getCheckoutSession(sessionId);
        setSession(sessionData);
      } catch (_error) /* eslint-disable-line @typescript-eslint/no-unused-vars */ {
        setError('Failed to verify payment');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id, getCheckoutSession]);

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center py-8">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="space-y-4 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Verifying payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="container mx-auto flex justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <CardTitle className="text-destructive">Payment Verification Failed</CardTitle>
            <CardDescription>{error || 'Unable to verify payment'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPaid = session.payment_status === 'paid';

  return (
    <div className="container mx-auto flex justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle
            className={`mx-auto mb-4 h-16 w-16 ${isPaid ? 'text-green-500' : 'text-yellow-500'}`}
          />
          <CardTitle>{isPaid ? 'Payment Successful!' : 'Payment Processing'}</CardTitle>
          <CardDescription>
            {isPaid
              ? 'Your payment has been processed successfully.'
              : 'Your payment is being processed and will be confirmed shortly.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">
                ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                {session.payment_status}
              </span>
            </div>
            {session.customer_email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{session.customer_email}</span>
              </div>
            )}
          </div>
          <Button asChild className="w-full">
            <Link to="/dashboard">Continue to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
