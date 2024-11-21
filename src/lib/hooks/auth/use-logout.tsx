import { showToast } from "@/lib/hooks/use-toast.tsx"
import { useNavigate } from "react-router-dom"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"

interface UseLogout {
	handleLogout: () => void;
}

export const useLogout = (): UseLogout => {
	const navigate = useNavigate()
	const { setUserData } = useNavigationContext()

	// Fonction logout asynchrone sans délai de simulation
	const logout = async () => {
		// Supprime les données de l'utilisateur
		setUserData(null)
	}

	const handleLogout = async () => {
		showToast("Déconnexion", "Déconnexion en cours", true)
		await logout() // Attendre la fin de `logout` (même si instantané)
		showToast("Déconnexion", "Déconnexion réussie", false)
		navigate("/")
	}

	return { handleLogout }
}
