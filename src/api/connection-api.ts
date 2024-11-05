import {axiosInstance} from "@/api/axios-instance.ts";
import axios from 'axios';
import {IConnectionApi} from "@/lib/interfaces/IConnectionApi.ts"
import {UserSignInResponse} from "@/lib/types/api/responses/UserSignInResponse.ts"
import {ApiResponse} from "@/lib/types/api/ApiResponse.ts";
import {UserSignInRequest} from "@/lib/types/api/requests/UserSignInRequest.ts";  // Importation du type de requête
import {ROUTES_BACK} from "@/lib/configs/routes-back.ts";
import {Bulletin} from "@/lib/class/Bulletin.ts";  // Importation des routes

export class ConnectionApi implements IConnectionApi {
    public async login(credentials: UserSignInRequest): Promise<ApiResponse<UserSignInResponse>> {
        try {
            const response = await axiosInstance.post(ROUTES_BACK.SIGNIN, credentials);
            return {status: 'success', data: response.data};
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {status: 'error', error: error.response?.data?.errors[0].message};
            } else {
                return {status: 'error', error: "Erreur réseau ou serveur."};
            }
        }
    }

    public async createBulletin(bulletin: Bulletin): Promise<ApiResponse<Bulletin>> {
        try {
            const response = await axiosInstance.post(ROUTES_BACK.SIGNIN, bulletin);
            return {status: 'success', data: response.data};
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {status: 'error', error: error.response?.data?.errors[0].message};
            } else {
                return {status: 'error', error: "Erreur réseau ou serveur."};
            }
        }
    }
}