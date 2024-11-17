import axios from "axios"

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
