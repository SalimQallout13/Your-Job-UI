import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	updateUserInfoSchema,
	UpdateProfileSchema,
	updateRecruteurInfoSchema, UpdateRecruteurProfileSchema
} from "@/lib/schemas-validation-form/updateProfile.ts"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import { updateUserInfo } from "@/api/profile-api.ts"
import { showErrorToast, showToast } from "@/lib/hooks/use-toast.tsx"

export const useProfileForm = () => {
	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()
	const { userData, updateUserData, convertToFile, isRecruteurProfile, recruteurData } = useSessionContext()

	const [isLoading, setIsLoading] = useState(true)

	// Initialisez le formulaire avec React Hook Form
	const profileFormOneSchema = useForm<UpdateProfileSchema | UpdateRecruteurProfileSchema>({
		resolver: zodResolver(isRecruteurProfile ? updateRecruteurInfoSchema : updateUserInfoSchema),
		defaultValues: {} // Par défaut vide
	})

	// Charger les valeurs par défaut
	useEffect(() => {
		const loadDefaults = async () => {
			if (userData) {
				const defaultValues = {
					photo: await convertToFile(userData.photo),
					companyName: recruteurData.companyName || "",
					prenom: userData.prenom || "",
					nom: userData.nom || "",
					telephone: userData.telephone || "",
					email: userData.email || ""
				}

				profileFormOneSchema.reset(defaultValues) // Met à jour les valeurs par défaut
			}
			setIsLoading(false) // Indique que le chargement est terminé
		}

		loadDefaults()
	}, [userData, convertToFile, profileFormOneSchema])

	const submitProfileFormOne = async (data: UpdateProfileSchema) => {
		try {
			setIsSubmitting(true)
			if (userData) {
				const response = await updateUserInfo(userData._id, data)
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
			throw new Error(
				error instanceof Error ? error.message : "Une erreur est survenue lors de la mise à jour du profil"
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		profileFormOneSchema,
		isSubmitting,
		isLoading,
		errorMessage,
		submitProfileFormOne
	}
}
