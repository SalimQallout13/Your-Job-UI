import { z } from "zod";

export const signupDetailsSchema = z.object({
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

export type SignupSchema = z.infer<typeof signupDetailsSchema>;


export const profileSchema = z.object({
	currentPosition: z.string().optional(),
	ville: z.string(),
	codePostal: z.string(),
	adresse: z.string(),
	photo: z.instanceof(File).optional(),
	cv: z.instanceof(File),
	motivationLetter: z.instanceof(File).optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;



export const employerProfileSchema = z.object({
	companyName: z.string().min(3, "Le nom de l'entreprise est requis."),
	companyWebsite: z.string().url("Veuillez entrer une URL valide."),
	// Ajoutez d'autres champs si nécessaire
});

export type EmployerProfileSchema = z.infer<typeof employerProfileSchema>;
