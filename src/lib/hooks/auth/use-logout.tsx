import { useCallback } from "react"
import { showToast } from "@/lib/hooks/use-toast.tsx"
import { BadgeCheck } from "lucide-react"

interface UseLogout {
	handleLogout: () => void;
}

export const useLogout = (): UseLogout => {

	// Fonction logout asynchrone sans délai de simulation
	const logout = async () => {
		// Supprime les données de l'utilisateur
		localStorage.removeItem("userData")
	}

	const showInitialLogoutMessage = () => {
		showToast("Déconnexion", "Déconnexion en cours", true)
	}

	const showLogoutSuccessMessage = () => {
		showToast("Déconnexion", "Déconnexion réussie", false, <BadgeCheck className="mr-2 size-4 text-green-600" />)
	}

	const handleLogout = useCallback(async () => {
		showInitialLogoutMessage()
		await logout() // Attendre la fin de `logout` (même si instantané)
		showLogoutSuccessMessage()
		setTimeout(() => location.reload(), 1000) // Recharger la page après le logout
	}, [])

	return { handleLogout }
}
