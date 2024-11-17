import axios from "axios"
import { axiosInstance } from "@/api/axios-instance.ts"

interface CheckEmailResponse {
	isEmailTaken: boolean;
	message?: string;
}

interface CheckPhoneResponse {
	isPhoneTaken: boolean;
	message?: string;
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
	try {
		// Simuler un appel API pour l'email
		return await new Promise<CheckEmailResponse>((resolve) => {
			setTimeout(() => {
				resolve({
					isEmailTaken: email === "admin@gmail.com",
					message: "Cette adresse email est déjà utilisée"
				});
			}, 1000);
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors[0]?.message || "Une erreur est survenue");
		}
		throw new Error("Erreur réseau ou serveur");
	}
};

export const checkPhone = async (phone: string): Promise<CheckPhoneResponse> => {
	try {
		// Simuler un appel API pour le téléphone
		return await new Promise<CheckPhoneResponse>((resolve) => {
			setTimeout(() => {
				resolve({
					isPhoneTaken: phone === "0612028485",
					message: "Ce numéro de téléphone est déjà utilisé"
				});
			}, 1000);
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors[0]?.message || "Une erreur est survenue");
		}
		throw new Error("Erreur réseau ou serveur");
	}
};

export interface Sector {
	id: string;
	nom: string;
}

export interface GetSectorsResponse {
	sectors: Sector[];
	message?: string;
}

export const getSectors = async (): Promise<GetSectorsResponse> => {
	try {
		const response = await axiosInstance.get('/domaines');

		if (Array.isArray(response.data)) {
			return {
				sectors: response.data.map(sector => ({
					id: sector._id,
					nom: sector.nom
				}))
			};
		}

		throw new Error("Format de réponse invalide");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Gestion spécifique des erreurs HTTP
			const errorMessage = error.response?.data?.message
				|| "Une erreur est survenue lors de la récupération des secteurs d'activité";

			throw new Error(errorMessage);
		}

		throw new Error("Erreur réseau ou serveur");
	}
};