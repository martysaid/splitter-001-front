import { useMutation, useQueryClient } from '@tanstack/react-query';

import { memberDashboardService } from '../services/member-dashboard.service';
import { toast } from '@/stores/toast.store';
import type { MarkPaymentAsPaidRequest } from '../types/member-dashboard.types';

export function useMarkPaymentPaid(houseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentId, data }: { paymentId: string; data?: MarkPaymentAsPaidRequest }) =>
      memberDashboardService.markPaymentAsPaid(paymentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-dashboard', houseId],
      });
      toast({
        title: 'Payment marked as paid',
        description: 'Your payment has been recorded successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to mark payment as paid',
        description: 'Please try again later.',
      });
    },
  });
}
