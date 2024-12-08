import { z } from "zod"
import {
	baseInfoUserSchema,
	baseProfileCandidatSchema, baseProfileEmployeurSchema,
	fileSchema
} from "@/lib/schemas-validation-form/userValidation.ts"

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
	photo: fileSchema("image/", 5 * 1024 * 1024),
	...baseProfileCandidatSchema.shape
})

export type SignupThirdStepCandidateSchema = z.infer<typeof signupThirdStepCandidateSchema>;


export const signupThirdStepEmployeur = z.object({
	photo: fileSchema("image/", 5 * 1024 * 1024).optional(),
	...baseProfileEmployeurSchema.shape
})

export type SignupThirdStepEmployeurSchema = z.infer<typeof signupThirdStepEmployeur>;