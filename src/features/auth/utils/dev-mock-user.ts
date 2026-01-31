import type { User } from "@/features/auth/types/auth.types";

// Development-only mock user for MSW auth mocking
// Used by MSW handlers when VITE_ENABLE_MOCKS=true in development
// This file should ONLY be imported by MSW handlers, not production code
export const createMockDevUser = (): User => {
	const now = new Date().toISOString();

	return {
		id: "dev-user-00000000-0000-0000-0000-000000000000",
		email: "dev@localhost.com",
		firstName: "Dev",
		lastName: "User",
		isAdmin: true,
		created_at: now,
		updated_at: now,
	};
};
