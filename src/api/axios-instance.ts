// axios-instance.ts
import axios, { AxiosInstance } from 'axios';

class ApiInstance {
	private readonly axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			}
		});

		// Gestion globale des erreurs ici si besoin
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			(error) => {
				// Traiter ici toutes les erreurs non capturées
				console.error("Erreur API:", error);
				return Promise.reject(error);
			}
		);
	}

	public getInstance() {
		return this.axiosInstance;
	}
}

const apiInstance = new ApiInstance("https://your-job.fr:8181/api");
const axiosInstance = apiInstance.getInstance();

export { axiosInstance };
