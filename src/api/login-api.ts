import { axiosInstance } from "@/api/axios-instance.ts"
import axios from "axios"
import { UserData } from "@/lib/interfaces/userData.ts" // Type des données utilisateur
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { UserSignInRequest } from "@/lib/types/api/requests/UserSignInRequest.ts" // Requête pour l'authentification
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import { UpdateProfileRequest } from "@/lib/types/api/requests/UpdateProfileRequest.ts" // Requête pour la mise à jour

// Fonction utilitaire générique pour gérer les erreurs
const handleAxiosError = <T>(error: unknown): ApiResponse<T> => {
	if (axios.isAxiosError(error)) {
		const errorMessage =
			error.response?.data?.errors?.[0]?.msg || // Tableau d'erreurs
			error.response?.data?.error || // Message erreur unique
			"Une erreur est survenue."
		return { status: "error", error: errorMessage }
	}
	return { status: "error", error: "Erreur réseau ou serveur." }
}

export const login = async (credentials: UserSignInRequest): Promise<ApiResponse<UserData>> => {
	try {
		const response = await axiosInstance.post<UserData>(ROUTES_BACK.SIGNIN, credentials)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}

export const updateProfile = async (form: UpdateProfileRequest): Promise<ApiResponse<unknown>> => {
	try {
		const response = await axiosInstance.patch<unknown>(ROUTES_BACK.UPDATE_PROFILE, form)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<unknown>(error)
	}
}
