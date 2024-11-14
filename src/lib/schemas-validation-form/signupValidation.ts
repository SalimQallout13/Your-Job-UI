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
	photo: z.any().optional(),
	currentPosition: z.string().min(2, "Le poste actuel est requis"),
	ville: z.string().min(2, "La ville est requise"),
	codePostal: z.string().min(5, "Le code postal est requis"),
	adresse: z.string().min(2, "L'adresse est requise"),
	cv: z.any().optional(),
	motivationLetter: z.any().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;