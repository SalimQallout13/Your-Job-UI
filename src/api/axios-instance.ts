// axios-instance.ts
import axios, { AxiosInstance } from "axios"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"

class ApiInstance {
	private readonly axiosInstance: AxiosInstance

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json"
			}
		})

		// Gestion globale des erreurs ici si besoin
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			(error) => {
				// Traiter ici toutes les erreurs non capturées
				console.error("Erreur API:", error)
				return Promise.reject(error)
			}
		)
	}

	public getInstance() {
		return this.axiosInstance
	}
}

const apiInstance = new ApiInstance(import.meta.env.VITE_API_URL);
export const axiosInstance = apiInstance.getInstance()

// Fonction utilitaire générique pour gérer les erreurs
export const handleAxiosError = <T>(error: unknown): ApiResponse<T> => {
	if (axios.isAxiosError(error)) {
		const errorMessage =
			error.response?.data?.errors?.[0]?.msg || // Tableau d'erreurs
			error.response?.data?.error || // Message erreur unique
			"Une erreur est survenue."
		return { status: "error", error: errorMessage }
	}
	return { status: "error", error: "Erreur réseau ou serveur." }
}