import { baseInfoUserSchema, fileSchema } from "@/lib/schemas-validation-form/userValidation.ts"
import { z } from "zod"

export const updateUserInfoSchema = z.object({
	photo: fileSchema("image/", 5 * 1024 * 1024),
	...baseInfoUserSchema
})

export const updateRecruteurInfoSchema = z.object({
	...updateUserInfoSchema.shape,
	companyName: z.string()
})

export type UpdateProfileSchema = z.infer<typeof updateUserInfoSchema>;

export type UpdateRecruteurProfileSchema = z.infer<typeof updateRecruteurInfoSchema>;
