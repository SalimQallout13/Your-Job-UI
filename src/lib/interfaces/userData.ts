export interface CandidatProfile {
	_id: string;
	currentPoste?: string;
	cv?: string;
	lettreMotivation?: string;
	permisConduire?: boolean;
	description?: string;
	dateNaissance?: string;
	sexe?: 'Homme' | 'Femme';
}

export interface RecruteurProfile {
	_id: string;
	companyName: string;
	logo?: string;
	secteurActivite?: string; // ObjectId, généralement une chaîne
	contactPoste?: string;
	employeCount?: number;
}

type Profile = CandidatProfile | RecruteurProfile;

export interface UserData {
	_id: string;
	photo?: string;
	nom: string;
	prenom: string;
	email: string;
	role: 1 | 2 | 0; // 1: Candidat, 2: Recruteur, 0: Administrateur
	telephone: string;
	adresse: string;
	ville: string;
	codePostal: string;
	profile: Profile | null; // Peut être un profil candidat, recruteur ou null
	profileModel: 'CandidatProfile' | 'RecruteurProfile'; // Modèle associé
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}