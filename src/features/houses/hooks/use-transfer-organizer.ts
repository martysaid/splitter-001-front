import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { houseService } from '@/services/house.service';
import { toast } from '@/stores/toast.store';

export function useTransferOrganizer(houseId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newOrganizerId: string) =>
      houseService.transferOrganizer(houseId, newOrganizerId),
    onSuccess: async () => {
      // Invalidate all house-related queries since roles have changed
      await queryClient.invalidateQueries({
        queryKey: ['house-dashboard', houseId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['house', houseId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['houses'],
      });

      toast({
        title: 'Organizer role transferred',
        description: 'You are now a regular member of this house.',
      });

      // Navigate to dashboard - the UI will show the member view now
      navigate({ to: '/houses/$id', params: { id: houseId } });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to transfer organizer role',
        description: 'Please try again later.',
      });
    },
  });
}
