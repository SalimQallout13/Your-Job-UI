import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import {
	signupThirdStepCandidateSchema,
	SignupThirdStepCandidateSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { showToast, toast } from "@/lib/hooks/use-toast.tsx"
import { signup } from "@/api/signup-api.ts"

export const useThirdStepCandidate = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {
	const { setCurrentStep, formData } = useSignupPageContext()
	const { isSubmitting, setIsSubmitting, setUserData } = useNavigationContext()

	const signupFormCandidat = useForm<SignupThirdStepCandidateSchema>({
		resolver: zodResolver(signupThirdStepCandidateSchema),
		defaultValues: {
			currentPoste: "",
			ville: "",
			codePostal: "",
			adresse: "",
			photo: undefined,
			cv: undefined,
			lettreMotivation: undefined
		}
	})

	const submitSignInForm = async (data: SignupThirdStepCandidateSchema) => {
		if (!formData.secondStepData) {
			throw new Error("Données du formulaire incomplètes")
		}

		try {
			setIsSubmitting(true)

			// Mise à jour du context avec les nouvelles données
			const updatedFormData = {
				...formData,
				thirdStepData: data
			}
			updateFormData(updatedFormData)

			const response = await signup(updatedFormData)

			if (response.status === "success") {
				showToast("Succès", "Inscription en cours", true)
				setCurrentStep("successStep")
				setUserData(response.data)
				showToast("Succès", "Votre inscription a bien été prise en compte", false)
			} else {
				// Gérer les erreurs renvoyées par l'API
				toast({
					title: "Erreur",
					description: response.error
				})
			}

		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription")
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		signupFormCandidat,
		submitSignInForm,
		setCurrentStep,
		isSubmitting
	}

}