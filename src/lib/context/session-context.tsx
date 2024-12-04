import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { CandidatProfile, UserData } from "@/lib/interfaces/userData.ts"

// Définition du type des données fournies par le contexte
interface SessionContextType {
	userData: UserData | null;
	setUserData: (data: UserData | null) => void;
	updateUserData: (updates: Partial<UserData>) => void;
	photoProfile?: string;
	currentPoste?: string;
	isCandidatProfile?: boolean;
	convertToFile: (fileName: string | undefined) => Promise<File | null>;
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

	const isCandidatProfile = userData?.profileModel === "CandidatProfile";

	const currentPoste = isCandidatProfile ? (userData?.profile as CandidatProfile)?.currentPoste : undefined;

	const convertToFile = async (fileName: string | undefined): Promise<File | null> => {
		if (!fileName) return null // Si aucune photo n'est présente
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL.replace("/api", "/uploads")}/${fileName}`)
			const blob = await response.blob()
			return new File([blob], fileName, { type: blob.type })
		} catch (error) {
			console.error("Erreur lors de la conversion de l'URL en File:", error)
			return null // Retourne undefined en cas d'échec
		}
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
		<SessionContext.Provider
			value={{
				userData,
				setUserData,
				updateUserData,
				currentPoste,
				isCandidatProfile,
				convertToFile
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
