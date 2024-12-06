import { z } from "zod"
import { baseInfoUserSchema, baseLocalisationSchema, fileSchema } from "@/lib/schemas-validation-form/userValidation.ts"

export const signupSecondStepSchema = z.object({
	...baseInfoUserSchema,
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
}).refine((data) => data.password === data.confirmPassword, {
	message: "Les mots de passe ne correspondent pas.",
	path: ["confirmPassword"]
})

export type SignupSecondStepSchema = z.infer<typeof signupSecondStepSchema>;


export const signupThirdStepCandidateSchema = z.object({
	currentPoste: z.string().optional(), // Champ facultatif
	...baseLocalisationSchema,
	cv: fileSchema("application/pdf", 10 * 1024 * 1024, true),
	lettreMotivation: fileSchema("application/pdf", 10 * 1024 * 1024, true)
})

export type SignupThirdStepCandidateSchema = z.infer<typeof signupThirdStepCandidateSchema>;


export const signupThirdStepEmployeur = z.object({
	photo: fileSchema("image/", 5 * 1024 * 1024),
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
	...baseLocalisationSchema,
	secteurActivite: z.string()
		.min(1, "Le secteur d'activité est requis"),
	// il ne peut pas y avoir de chiffre négatif
	employeCount: z.string()
		.min(1, "Le nombre d'collaborateurs est requis")
		.regex(/^[0-9]+$/, "Le nombre d'collaborateurs doit être un nombre entier")
})

export type SignupThirdStepEmployeurSchema = z.infer<typeof signupThirdStepEmployeur>;