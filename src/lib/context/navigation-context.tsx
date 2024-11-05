// navigation-context.tsx
import { createContext, useContext, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes"

// Définition du type des données fournies par le contexte
interface NavigationContextType {
	isSubmitting: boolean;
	errorMessage: string | null;
	startSubmitting: () => void;
	stopSubmitting: () => void;
	redirectToHome: () => void;
	displayErrorMessage: (error: string) => void;
}

// Création du contexte
const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Provider pour le contexte
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const startSubmitting = () => setIsSubmitting(true)
	const stopSubmitting = () => setIsSubmitting(false)
	const redirectToHome = () => navigate(ROUTES.HOME_PATH)
	const displayErrorMessage = (error: string) => {
		setErrorMessage(error)
		clearErrorMessageAfterDelay()
	}

	const clearErrorMessageAfterDelay = () => {
		setTimeout(() => setErrorMessage(null), 5000)
	}

	return (
		<NavigationContext.Provider
			value={{
				isSubmitting,
				errorMessage,
				startSubmitting,
				stopSubmitting,
				redirectToHome,
				displayErrorMessage
			}}
		>
			{children}
		</NavigationContext.Provider>
	)
}

// Hook pour utiliser le contexte
export const useNavigationContext = (): NavigationContextType => {
	const context = useContext(NavigationContext)
	if (context === undefined) {
		throw new Error("useNavigationContext must be used within a NavigationProvider")
	}
	return context
}
