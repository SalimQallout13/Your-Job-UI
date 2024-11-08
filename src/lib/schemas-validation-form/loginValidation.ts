import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(5, { message: "L'identifiant doit contenir au moins 5 caractères." }),
	password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
