import { showToast } from "@/lib/hooks/use-toast.tsx"
import { useNavigate } from "react-router-dom"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"

interface UseLogout {
	handleLogout: () => void;
}

export const useLogout = (): UseLogout => {
	const navigate = useNavigate()
	const { setUserData } = useNavigationContext()

	const handleLogout = async () => {
		try {
			showToast("Déconnexion", "Déconnexion en cours", true)
			setUserData(null)
			showToast("Déconnexion", "Déconnexion réussie", false)
			navigate("/")
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de la déconnexion")
		}
	}

	return { handleLogout }
}
