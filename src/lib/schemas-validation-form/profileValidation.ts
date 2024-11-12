import { z } from "zod"

export const profileSchema = z.object({
	prenom: z.string().min(1, "Le prénom est requis"),
	nom: z.string().min(1, "Le nom est requis"),
	telephone: z.string().min(1, "Le numéro de téléphone est requis"),
	email: z.string().email("Adresse email invalide"),
	biographie: z.string().optional(),
	poste: z.string().optional(),
	localisation: z.string().optional()
})

export type ProfileSchema = z.infer<typeof profileSchema>;