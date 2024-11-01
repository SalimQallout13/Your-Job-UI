import { useEffect, useCallback, useState } from "react"
import { showToast } from "@/lib/hooks/use-toast.tsx";
import { UserSignInResponse } from "@/lib/types/api/responses/UserSignInResponse.ts"

export function useDashboard() {

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	const showWelcomeMessage = (user: UserSignInResponse) => {
		showToast(`Bonjour ${user.prenom} 👋`, 'Bienvenue sur votre tableau de bord');
	};

	const clearLoginFlag = () => {
		localStorage.removeItem('justLoggedIn');
	};

	const handleUserLogin = useCallback((user: UserSignInResponse) => {
		startLoading();
		showWelcomeMessage(user);
		clearLoginFlag();
		setTimeout(stopLoading, 2000);
	}, []);

	const getStoredUser = () => {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	};

	const userJustLoggedIn = () => {
		return localStorage.getItem('justLoggedIn') !== null;
	};

	useEffect(() => {
		const user = getStoredUser();
		if (user && userJustLoggedIn()) {
			handleUserLogin(user);
		}
	}, [handleUserLogin]);

	return { isLoading };
}
