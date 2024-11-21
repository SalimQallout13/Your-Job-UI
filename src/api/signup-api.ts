import axios from "axios"
import { axiosInstance } from "@/api/axios-instance.ts"
import { SignupFormData } from "@/lib/context/signup-context.tsx"
import {
	SignupThirdStepCandidateSchema,
	SignupThirdStepEmployeurSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import { Roles } from "@/lib/enums/Roles.ts"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { UserData } from "@/lib/interfaces/userData.ts"
import { handleAxiosError } from "@/api/login-api.ts"

interface CheckEmailResponse {
	isEmailTaken: boolean;
	message?: string;
}

interface CheckPhoneResponse {
	isPhoneTaken: boolean;
	message?: string;
}

export interface SecteurActivite {
	id: string;
	nom: string;
}

export interface GetSecteursActiviteResponse {
	secteursActivite: SecteurActivite[];
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

export const signup = async (formData: SignupFormData): Promise<ApiResponse<UserData>> => {
	// Vérification des données requises
	if (!formData.secondStepData || !formData.thirdStepData || !formData.firstStepData?.userRole) {
		throw new Error("Données du formulaire incomplètes")
	}

	try {
		const isCandidateData = (data: SignupThirdStepCandidateSchema | SignupThirdStepEmployeurSchema): data is SignupThirdStepCandidateSchema => {
			return "photo" in data && "cv" in data && "lettreMotivation" in data
		}

		// Création de l'objet FormData pour les fichiers
		const fileFormData = new FormData()
		fileFormData.append("email", formData.secondStepData.email)
		fileFormData.append("password", formData.secondStepData.password)
		fileFormData.append("nom", formData.secondStepData.nom)
		fileFormData.append("prenom", formData.secondStepData.prenom)
		fileFormData.append("telephone", formData.secondStepData.telephone)
		fileFormData.append("role", formData.firstStepData.userRole.toString())
		fileFormData.append("ville", formData.thirdStepData.ville)
		fileFormData.append("codePostal", formData.thirdStepData.codePostal)
		fileFormData.append("adresse", formData.thirdStepData.adresse)

		if (formData.firstStepData.userRole == Roles.Candidat && isCandidateData(formData.thirdStepData)) {
			// Nous sommes dans le contexte d'un candidat
			if (formData.thirdStepData.photo) fileFormData.append("photo", formData.thirdStepData.photo)
			fileFormData.append("cv", formData.thirdStepData.cv)
			fileFormData.append("lettreMotivation", formData.thirdStepData.lettreMotivation)
			if (formData.thirdStepData.currentPoste) fileFormData.append("currentPoste", formData.thirdStepData.currentPoste)
		} else if (formData.firstStepData.userRole == Roles.Entreprise && !isCandidateData(formData.thirdStepData)) {
			// Nous sommes dans le contexte d'un employeur
			fileFormData.append("companyName", formData.thirdStepData.companyName)
			fileFormData.append("secteurActivite", formData.thirdStepData.secteurActivite)
			if (formData.thirdStepData.logo) fileFormData.append("logo", formData.thirdStepData.logo)
			fileFormData.append("employeCount", formData.thirdStepData.employeCount.toString())
			fileFormData.append("contactPoste", formData.thirdStepData.contactPoste)

		}

		const response = await axiosInstance.post<UserData>(ROUTES_BACK.SIGNUP, fileFormData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}
