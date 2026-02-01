import { api } from "@/lib/api";

export interface AcceptInvitationRequest {
	token: string;
}

export interface AcceptInvitationResponse {
	status: string;
	data: {
		user: {
			id: string;
			email: string;
			firstName: string;
			lastName: string;
			isAdmin: boolean;
			created_at: string;
			updated_at: string;
		};
		token: string;
		houseId: string;
		houseName: string;
	};
}

export const invitationsService = {
	async acceptInvitation(data: AcceptInvitationRequest): Promise<AcceptInvitationResponse> {
		console.log("[invitationsService] acceptInvitation");

		const response = await api.post<AcceptInvitationResponse>("/invitations/accept", data);
		return response.data;
	},
};
