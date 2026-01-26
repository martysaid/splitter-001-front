import { useMutation, useQueryClient } from '@tanstack/react-query';

import { memberService } from '@/services/member.service';
import { toast } from '@/stores/toast.store';

export function useDeleteMember(houseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => memberService.deleteMember(houseId, memberId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['house-dashboard', houseId],
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to remove member',
        description: 'Please try again later.',
      });
    },
  });
}
