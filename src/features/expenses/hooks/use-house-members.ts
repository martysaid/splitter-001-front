import { useQuery } from '@tanstack/react-query';

import { memberService } from '@/services/member.service';

export function useHouseMembers(houseId: string) {
  return useQuery({
    queryKey: ['house-members', houseId],
    queryFn: () => memberService.getHouseMembers(houseId),
    enabled: !!houseId,
  });
}
