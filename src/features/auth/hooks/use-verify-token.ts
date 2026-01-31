import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { authService } from "@/services/auth.service";
import { logError, ERROR_MESSAGES } from "@/lib/error-messages";

interface UseVerifyTokenProps {
	token?: string;
}

interface VerificationState {
	isLoading: boolean;
	error: string | null;
	isSuccess: boolean;
}

export function useVerifyToken({ token }: UseVerifyTokenProps) {
	const { setUser } = useAuth();
	const navigate = useNavigate();
	const [state, setState] = useState<VerificationState>({
		isLoading: false,
		error: null,
		isSuccess: false,
	});

	const performVerification = useCallback(async () => {
		if (!token) {
			setState({
				isLoading: false,
				error: ERROR_MESSAGES.INVALID_TOKEN,
				isSuccess: false,
			});

			if (!import.meta.env.DEV) {
				setTimeout(() => {
					navigate({ to: "/login" });
				}, 3000);
			}
			return;
		}

		setState(prev => ({ ...prev, isLoading: true, error: null }));

		try {
			const response = await authService.verifyToken({ token });

			const { user, hasNoHouses } = response.data;

			// Set user in auth store
			setUser(user);

			setState({
				isLoading: false,
				error: null,
				isSuccess: true,
			});

			// Redirect users with no houses to create/join a house
			if (hasNoHouses) {
				// TODO: improve path - redirect to house creation/join flow
				await navigate({ to: "/auth/callback" });
			} else {
				// Users with houses go to dashboard
				await navigate({ to: "/dashboard" });
			}
		} catch (error) {
			logError("tokenVerification", error);
			setState({
				isLoading: false,
				error: ERROR_MESSAGES.VERIFICATION_FAILED,
				isSuccess: false,
			});

			if (!import.meta.env.DEV) {
				setTimeout(() => {
					navigate({ to: "/login" });
				}, 3000);
			}
		}
	}, [token, setUser, navigate]);

	useEffect(() => {
		performVerification();
	}, [performVerification]);

	return state;
}
