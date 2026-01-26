import { useCallback, useState } from 'react';
import { paymentService } from '@/features/payments/services/payment.service';
import { toast } from '@/stores/toast.store';
import { type CreateCheckoutSessionRequest } from '@/features/payments/types/payment.types';
import { getPaymentErrorMessage, logError } from '@/lib/error-messages';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (data: CreateCheckoutSessionRequest) => {
    try {
      setIsLoading(true);
      const response = await paymentService.createCheckoutSession(data);

      // Redirect to Stripe Checkout
      paymentService.redirectToCheckout(response.data.url);

      return response.data;
    } catch (error) {
      logError('createCheckoutSession', error);
      toast({
        title: 'Error',
        description: getPaymentErrorMessage(error),
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCheckoutSession = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      const response = await paymentService.getCheckoutSession(sessionId);
      return response.data.session;
    } catch (error) {
      logError('getCheckoutSession', error);
      toast({
        title: 'Error',
        description: getPaymentErrorMessage(error),
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    createCheckoutSession,
    getCheckoutSession,
  };
};
