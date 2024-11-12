export type UpdateProfileRequest = {
	email: string;
	prenom: string;
	nom: string;
	telephone: string;
	biographie?: string | undefined;
	poste?: string | undefined;
	localisation?: string | undefined;
}