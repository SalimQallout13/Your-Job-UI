import { z } from "zod";

export const signupSecondStepSchema = z.object({
	firstName: z
		.string()
		.min(1, "Le prénom est requis.")
		.max(50, "Le prénom ne doit pas dépasser 50 caractères."),

	lastName: z
		.string()
		.min(1, "Le nom est requis.")
		.max(50, "Le nom ne doit pas dépasser 50 caractères."),

	phoneNumber: z
		.string()
		.min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres.")
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
		.max(100, "La confirmation du mot de passe ne doit pas dépasser 100 caractères."),
})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Les mots de passe ne correspondent pas.",
		path: ["confirmPassword"],
	});

export type SignupSecondStepSchema = z.infer<typeof signupSecondStepSchema>;


export const signupThirdStepCandidateSchema = z.object({
	currentPosition: z.string().optional(), // Champ facultatif

	ville: z.string()
		.min(1, "La ville est requise")  // En français
		.regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "La ville ne doit contenir que des lettres, espaces et tirets")
		.min(2, "La ville doit contenir au moins 2 caractères")
		.max(50, "La ville ne peut pas dépasser 50 caractères"),

	codePostal: z.string()
		.min(1, "Le code postal est requis")  // En français
		.regex(/^(?:0[1-9]|[1-9][0-9])\d{3}$/, "Le code postal doit être au format français (ex: 75001)")
		.length(5, "Le code postal doit contenir exactement 5 chiffres"),

	adresse: z.string()
		.min(1, "L'adresse est requise")  // En français
		.min(5, "L'adresse doit contenir au moins 5 caractères")
		.max(100, "L'adresse ne peut pas dépasser 100 caractères")
		.regex(/^[a-zA-Z0-9À-ÿ\s,'-]+$/, "L'adresse contient des caractères non valides"),

	photo: z.custom<File | null>()
		.nullable()
		.refine((file) => file !== null && file !== undefined, {
			message: "La photo de profil est requise"
		})
		.refine(
			(file) => {
				if (!file) return false;
				return file instanceof File && file.type.startsWith('image/');
			},
			{ message: "Le fichier doit être une image" }
		)
		.refine(
			(file) => {
				if (!file) return false;
				return file.size <= 5 * 1024 * 1024;
			},
			{ message: "La taille de l'image ne doit pas dépasser 5 Mo" }
		),

	cv: z.custom<File | null>()
		.nullable()
		.refine((file) => file !== null && file !== undefined, {
			message: "Le CV est requis"
		})
		.refine(
			(file) => {
				if (!file) return false;
				return file instanceof File && file.type === 'application/pdf';
			},
			{ message: "Le fichier doit être au format PDF" }
		)
		.refine(
			(file) => {
				if (!file) return false;
				return file.size <= 10 * 1024 * 1024;
			},
			{ message: "La taille du CV ne doit pas dépasser 10 Mo" }
		),

	motivationLetter: z.custom<File | null>()
		.nullable()
		.refine((file) => file !== null && file !== undefined, {
			message: "La lettre de motivation est requise"
		})
		.refine(
			(file) => {
				if (!file) return false;
				return file instanceof File && file.type === 'application/pdf';
			},
			{ message: "Le fichier doit être au format PDF" }
		)
		.refine(
			(file) => {
				if (!file) return false;
				return file.size <= 10 * 1024 * 1024;
			},
			{ message: "La taille de la lettre de motivation ne doit pas dépasser 10 Mo" }
		),
});

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

	contactPosition: z.string()
		.min(1, "Le poste du contact est requis")
		.min(2, "Le poste doit contenir au moins 2 caractères"),

	companyAddress: z.string()
		.min(1, "L'adresse est requise")
		.min(5, "L'adresse doit contenir au moins 5 caractères"),

	sector: z.string()
		.min(1, "Le secteur d'activité est requis"),

	employeesCount: z.string().optional(),

	logo: z.custom<File | null>()
		.refine((file) => file === null || file instanceof File, {
			message: "Format de fichier invalide"
		})
		.refine(
			(file) => !file || file.type.startsWith('image/'),
			"Le fichier doit être une image"
		)
		.refine(
			(file) => !file || file.size <= 5 * 1024 * 1024,
			"La taille de l'image ne doit pas dépasser 5 Mo"
		)
		.optional()
});

export type SignupThirdStepEmployeurSchema = z.infer<typeof signupThirdStepEmployeur>;