import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, loginSchema } from "@/lib/schemas-validation-form/loginValidation.ts"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { login } from "@/api/login-api.ts"
import { showToast, showErrorToast } from "@/lib/hooks/use-toast.tsx"
import { useSigninContext } from "@/lib/context/signin-context.tsx"
import { ROUTES } from "@/lib/configs/routes.ts"
import { useSessionContext } from "@/lib/context/session-context.tsx"

export const useLoginForm = () => {
	const { isSubmitting, errorMessage, setIsSubmitting, navigateTo } = useNavigationContext()
	const { setUserData } = useSessionContext()
	const { closeLoginDialog } = useSigninContext()

	const loginFormSchema = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})
	// Fonction pour soumettre le formulaire de connexion
	const submitLoginForm = async (data: LoginSchema) => {
		try {
			setIsSubmitting(true)

			const response = await login(data)

			// Vérifiez si la réponse contient des données valides
			if (response.status === "success") {
				showToast("Succès", "Connexion en cours", true)
				setUserData(response.data)
				closeLoginDialog()
				navigateTo(ROUTES.PROFILE_PATH)
				showToast("Succès", "Connexion réussie", false)
			} else {
				// Gérer les erreurs renvoyées par l'API
				showErrorToast(response.error)
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription")
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		loginFormSchema,
		isSubmitting,
		errorMessage,
		closeLoginDialog,
		submitLoginForm
	}
}
