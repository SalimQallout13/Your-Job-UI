import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import {
	signupThirdStepCandidateSchema,
	SignupThirdStepCandidateSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { signup } from "@/api/signup-api.ts"


export const useThirdStepCandidate = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {
	const { setCurrentStep, formData } = useSignupPageContext()
	const { isSubmitting, setIsSubmitting, updateUserData } = useNavigationContext()

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
			toast({
				title: "Erreur",
				description: "Données du formulaire incomplètes",
				variant: "destructive"
			})
			return
		}

		try {
			setIsSubmitting(true)

			// Mise à jour du context avec les nouvelles données
			const updatedFormData = {
				...formData,
				thirdStepData: data
			}
			updateFormData(updatedFormData)

			// Appel à l'API d'inscription
			await signup(updatedFormData)

			setCurrentStep("successStep")
			// Transformation en un objet unique contenant tous les champs
			const flatUserData = {
				...updatedFormData.firstStepData,
				...updatedFormData.secondStepData,
				...updatedFormData.thirdStepData
			}

			console.log(flatUserData)
			// Sauvegarde dans le local storage
			updateUserData(flatUserData)
			if (updatedFormData.secondStepData?.prenom !== undefined) {
				updateUserData({ prenom: updatedFormData.secondStepData?.prenom })
			}

			toast({
				title: "Inscription réussie",
				description: "Votre inscription a bien été prise en compte"
			})

		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
				variant: "destructive"
			})
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