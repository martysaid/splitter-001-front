import { useQuery } from '@tanstack/react-query';

import { houseService } from '@/services/house.service';

export function useHouses() {
  return useQuery({
    queryKey: ['houses'],
    queryFn: () => houseService.listHouses(),
  });
}
