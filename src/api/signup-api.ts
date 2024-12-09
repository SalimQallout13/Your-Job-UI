import axios from "axios"
import {axiosInstance, handleAxiosError} from "@/api/axios-instance.ts"
import {SignupFormData} from "@/lib/context/signup-context.tsx"
import {
    SignupThirdStepCandidateSchema,
    SignupThirdStepEmployeurSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import {ROUTES_BACK} from "@/lib/configs/routes-back.ts"
import {Roles} from "@/lib/enums/Roles.ts"
import {ApiResponse} from "@/lib/types/api/ApiResponse.ts"
import {UserData} from "@/lib/interfaces/userData.ts"

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
            params: {email}
        })
        return {isEmailTaken: response.data.exists}
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
            params: {phone}
        })
        return {isPhoneTaken: response.data.exists}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la vérification du numéro de téléphone")
        }
        throw new Error("Erreur réseau ou serveur")
    }
}

export const signup = async (formData: SignupFormData): Promise<ApiResponse<UserData>> => {
    // Vérification des données requises
    if (!formData.secondStepData || !formData.thirdStepData || !formData.firstStepData?.userRole) {
        throw new Error("Données du formulaire incomplètes")
    }

    try {
        const isCandidateData = (data: SignupThirdStepCandidateSchema | SignupThirdStepEmployeurSchema): data is SignupThirdStepCandidateSchema => {
            return "cv" in data && "lettreMotivation" in data
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
            if (formData.thirdStepData.photo) fileFormData.append("photo", formData.thirdStepData.photo)
            if (formData.thirdStepData.currentPoste) fileFormData.append("currentPoste", formData.thirdStepData.currentPoste)
            if (formData.thirdStepData.cv) fileFormData.append("cv", formData.thirdStepData.cv)
            if (formData.thirdStepData.lettreMotivation) fileFormData.append("lettreMotivation", formData.thirdStepData.lettreMotivation)
        } else if (formData.firstStepData.userRole == Roles.Entreprise && !isCandidateData(formData.thirdStepData)) {
            if (formData.thirdStepData.photo) fileFormData.append("logo", formData.thirdStepData.photo)
            fileFormData.append("companyName", formData.thirdStepData.companyName)
            fileFormData.append("secteurActivite", formData.thirdStepData.secteurActivite)
            fileFormData.append("employeCount", formData.thirdStepData.employeCount.toString())
            fileFormData.append("contactPoste", formData.thirdStepData.contactPoste)

        }

        const response = await axiosInstance.post<UserData>(ROUTES_BACK.SIGNUP, fileFormData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        return {status: "success", data: response.data}
    } catch (error) {
        return handleAxiosError<UserData>(error)
    }
}
