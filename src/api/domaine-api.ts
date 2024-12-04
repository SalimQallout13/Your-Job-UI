import { axiosInstance } from "@/api/axios-instance.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import axios from "axios"

export interface SecteurActivite {
	id: string;
	nom: string;
}

export interface GetSecteursActiviteResponse {
	secteursActivite: SecteurActivite[];
	message?: string;
}

export const getSecteursActivite = async (): Promise<GetSecteursActiviteResponse> => {
	try {
		const response = await axiosInstance.get(ROUTES_BACK.GET_ALL_SECTEURS_ACTIVITE)

		// Vérification et transformation des données
		if (Array.isArray(response.data)) {
			return {
				secteursActivite: response.data.map(secteurActivite => ({
					id: secteurActivite._id,
					nom: secteurActivite.nom
				}))
			}
		}

		console.error("Format de réponse invalide:", response.data)
		return {
			secteursActivite: [],
			message: "Format de réponse invalide"
		}

	} catch (error) {
		console.error("Erreur lors de la récupération des secteurs:", error)

		if (axios.isAxiosError(error)) {
			return {
				secteursActivite: [],
				message: error.response?.data?.message || "Une erreur est survenue lors de la récupération des secteurs d'activité"
			}
		}

		return {
			secteursActivite: [],
			message: "Erreur réseau ou serveur"
		}
	}
}
