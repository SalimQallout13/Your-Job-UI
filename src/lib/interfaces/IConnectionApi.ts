import { UserSignInResponse } from "@/lib/types/api/responses/UserSignInResponse.ts"
import { UserSignInRequest } from "@/lib/types/api/requests/UserSignInRequest.ts"
import { ApiResponse } from "@/lib/types/api/ApiResponse.ts"
import {Bulletin} from "@/lib/class/Bulletin.ts";

export interface IConnectionApi {
	login(credentials: UserSignInRequest): Promise<ApiResponse<UserSignInResponse>>;
	createBulletin(bulletin: Bulletin): Promise<ApiResponse<Bulletin>>;
}
