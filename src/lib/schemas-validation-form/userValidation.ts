import { z } from "zod"

export const baseInfoUserSchema = {
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
		.email("Adresse e-mail invalide.")
}

export const baseLocalisationSchema = {
	ville: z.string()
		.min(1, "La ville est requise")
		.regex(/^[a-zA-ZÀ-ÿ\s-]+$/, "La ville ne doit contenir que des lettres, espaces et tirets")
		.min(2, "La ville doit contenir au moins 2 caractères")
		.max(50, "La ville ne peut pas dépasser 50 caractères"),
	codePostal: z.string()
		.min(1, "Le code postal est requis")
		.regex(/^(?:0[1-9]|[1-9][0-9])\d{3}$/, "Le code postal doit être au format français (ex: 75001)")
		.length(5, "Le code postal doit contenir exactement 5 chiffres"),
	adresse: z.string()
		.min(1, "L'adresse est requise")
		.min(5, "L'adresse doit contenir au moins 5 caractères")
		.max(100, "L'adresse ne peut pas dépasser 100 caractères")
		.regex(/^[a-zA-Z0-9À-ÿ\s,'-]+$/, "L'adresse contient des caractères non valides")
}

export const fileSchema = (type: string, maxSize: number, required = false) =>
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