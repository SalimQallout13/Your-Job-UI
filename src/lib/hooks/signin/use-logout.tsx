import { showToast } from "@/lib/hooks/use-toast.tsx"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { ROUTES } from "@/lib/configs/routes.ts"

interface UseLogout {
	handleLogout: () => void;
}

export const useLogout = (): UseLogout => {
	const { setUserData, navigateTo } = useNavigationContext()

	const handleLogout = async () => {
		try {
			showToast("Déconnexion", "Déconnexion en cours", true)
			setUserData(null)
			showToast("Déconnexion", "Déconnexion réussie", false)
			navigateTo(ROUTES.HOME_PATH)
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de la déconnexion")
		}
	}

	return { handleLogout }
}
