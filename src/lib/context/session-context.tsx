import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { CandidatProfile, RecruteurProfile, UserData } from "@/lib/interfaces/userData.ts"
import { Roles } from "@/lib/enums/Roles.ts"

// Définition du type des données fournies par le contexte
interface SessionContextType {
	userData: UserData | null;
	setUserData: (data: UserData | null) => void;
	updateUserData: (updates: Partial<UserData>) => void;
	photoProfile?: string;
	candidatData: {
		currentPoste?: string;
		cv?: string;
		lettreMotivation?: string;
	};
	recruteurData: {
		contactPoste?: string;
		companyName?: string;
		employeCount?: number;
		secteurActivite?: string;
	};
	isCandidatProfile?: boolean;
	isRecruteurProfile?: boolean;
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

	const isCandidatProfile = userData?.role === Roles.Candidat
	const isRecruteurProfile = userData?.role === Roles.Recruteur

	const candidatData = {
		currentPoste: isCandidatProfile ? (userData?.profile as CandidatProfile)?.currentPoste : undefined,
		cv: isCandidatProfile ? (userData?.profile as CandidatProfile)?.cv : undefined,
		lettreMotivation: isCandidatProfile ? (userData?.profile as CandidatProfile)?.lettreMotivation : undefined
	}

	const recruteurData = {
		contactPoste: isRecruteurProfile ? (userData?.profile as RecruteurProfile)?.contactPoste : undefined,
		companyName: isRecruteurProfile ? (userData?.profile as RecruteurProfile)?.companyName : undefined,
		employeCount: isRecruteurProfile ? (userData?.profile as RecruteurProfile)?.employeCount : undefined,
		secteurActivite: isRecruteurProfile ? (userData?.profile as RecruteurProfile)?.secteurActivite : undefined
	}

	const convertToFile = async (fileName: string | undefined): Promise<File | null> => {
		if (!fileName) return null // Si aucune photo n'est présente
		try {
			const imageUrl = `${import.meta.env.VITE_API_URL.replace("/api", "/uploads")}/${fileName}`
			const response = await fetch(imageUrl)

			if (!response.ok) {
				throw new Error(`Erreur réseau: ${response.status} ${response.statusText}`)
			}

			const blob = await response.blob()
			if (blob.size === 0) {
				throw new Error("L'image récupérée est vide.")
			}

			return new File([blob], fileName, { type: blob.type })
		} catch (error) {
			console.error("Erreur lors de la conversion de l'URL en File:", error)
			return null
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
				candidatData,
				isCandidatProfile,
				recruteurData,
				isRecruteurProfile,
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
