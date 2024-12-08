import { baseInfoUserSchema, fileSchema } from "@/lib/schemas-validation-form/userValidation.ts"
import { z } from "zod"

export const updateUserInfoSchema = z.object({
	photo: fileSchema("image/", 5 * 1024 * 1024),
	...baseInfoUserSchema
})

export type UpdateProfileSchema = z.infer<typeof updateUserInfoSchema>;
