import axios from "axios"
import { axiosInstance } from "@/api/axios-instance.ts"
import { SignupFormData } from "@/lib/context/signup-context.tsx"
import { SignupThirdStepCandidateSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"

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
		const response = await axiosInstance.get(ROUTES_BACK.VERIFY_EMAIL, {
			params: { email },
		});
		return { isEmailTaken: response.data.exists };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la vérification de l'email");
		}
		throw new Error("Erreur réseau ou serveur");
	}
};

export const checkPhone = async (phone: string): Promise<CheckPhoneResponse> => {
	try {
		const response = await axiosInstance.get(ROUTES_BACK.VERIFY_PHONE, {
			params: { phone },
		});
		return { isPhoneTaken: response.data.exists };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la vérification du numéro de téléphone");
		}
		throw new Error("Erreur réseau ou serveur");
	}
};

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
		const response = await axiosInstance.get(ROUTES_BACK.GET_ALL_SECTEURS_ACTIVITE);

		// Vérification et transformation des données
		if (Array.isArray(response.data)) {
			return {
				secteursActivite: response.data.map(secteurActivite => ({
					id: secteurActivite._id,
					nom: secteurActivite.nom
				}))
			};
		}

		console.error("Format de réponse invalide:", response.data);
		return {
			secteursActivite: [],
			message: "Format de réponse invalide"
		};

	} catch (error) {
		console.error("Erreur lors de la récupération des secteurs:", error);

		if (axios.isAxiosError(error)) {
			return {
				secteursActivite: [],
				message: error.response?.data?.message || "Une erreur est survenue lors de la récupération des secteurs d'activité"
			};
		}

		return {
			secteursActivite: [],
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
	if (!formData.secondStepData || !formData.thirdStepData || !formData.firstStepData?.userRole) {
		throw new Error("Données du formulaire incomplètes");
	}

	try {
		const isCandidateData = (data: Partial<unknown>): data is SignupThirdStepCandidateSchema => {
			return 'cv' in data && 'lettreMotivation' in data && 'photo' in data;
		};

		const baseUserData = {
			email: formData.secondStepData.email,
			password: formData.secondStepData.password,
			nom: formData.secondStepData.nom,
			prenom: formData.secondStepData.prenom,
			telephone: formData.secondStepData.telephone,
			role: formData.firstStepData.userRole === 'candidate' ? 1 : 2,
			ville: formData.thirdStepData.ville,
			codePostal: formData.thirdStepData.codePostal,
			adresse: formData.thirdStepData.adresse,
		};

		const specificData = formData.firstStepData.userRole === 'candidate' && isCandidateData(formData.thirdStepData)
			? {
				cv: formData.thirdStepData.cv?.name ?? null,
				lettreMotivation: formData.thirdStepData.lettreMotivation?.name ?? null,
				photo: formData.thirdStepData.photo?.name ?? null,
				currentPoste: formData.thirdStepData.currentPoste,
			}
			: formData.firstStepData.userRole === 'employer' && !isCandidateData(formData.thirdStepData) && {
				companyName: formData.thirdStepData.companyName,
				secteurActivite: formData.thirdStepData.secteurActivite,
				logo: formData.thirdStepData.logo?.name ?? null,
				employeCount: formData.thirdStepData.employeCount.toString() ?? null,
				contactPoste: formData.thirdStepData.contactPoste,
			};

		const userData = {
			...baseUserData,
			...specificData,
			dateCreation: new Date(),
			dateModification: new Date()
		};

		const response = await axiosInstance.post<unknown>(ROUTES_BACK.SIGNUP, userData);
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