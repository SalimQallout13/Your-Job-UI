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

		// Vérification et transformation des données
		if (Array.isArray(response.data)) {
			return {
				sectors: response.data.map(sector => ({
					id: sector._id,
					nom: sector.nom
				}))
			};
		}

		console.error("Format de réponse invalide:", response.data);
		return {
			sectors: [],
			message: "Format de réponse invalide"
		};

	} catch (error) {
		console.error("Erreur lors de la récupération des secteurs:", error);

		// Au lieu de throw, on retourne un objet avec un tableau vide et un message d'erreur
		if (axios.isAxiosError(error)) {
			return {
				sectors: [],
				message: error.response?.data?.message || "Une erreur est survenue lors de la récupération des secteurs d'activité"
			};
		}

		return {
			sectors: [],
			message: "Erreur réseau ou serveur"
		};
	}
};