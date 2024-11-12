import { UserSignInResponse } from "@/lib/types/api/responses/UserSignInResponse.ts"
import { UserSignInRequest } from "@/lib/types/api/requests/UserSignInRequest.ts"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import { UpdateProfileRequest } from "@/lib/types/api/requests/UpdateProfileRequest.ts"

export interface IConnectionApi {
	login(credentials: UserSignInRequest): Promise<ApiResponse<UserSignInResponse>>;
	updateProfile(form: UpdateProfileRequest): Promise<ApiResponse<any>>;
}
