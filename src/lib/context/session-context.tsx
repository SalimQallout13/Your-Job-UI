import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { CandidatProfile, RecruteurProfile, UserData } from "@/lib/interfaces/userData.ts"
import { Roles } from "@/lib/enums/Roles.ts"

// Définition du type des données fournies par le contexte
interface SessionContextType {
	userData: UserData | null;
	setUserData: (data: UserData | null) => void;
	updateUserData: (updates: Partial<UserData>) => void;
	photoProfile?: string;
}

// Création du contexte
const SessionContext = createContext<SessionContextType | undefined>(undefined)

// Provider pour le contexte
export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<UserData | null>(() => {
		const storedUserData = localStorage.getItem("userData")
		return storedUserData ? JSON.parse(storedUserData) : null
	})

	// Mise à jour des données utilisateur
	const updateUserData = (updates: Partial<UserData>) => {
		setUserData((prev) => (prev ? { ...prev, ...updates } : null))
	}

	const photoProfile = userData
		? userData.role === Roles.Candidat
			? (userData.profile as CandidatProfile)?.photo
			: (userData.profile as RecruteurProfile)?.logo
		: undefined

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
		<SessionContext.Provider
			value={{
				userData,
				setUserData,
				updateUserData,
				photoProfile
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

// Hook pour utiliser le contexte
export const useSessionContext = (): SessionContextType => {
	const context = useContext(SessionContext)
	if (context === undefined) {
		throw new Error("useSessionContext must be used within a SessionProvider")
	}
	return context
}
