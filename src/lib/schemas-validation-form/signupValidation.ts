import { z } from "zod"

const fileSchema = (type: string, maxSize: number, required = false) =>
	z.custom<File | null>()
		.refine((file) => !required || (file !== null && file !== undefined), {
			message: "Le fichier est requis"
		})
		.refine((file) => !file || file instanceof File, {
			message: "Format de fichier invalide"
		})
		.refine((file) => !file || file.type.startsWith(type), {
			message: `Le fichier doit être de type ${type}`
		})
		.refine((file) => !file || file.size <= maxSize, {
			message: `La taille du fichier ne doit pas dépasser ${maxSize / (1024 * 1024)} Mo`
		})

const villeSchema = z.string()
	.min(1, "La ville est requise")
	.regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "La ville ne doit contenir que des lettres, espaces et tirets")
	.min(2, "La ville doit contenir au moins 2 caractères")
	.max(50, "La ville ne peut pas dépasser 50 caractères")

const codePostalSchema = z.string()
	.min(1, "Le code postal est requis")
	.regex(/^(?:0[1-9]|[1-9][0-9])\d{3}$/, "Le code postal doit être au format français (ex: 75001)")
	.length(5, "Le code postal doit contenir exactement 5 chiffres")

const adresseSchema = z.string()
	.min(1, "L'adresse est requise")
	.min(5, "L'adresse doit contenir au moins 5 caractères")
	.max(100, "L'adresse ne peut pas dépasser 100 caractères")
	.regex(/^[a-zA-Z0-9À-ÿ\s,'-]+$/, "L'adresse contient des caractères non valides")


export const signupSecondStepSchema = z.object({
	photo: fileSchema("image/", 5 * 1024 * 1024).optional(),
	prenom: z
		.string()
		.min(1, "Le prénom est requis.")
		.max(50, "Le prénom ne doit pas dépasser 50 caractères."),

	nom: z
		.string()
		.min(1, "Le nom est requis.")
		.max(50, "Le nom ne doit pas dépasser 50 caractères."),

	telephone: z
		.string()
		.min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres.")
		.max(10, "Le numéro de téléphone ne doit pas dépasser 10 chiffres.")
		.regex(/^[0-9]+$/, "Le numéro de téléphone doit être composé uniquement de chiffres."),

	email: z
		.string()
		.email("Adresse e-mail invalide."),

	password: z
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères.")
		.max(100, "Le mot de passe ne doit pas dépasser 100 caractères.")
		.regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
		.regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
		.regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
		.regex(/[@$!%*?&]/, "Le mot de passe doit contenir au moins un caractère spécial."),

	confirmPassword: z
		.string()
		.min(8, "La confirmation du mot de passe doit contenir au moins 8 caractères.")
		.max(100, "La confirmation du mot de passe ne doit pas dépasser 100 caractères.")
})

export const signupThirdStepCandidateSchema = z.object({
	currentPoste: z.string().optional(), // Champ facultatif
	ville: villeSchema,
	codePostal: codePostalSchema,
	adresse: adresseSchema,
	cv: fileSchema("application/pdf", 10 * 1024 * 1024, true),
	lettreMotivation: fileSchema("application/pdf", 10 * 1024 * 1024).optional()
})

export type SignupThirdStepCandidateSchema = z.infer<typeof signupThirdStepCandidateSchema>;


export const signupThirdStepEmployeur = z.object({
	companyName: z.string()
		.min(1, "Le nom de l'entreprise est requis")
		.min(2, "Le nom doit contenir au moins 2 caractères")
		.max(100, "Le nom ne peut pas dépasser 100 caractères"),
	contactName: z.string()
		.min(1, "Le nom du contact est requis")
		.min(2, "Le nom doit contenir au moins 2 caractères")
		.max(100, "Le nom ne peut pas dépasser 100 caractères"),
	contactPoste: z.string()
		.min(1, "Le poste du contact est requis")
		.min(2, "Le poste doit contenir au moins 2 caractères"),
	ville: villeSchema,
	codePostal: codePostalSchema,
	adresse: adresseSchema,
	secteurActivite: z.string()
		.min(1, "Le secteur d'activité est requis"),
	// il ne peut pas y avoir de chiffre négatif
	employeCount: z.string()
		.min(1, "Le nombre d'collaborateurs est requis")
		.regex(/^[0-9]+$/, "Le nombre d'collaborateurs doit être un nombre entier"),
	logo: fileSchema("image/", 5 * 1024 * 1024).optional()
})

export type SignupThirdStepEmployeurSchema = z.infer<typeof signupThirdStepEmployeur>;


export const completeSignupCandidateSchema = z.object({
	...signupSecondStepSchema._def.shape(), // Accède à la définition des champs
	...signupThirdStepCandidateSchema._def.shape()
})

export type CompleteSignupCandidateSchema = z.infer<typeof completeSignupCandidateSchema>;


signupSecondStepSchema.refine((data) => data.password === data.confirmPassword, {
	message: "Les mots de passe ne correspondent pas.",
	path: ["confirmPassword"]
})

export type SignupSecondStepSchema = z.infer<typeof signupSecondStepSchema>;

