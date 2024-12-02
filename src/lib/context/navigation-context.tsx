import { createContext, useContext, useState, ReactNode } from "react"
import { ROUTES } from "@/lib/configs/routes.ts"
import { useNavigate } from "react-router-dom"

// Définition du type des données fournies par le contexte
interface NavigationContextType {
	isSubmitting: boolean;
	setIsSubmitting: (isSubmitting: boolean) => void;
	errorMessage: string | null;
	displayErrorMessage: (error: string) => void;
	navigateTo: (path: typeof ROUTES[keyof typeof ROUTES]) => void;
}

// Création du contexte
const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Provider pour le contexte
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
	// Gestion des états
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const navigate = useNavigate()

	// Affichage des messages d'erreur avec timeout
	const displayErrorMessage = (error: string) => {
		setErrorMessage(error)
		const timeoutId = setTimeout(() => setErrorMessage(null), 5000)
		return () => clearTimeout(timeoutId)
	}

	const navigateTo = (path: typeof ROUTES[keyof typeof ROUTES]) => {
		navigate(path)
	}
	return (
		<NavigationContext.Provider
			value={{
				isSubmitting,
				setIsSubmitting,
				errorMessage,
				displayErrorMessage,
				navigateTo
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
