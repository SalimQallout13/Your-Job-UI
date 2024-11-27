import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { UserData } from "@/lib/interfaces/userData.ts"
import { ROUTES } from "@/lib/configs/routes.ts"
import { useNavigate } from "react-router-dom"

// Définition du type des données fournies par le contexte
interface NavigationContextType {
	isSubmitting: boolean;
	setIsSubmitting: (isSubmitting: boolean) => void;
	errorMessage: string | null;
	displayErrorMessage: (error: string) => void;
	userData: UserData | null;
	setUserData: (data: UserData | null) => void;
	updateUserData: (updates: Partial<UserData>) => void;
	navigateTo: (path: typeof ROUTES[keyof typeof ROUTES]) => void;
}

// Création du contexte
const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Provider pour le contexte
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
	// Gestion des états
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [userData, setUserData] = useState<UserData | null>(() => {
		const storedUserData = localStorage.getItem("userData")
		return storedUserData ? JSON.parse(storedUserData) : null
	})
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

	// Mise à jour des données utilisateur
	const updateUserData = (updates: Partial<UserData>) => {
		setUserData((prev) => (prev ? { ...prev, ...updates } : null))
	}

	// Synchronisation des données utilisateur avec localStorage
	useEffect(() => {
		console.log("userData", userData)
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
				setIsSubmitting,
				errorMessage,
				displayErrorMessage,
				userData,
				setUserData,
				updateUserData,
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
