import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePhotoProfile, updateProfile } from "@/api/profile-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"
import {
	signupSecondStepSchema,
	SignupSecondStepSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import { ZodObject } from "zod"

export const useProfileForm = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()
	const { userData, updateUserData, convertToFile } = useSessionContext()

	const convertFileToString = (file: File | null | undefined): string | undefined => {
		if (file instanceof File) {
			return file.name; // Utilisez file.name ou une URL générée si nécessaire
		}
		return undefined; // Retourne undefined pour null ou undefined
	};

// Vérifier si c'est un ZodObject et accéder au schéma sous-jacent
	const getZodObject = (schema: any): ZodObject<any> => {
		if (schema._def?.schema instanceof ZodObject) {
			return schema._def.schema;
		}
		if (schema instanceof ZodObject) {
			return schema;
		}
		throw new Error("Le schéma n'est pas un ZodObject valide");
	};

	const baseSecondStepSchema = getZodObject(signupSecondStepSchema);

	const profileFormOneSchema = useForm<SignupSecondStepSchema>({
		resolver: zodResolver(
			baseSecondStepSchema.omit({
				password: true,
				confirmPassword: true
			})
		),
		defaultValues: async () => {
			const defaultPhoto = await convertToFile(userData?.photo)
			return {
				prenom: userData?.prenom || "",
				nom: userData?.nom || "",
				telephone: userData?.telephone || "",
				email: userData?.email || "",
				password: "", // Champs obligatoires même si non utilisés
				confirmPassword: "", // Champs obligatoires même si non utilisés
				photo: defaultPhoto,
			}
		}
	})

	const submitProfileFormOne = async (data: SignupSecondStepSchema) => {
		try {
			setIsSubmitting(true)
			if (userData) {
				const response = await updateProfile(userData._id, data)
				if (response.status === "success") {
					showToast("Succès", "Profil mis à jour", false)
					updateUserData(response.data)
				} else {
					showErrorToast(response.error)
				}
			} else {
				throw new Error("Impossible de mettre à jour le profil : utilisateur introuvable")
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription")
		} finally {
			setIsSubmitting(false)
		}
	}

	const submitPhotoProfile = async (data: SignupSecondStepSchema) => {
		try {
			setIsSubmitting(true)
			if (userData) {
				const response = await updatePhotoProfile(userData._id, convertFileToString(data.photo))
				if (response.status === "success") {
					showToast("Succès", "Photo de profil mise à jour", false)
					updateUserData(response.data)
				} else {
					showErrorToast(response.error)
				}
			} else {
				throw new Error("Impossible de mettre à jour le profil : utilisateur introuvable")
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription")
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		profileFormOneSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormOne,
		submitPhotoProfile,
	}
}