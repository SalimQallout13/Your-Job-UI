import { IConnectionApi } from "@/lib/interfaces/IConnectionApi.ts"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useForm } from "react-hook-form"
import { profileSchema, ProfileSchema } from "@/lib/schemas-validation-form/profileValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"

export const useProfileForm = (connectionApi: IConnectionApi) => {

	const {
		isSubmitting,
		errorMessage,
		startSubmitting,
		stopSubmitting,
		displayErrorMessage,
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
	});


	const handleFormSubmit = async (data: ProfileSchema) => {
		startSubmitting()
		const response = await connectionApi.updateProfile(data)
		stopSubmitting()
		if (response.status === "success") {
			// Do something with the response
		} else if (response.status === "error") {
			displayErrorMessage(response.error)
		}
	}

	const submitProfileForm = (data: ProfileSchema) => {
		handleFormSubmit(data).catch(console.error)
	}

	return {
		profileFormSchema,
		isSubmitting,
		errorMessage,
		submitProfileForm
	}
}