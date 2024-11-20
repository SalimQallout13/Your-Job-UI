import axios from "axios"
import { axiosInstance } from "@/api/axios-instance.ts"
import { SignupFormData } from "@/lib/context/signup-context.tsx"
import {
	SignupThirdStepCandidateSchema,
	SignupThirdStepEmployeurSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import { Roles } from "@/lib/enums/Roles.ts"

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
			params: { email }
		})
		return { isEmailTaken: response.data.exists }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la vérification de l'email")
		}
		throw new Error("Erreur réseau ou serveur")
	}
}

export const checkPhone = async (phone: string): Promise<CheckPhoneResponse> => {
	try {
		const response = await axiosInstance.get(ROUTES_BACK.VERIFY_PHONE, {
			params: { phone }
		})
		return { isPhoneTaken: response.data.exists }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la vérification du numéro de téléphone")
		}
		throw new Error("Erreur réseau ou serveur")
	}
}

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

interface ValidationError {
	msg: string;
	param?: string;
	location?: string;
}

const isValidationError = (error: any): error is { errors: ValidationError[] } => {
	return Array.isArray(error.errors) && error.errors.every((err: any) => "msg" in err)
}

export const signup = async (formData: SignupFormData): Promise<unknown> => {
	// Vérification des données requises
	if (!formData.secondStepData || !formData.thirdStepData || !formData.firstStepData?.userRole) {
		throw new Error("Données du formulaire incomplètes")
	}

	try {
		const isCandidateData = (
			data: SignupThirdStepCandidateSchema | SignupThirdStepEmployeurSchema
		): data is SignupThirdStepCandidateSchema => {
			return "photo" in data && "cv" in data && "lettreMotivation" in data
		}


		// Création de l'objet FormData pour les fichiers
		const fileFormData = new FormData()

		if (formData.firstStepData.userRole === Roles.Candidat && isCandidateData(formData.thirdStepData)) {
			// Nous sommes dans le contexte d'un candidat
			if (formData.thirdStepData.photo) {
				fileFormData.append("photo", formData.thirdStepData.photo)
			}
			if (formData.thirdStepData.cv) {
				fileFormData.append("cv", formData.thirdStepData.cv)
			}
			if (formData.thirdStepData.lettreMotivation) {
				fileFormData.append("lettreMotivation", formData.thirdStepData.lettreMotivation)
			}
		} else if (formData.firstStepData.userRole === Roles.Entreprise) {
			// Nous sommes dans le contexte d'un employeur
			if ("logo" in formData.thirdStepData && formData.thirdStepData.logo) {
				fileFormData.append("logo", formData.thirdStepData.logo)
			}
		}


		// Upload des fichiers avant d'envoyer les données utilisateur
		const fileUploadResponse = await axiosInstance.post(ROUTES_BACK.UPLOAD_FILE, fileFormData, {
			headers: { "Content-Type": "multipart/form-data" }
		})

		// Récupération des noms de fichiers ou des URLs depuis la réponse
		const uploadedFiles = fileUploadResponse.data

		// Assignation des fichiers uploadés aux données utilisateur
		const baseUserData = {
			email: formData.secondStepData.email,
			password: formData.secondStepData.password,
			nom: formData.secondStepData.nom,
			prenom: formData.secondStepData.prenom,
			telephone: formData.secondStepData.telephone,
			role: formData.firstStepData.userRole === Roles.Candidat ? 0 : 2,
			ville: formData.thirdStepData.ville,
			codePostal: formData.thirdStepData.codePostal,
			adresse: formData.thirdStepData.adresse
		}

		const specificData = formData.firstStepData.userRole === Roles.Candidat && isCandidateData(formData.thirdStepData)
			? {
				cv: uploadedFiles.cv ?? null,
				lettreMotivation: uploadedFiles.lettreMotivation ?? null,
				photo: uploadedFiles.photo ?? null,
				currentPoste: formData.thirdStepData.currentPoste
			}
			: formData.firstStepData.userRole === Roles.Entreprise && !isCandidateData(formData.thirdStepData) && {
			companyName: formData.thirdStepData.companyName,
			secteurActivite: formData.thirdStepData.secteurActivite,
			logo: uploadedFiles.logo ?? null,
			employeCount: formData.thirdStepData.employeCount.toString() ?? null,
			contactPoste: formData.thirdStepData.contactPoste
		}

		const userData = {
			...baseUserData,
			...specificData,
			dateCreation: new Date(),
			dateModification: new Date()
		}

		const response = await axiosInstance.post<unknown>(ROUTES_BACK.SIGNUP, userData)
		return response.data

	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Erreur de validation du backend
			if (error.response?.status === 400) {
				if (isValidationError(error.response.data)) {
					const validationErrors = error.response.data.errors
						.map(err => err.msg)
						.join(", ")
					throw new Error(validationErrors)
				}

				// Erreur spécifique (comme email déjà utilisé)
				if (error.response.data.error) {
					throw new Error(error.response.data.error)
				}
			}

			// Autres erreurs HTTP
			if (error.response?.status === 500) {
				throw new Error("Erreur serveur, veuillez réessayer plus tard")
			}
		}

		// Erreurs non-HTTP
		console.error("Erreur lors de l'inscription:", error)
		throw new Error("Une erreur inattendue est survenue")
	}
}
