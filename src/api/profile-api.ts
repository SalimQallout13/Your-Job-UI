import { UserData } from "@/lib/interfaces/userData.ts"
import { SignupThirdStepCandidateSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { axiosInstance, handleAxiosError } from "@/api/axios-instance.ts"
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"
import { UpdateProfileSchema } from "@/lib/schemas-validation-form/updateProfile.ts"

export const updateProfile = async (targetId: UserData["_id"], formData: UpdateProfileSchema): Promise<ApiResponse<UserData>> => {
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

export const updateProfileCandidat = async (targetId: UserData["_id"], formData: SignupThirdStepCandidateSchema): Promise<ApiResponse<UserData>> => {
	try {
		const response = await axiosInstance.put<UserData>(ROUTES_BACK.UPDATE_PROFILE_CANDIDAT + targetId, formData)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}

export const updatePhotoProfile = async (targetId: UserData["_id"], url: UserData["photo"]): Promise<ApiResponse<UserData>> => {
	try {
		const response = await axiosInstance.put<UserData>(ROUTES_BACK.UPDATE_PHOTO_PROFILE + targetId, url)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}
