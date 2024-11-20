// navigation-context.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes"
import { UserData } from "@/lib/interfaces/userData.ts"

// Définition du type des données fournies par le contexte
interface NavigationContextType {
	isSubmitting: boolean;
	errorMessage: string | null;
	startSubmitting: () => void;
	stopSubmitting: () => void;
	redirectToHome: () => void;
	displayErrorMessage: (error: string) => void;
	userData: UserData | null;
	setUserData: (user: UserData | null) => void;
	updateUserData: (updates: Partial<UserData>) => void;
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
		const timeoutId = setTimeout(() => setErrorMessage(null), 5000)
		return () => clearTimeout(timeoutId) // Nettoie le timeout
	}

	const [userData, setUserData] = useState<UserData | null>(() => {
		const storedUser = localStorage.getItem("userData")
		return storedUser ? JSON.parse(storedUser) : null
	})

	const updateUserData = (updates: Partial<UserData>) => {
		setUserData((prev) => (prev ? { ...prev, ...updates } : null));
	};


	useEffect(() => {
		if (userData) {
			localStorage.setItem("userData", JSON.stringify(userData))
		} else {
			localStorage.removeItem("userData")
		}
	}, [userData])

	return (
		<NavigationContext.Provider
			value={{
				isSubmitting,
				errorMessage,
				startSubmitting,
				stopSubmitting,
				redirectToHome,
				displayErrorMessage,
				userData,
				setUserData,
				updateUserData
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
