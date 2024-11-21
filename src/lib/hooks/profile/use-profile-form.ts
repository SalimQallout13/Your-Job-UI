import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { profileSchema, ProfileSchema } from "@/lib/schemas-validation-form/profileValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/login-api.ts"

export const useProfileForm = () => {

	const {
		isSubmitting,
		errorMessage,
		setIsSubmitting,
		displayErrorMessage
	} = useNavigationContext()

	const profileFormSchema = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			prenom: "",
			nom: "",
			telephone: "",
			email: "",
			biographie: "",
			poste: "",
			localisation: ""
		}
	})

	const submitProfileForm = async (data: ProfileSchema) => {
		try {
			setIsSubmitting(true)
			const response = await updateProfile(data)
			if (response.status === "success") {
				// Do something with the response
			} else {
				displayErrorMessage(response.error)
			}
		} catch (error) {
			displayErrorMessage(error instanceof Error ? error.message : "Une erreur réseau est survenue.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		profileFormSchema,
		isSubmitting,
		errorMessage,
		submitProfileForm
	}
}