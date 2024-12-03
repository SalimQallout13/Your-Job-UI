import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/login-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"
import {
	signupSecondStepSchema,
	SignupSecondStepSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { useSessionContext } from "@/lib/context/session-context.tsx"

export const useProfileForm = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()
	const { userData, updateUserData } = useSessionContext()

	// Accéder au schéma sous-jacent (ZodObject) à partir de ZodEffects
	const baseSchema = (signupSecondStepSchema._def).schema

	const profileFormOneSchema = useForm<SignupSecondStepSchema>({
		resolver: zodResolver(
			baseSchema.omit({
				password: true,
				confirmPassword: true
			})
		),
		defaultValues: {
			prenom: userData?.prenom || "",
			nom: userData?.nom || "",
			telephone: userData?.telephone || "",
			email: userData?.email || ""
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

	return {
		profileFormOneSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormOne
	}
}