import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/login-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"
import { SignupSecondStepSchema } from "@/lib/schemas-validation-form/signupValidation.ts"

export const useProfileForm = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()

	const profileFormOneSchema = useForm({
		resolver: zodResolver(SignupSecondStepSchema.omit({
			password: true,
			confirmPassword: true
		})),
		defaultValues: {
			prenom: "",
			nom: "",
			telephone: "",
			email: "",
		}
	})

	const submitProfileFormOne = async (data: profileFormOneSchema) => {
		try {
			setIsSubmitting(true)
			const response = await updateProfile(data)
			if (response.status === "success") {
				showToast("Succès", "Profil mis à jour", false)
			} else {
				showErrorToast(response.error)
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
		submitProfileForm: submitProfileFormOne
	}
}