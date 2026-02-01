import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { houseService } from "@/services/house.service";

export function useTransferOrganizer(houseId: string) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (newOrganizerId: string) => houseService.transferOrganizer(houseId, newOrganizerId),
		onSuccess: async () => {
			// Invalidate all house-related queries since roles have changed
			await queryClient.invalidateQueries({
				queryKey: ["house-dashboard", houseId],
			});
			await queryClient.invalidateQueries({
				queryKey: ["house", houseId],
			});
			await queryClient.invalidateQueries({
				queryKey: ["houses"],
			});

			setTimeout(() => {
				navigate({ to: "/houses/$id", params: { id: houseId } });
			}, 3000);
		},
	});
}
