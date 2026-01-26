import { useQuery } from '@tanstack/react-query';

import { houseService } from '@/services/house.service';

export function useHouse(houseId: string) {
  return useQuery({
    queryKey: ['house', houseId],
    queryFn: () => houseService.getHouse(houseId),
    enabled: !!houseId,
  });
}
