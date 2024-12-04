import { axiosInstance, handleAxiosError } from "@/api/axios-instance.ts"
import { UserData } from "@/lib/interfaces/userData.ts" // Type des données utilisateur
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { UserSignInRequest } from "@/lib/types/api/requests/UserSignInRequest.ts" // Requête pour l'authentification
import { ROUTES_BACK } from "@/lib/configs/routes-back.ts"

export const login = async (credentials: UserSignInRequest): Promise<ApiResponse<UserData>> => {
	try {
		const response = await axiosInstance.post<UserData>(ROUTES_BACK.SIGNIN, credentials)
		return { status: "success", data: response.data }
	} catch (error) {
		return handleAxiosError<UserData>(error)
	}
}