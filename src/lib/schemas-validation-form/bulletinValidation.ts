import { z } from "zod";

export const bulletinValidation = z.object({
    date: z.string().min(10, { message: "La date doit être au format jj/mm/aaaa." }),
    equipe: z.number().min(1, { message: "L'équipe doit être renseignée." }),
});

export type BulletinValidation = z.infer<typeof bulletinValidation>;