import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileRecruteur } from "@/api/profile-api.ts"
import { showErrorToast, showToast, toast } from "@/lib/hooks/use-toast.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import { useEffect, useState } from "react"
import { baseProfileRecruteurSchema, BaseProfileRecruteurSchema } from "@/lib/schemas-validation-form/userValidation.ts"
import { getSecteursActivite, SecteurActivite } from "@/api/domaine-api.ts"

export const useProfileFormRecruteur = () => {

	const { isSubmitting, errorMessage, setIsSubmitting } = useNavigationContext()
	const { userData, updateUserData, recruteurData } = useSessionContext()
	const [secteurActivites, setSecteurActivites] = useState<SecteurActivite[]>([])
	const [isLoadingSecteurActivite, setIsLoadingSecteurActivite] = useState(false)

	const [isLoading, setIsLoading] = useState(true)


	const profileFormSecondSchema = useForm<BaseProfileRecruteurSchema>({
		resolver: zodResolver(baseProfileRecruteurSchema),
		defaultValues: {}
	})

	useEffect(() => {
		const loadDefaults = async () => {
			if (userData) {
				const defaultValues = {
					contactPoste: recruteurData.contactPoste,
					secteurActivite: recruteurData.secteurActivite,
					ville: userData?.ville || "",
					codePostal: userData?.codePostal || "",
					adresse: userData?.adresse || "",
					employeCount: recruteurData.employeCount
				}
				console.log("defaultValues", defaultValues)
				profileFormSecondSchema.reset(defaultValues)
			}
			setIsLoading(false) // Indique que le chargement est terminé
		}
		loadDefaults()
	}, [userData, profileFormSecondSchema, recruteurData])

	useEffect(() => {
		const fetchSecteurActivite = async () => {
			setIsLoadingSecteurActivite(true)
			try {
				const response = await getSecteursActivite()
				setSecteurActivites(response.secteursActivite)

				if (response.message) {
					toast({
						title: "Information",
						description: response.message
					})
				}
			} catch (error) {
				throw new Error(error instanceof Error ? error.message : "Une erreur est survenue")
			} finally {
				setIsLoadingSecteurActivite(false)
			}
		}

		fetchSecteurActivite().catch(console.error)
	}, [])

	const submitProfileFormSecond = async (data: BaseProfileRecruteurSchema) => {
		try {
			setIsSubmitting(true)
			if (userData) {
				const response = await updateProfileRecruteur(userData._id, data)
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
		submitProfileFormSecond,
		isLoading,
		secteurActivites,
		isLoadingSecteurActivite
	}
}