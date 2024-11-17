import axios from "axios"
import { axiosInstance } from "@/api/axios-instance.ts"
import { SignupFormData } from "@/lib/context/signup-context.tsx"
import { SignupThirdStepCandidateSchema } from "@/lib/schemas-validation-form/signupValidation.ts"

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

interface ValidationError {
	msg: string;
	param?: string;
	location?: string;
}

const isValidationError = (error: any): error is { errors: ValidationError[] } => {
	return Array.isArray(error.errors) && error.errors.every((err: any) => 'msg' in err);
};

export const signup = async (formData: SignupFormData): Promise<unknown> => {
	// Vérification des données requises
	if (!formData.secondStepData || !formData.thirdStepData || !formData.firstStepData?.userType) {
		throw new Error("Données du formulaire incomplètes");
	}

	try {
		const isCandidateData = (data: Partial<unknown>): data is SignupThirdStepCandidateSchema => {
			return 'cv' in data && 'motivationLetter' in data && 'photo' in data;
		};

		const baseUserData = {
			email: formData.secondStepData.email,
			password: formData.secondStepData.password,
			nom: formData.secondStepData.lastName,
			prenom: formData.secondStepData.firstName,
			telephone: formData.secondStepData.phoneNumber,
			role: formData.firstStepData.userType === 'candidate' ? 1 : 2,
			ville: formData.thirdStepData.ville,
			codePostal: formData.thirdStepData.codePostal,
			adresse: formData.thirdStepData.adresse,
		};

		const specificData = formData.firstStepData.userType === 'candidate' && isCandidateData(formData.thirdStepData)
			? {
				cv: formData.thirdStepData.cv?.name ?? null,
				lettreMotivation: formData.thirdStepData.motivationLetter?.name ?? null,
				photo: formData.thirdStepData.photo?.name ?? null,
				currentPoste: formData.thirdStepData.currentPoste,
			}
			: formData.firstStepData.userType === 'employer' && !isCandidateData(formData.thirdStepData) && {
				companyName: formData.thirdStepData.companyName,
				sector: formData.thirdStepData.sector,
				logo: formData.thirdStepData.logo?.name ?? null,
			};

		const userData = {
			...baseUserData,
			...specificData,
			dateCreation: new Date(),
			dateModification: new Date()
		};

		const response = await axiosInstance.post<unknown>('/auth/inscription', userData);
		return response.data;

	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Erreur de validation du backend
			if (error.response?.status === 400) {
				if (isValidationError(error.response.data)) {
					const validationErrors = error.response.data.errors
						.map(err => err.msg)
						.join(', ');
					throw new Error(validationErrors);
				}

				// Erreur spécifique (comme email déjà utilisé)
				if (error.response.data.error) {
					throw new Error(error.response.data.error);
				}
			}

			// Autres erreurs HTTP
			if (error.response?.status === 500) {
				throw new Error("Erreur serveur, veuillez réessayer plus tard");
			}
		}

		// Erreurs non-HTTP
		console.error("Erreur lors de l'inscription:", error);
		throw new Error("Une erreur inattendue est survenue");
	}
};