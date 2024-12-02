import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileCandidat } from "@/api/login-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"
import {
	SignupThirdStepCandidateSchema,
	signupThirdStepCandidateSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"

export const useProfileFormCandidat = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()

	const profileFormSecondSchema = useForm<SignupThirdStepCandidateSchema>({
		resolver: zodResolver(signupThirdStepCandidateSchema),
		defaultValues: {
			currentPoste: "",
			ville: "",
			codePostal: "",
			adresse: "",
			photo: null,
			cv: undefined,
			lettreMotivation: undefined
		}
	})

	const submitProfileFormSecond = async (data: SignupThirdStepCandidateSchema) => {
		try {
			setIsSubmitting(true)
			const response = await updateProfileCandidat(data)
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
		profileFormSecondSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormSecond
	}
}