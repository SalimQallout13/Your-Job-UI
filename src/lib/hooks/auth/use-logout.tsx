import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from "@/lib/hooks/use-toast.tsx";
import { BadgeCheck } from "lucide-react";
import { ROUTES } from "@/lib/configs/routes.ts";

interface UseLogout {
	handleLogout: () => void;
}

const useLogout = (): UseLogout => {
	const navigate = useNavigate();

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
	};

	const showInitialLogoutMessage = () => {
		showToast('Déconnexion', 'Déconnexion en cours', true);
	};

	const showLogoutSuccessMessage = () => {
		showToast('Déconnexion', 'Déconnexion réussie', false, <BadgeCheck className="mr-2 size-4 text-green-600" />);
	};

	const redirectToLogin = () => {
		navigate(ROUTES.LOGIN);
	};

	const handleLogout = useCallback(() => {
		showInitialLogoutMessage();
		setTimeout(() => {
			removeUserFromLocalStorage();
			showLogoutSuccessMessage();
			redirectToLogin();
		}, 1100);
	}, [navigate, showToast]);

	return { handleLogout };
};

export { useLogout };
