import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, loginSchema } from "@/lib/schemas-validation-form/loginValidation.ts"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import { useNavigate } from "react-router-dom"
import { login } from "@/api/login-api.ts"
import { toast } from "@/lib/hooks/use-toast.tsx"

export const useLoginForm = () => {
	const { isSubmitting, errorMessage, setIsSubmitting, setUserData } = useNavigationContext()

	const loginFormSchema = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const navigate = useNavigate()

	// Fonction pour soumettre le formulaire de connexion
	const submitLoginForm = async (data: LoginSchema) => {
		try {
			setIsSubmitting(true)

			const response = await login(data)

			// Vérifiez si la réponse contient des données valides
			if (response.status === "success") {
				// Stocker et mettre à jour le contexte utilisateur
				setUserData(response.data)

				// Message de succès
				toast({
					title: "Succès",
					description: "Connexion réussie."
				})

				// Rediriger l'utilisateur
				navigate("/profile")
			} else {
				// Gérer les erreurs renvoyées par l'API
				toast({
					title: "Erreur",
					description: response.error
				})
			}
		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion"
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		loginFormSchema,
		isSubmitting,
		errorMessage,
		submitLoginForm
	}
}
