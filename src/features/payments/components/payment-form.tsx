import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCheckout } from '@/features/payments/hooks/use-payment';

interface CheckoutButtonProps {
  amount: number;
  description?: string;
  metadata?: Record<string, string>;
  onError?: (error: Error) => void;
}

export function CheckoutButton({ amount, description, metadata, onError }: CheckoutButtonProps) {
  const { createCheckoutSession, isLoading } = useCheckout();

  const handleCheckout = async () => {
    try {
      await createCheckoutSession({
        amount,
        description,
        metadata,
      });
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>
          {description || `Complete your payment of $${(amount / 100).toFixed(2)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleCheckout} disabled={isLoading} className="w-full">
          {isLoading ? 'Redirecting...' : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>
      </CardContent>
    </Card>
  );
}
