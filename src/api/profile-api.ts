import { CandidatProfile, RecruteurProfile, UserData } from "@/lib/interfaces/userData.ts"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { axiosInstance, handleAxiosError } from "@/api/axios-instance.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import { UpdateProfileSchema } from "@/lib/schemas-validation-form/updateProfile.ts"
import { BaseProfileCandidatSchema, BaseProfileRecruteurSchema } from "@/lib/schemas-validation-form/userValidation.ts"

export const updateUserInfo = async (targetId: UserData["_id"], formData: UpdateProfileSchema): Promise<ApiResponse<UserData>> => {
	try {
		const fileFormData = new FormData()
		if (formData.photo) fileFormData.append("photo", formData.photo)
		fileFormData.append("prenom", formData.prenom)
		fileFormData.append("nom", formData.nom)
		fileFormData.append("telephone", formData.telephone)
		fileFormData.append("email", formData.email)
		const response = await axiosInstance.put<UserData>(ROUTES_BACK.UPDATE_USER + targetId, fileFormData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}

export const updateProfileCandidat = async (targetId: UserData["_id"], formData: BaseProfileCandidatSchema): Promise<ApiResponse<CandidatProfile>> => {
	try {
		const fileFormData = new FormData()
		if (formData.currentPoste) fileFormData.append("currentPoste", formData.currentPoste)
		fileFormData.append("ville", formData.ville)
		fileFormData.append("codePostal", formData.codePostal)
		fileFormData.append("adresse", formData.adresse)
		if (formData.cv) fileFormData.append("cv", formData.cv)
		if (formData.lettreMotivation) fileFormData.append("lettreMotivation", formData.lettreMotivation)
		const response = await axiosInstance.put<CandidatProfile>(ROUTES_BACK.UPDATE_PROFILE_CANDIDAT + targetId, formData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<CandidatProfile>(error)
	}
}

export const updateProfileRecruteur = async (targetId: UserData["_id"], formData: BaseProfileRecruteurSchema): Promise<ApiResponse<RecruteurProfile>> => {
	try {
		const response = await axiosInstance.put<RecruteurProfile>(ROUTES_BACK.UPDATE_PROFILE_RECRUTEUR + targetId, formData)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<RecruteurProfile>(error)
	}
}
