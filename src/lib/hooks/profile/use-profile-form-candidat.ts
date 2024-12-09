import {useNavigationContext} from "@/lib/context/navigation-context.tsx"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {updateProfileCandidat} from "@/api/profile-api.ts"
import {showErrorToast, showToast} from "@/lib/hooks/use-toast.tsx"
import {useSessionContext} from "@/lib/context/session-context.tsx"
import {useEffect, useState} from "react"
import {baseProfileCandidatSchema, BaseProfileCandidatSchema} from "@/lib/schemas-validation-form/userValidation.ts"

export const useProfileFormCandidat = () => {

    const {isSubmitting, errorMessage, setIsSubmitting} = useNavigationContext()
    const {userData, updateUserData, candidatData, convertToFile} = useSessionContext()

    const [isLoading, setIsLoading] = useState(true)


    const profileFormSecondSchema = useForm<BaseProfileCandidatSchema>({
        resolver: zodResolver(baseProfileCandidatSchema),
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
                console.log("defaultValues", defaultValues)
                profileFormSecondSchema.reset(defaultValues)
            }
            setIsLoading(false) // Indique que le chargement est terminé
        }
        loadDefaults()
    }, [userData, convertToFile, profileFormSecondSchema, candidatData])

    const submitProfileFormSecond = async (data: BaseProfileCandidatSchema) => {
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
        submitProfileFormSecond,
        isLoading
    }
}