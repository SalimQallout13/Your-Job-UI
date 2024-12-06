import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileCandidat } from "@/api/profile-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"
import {
	SignupThirdStepCandidateSchema,
	signupThirdStepCandidateSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import { useEffect } from "react"

export const useProfileFormCandidat = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()
	const { userData, updateUserData, candidatData, convertToFile } = useSessionContext()

	const profileFormSecondSchema = useForm<SignupThirdStepCandidateSchema>({
		resolver: zodResolver(signupThirdStepCandidateSchema),
		defaultValues: {}
	})

	useEffect(() => {
		const loadDefaults = async () => {
			if (userData) {
				const defaultValues = {
					currentPoste: candidatData.currentPoste,
					ville: userData?.ville || "",
					codePostal: userData?.codePostal || "",
					adresse: userData?.adresse || "",
					cv: await convertToFile(candidatData.cv),
					lettreMotivation: await convertToFile(candidatData.lettreMotivation)
				}
				profileFormSecondSchema.reset(defaultValues)
			}
		}
		loadDefaults()
	}, [userData, convertToFile, profileFormSecondSchema, candidatData])

	const submitProfileFormSecond = async (data: SignupThirdStepCandidateSchema) => {
		try {
			setIsSubmitting(true)
			if (userData) {
				const response = await updateProfileCandidat(userData._id, data)
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
		profileFormSecondSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormSecond
	}
}