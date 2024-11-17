import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupSecondStepSchema, SignupSecondStepSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { SignupHeader } from "@/components/pages/signup-page/commons/signup-header.tsx"
import { checkEmail, checkPhone } from "@/api/signup-api.ts"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { useState } from "react"

type SignupSecondStepProps = {
	updateFormData: (data: Partial<SignupFormData>) => void;
};

export const SignupSecondStep = ({ updateFormData }: SignupSecondStepProps) => {
	const { setCurrentStep, formData } = useSignupPageContext();  // Ajout de formData
	const [, setIsLoading] = useState(false);

	const signupFormSchema = useForm<SignupSecondStepSchema>({
		resolver: zodResolver(signupSecondStepSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { handleSubmit, setError } = signupFormSchema;

	const onNext = async (data: SignupSecondStepSchema) => {
		try {
			setIsLoading(true);

			const emailCheck = await checkEmail(data.email);
			if (emailCheck.isEmailTaken) {
				setError('email', {
					type: 'manual',
					message: emailCheck.message || 'Cette adresse email est déjà utilisée'
				});
				setIsLoading(false);
				return;
			}

			const phoneCheck = await checkPhone(data.phoneNumber);
			if (phoneCheck.isPhoneTaken) {
				setError('phoneNumber', {
					type: 'manual',
					message: phoneCheck.message || 'Ce numéro de téléphone est déjà utilisé'
				});
				setIsLoading(false);
				return;
			}

			// Mise à jour des données en conservant les données précédentes
			updateFormData({
				...formData,  // Garde les données existantes
				secondStepData: data  // Ajoute les nouvelles données
			});

			setCurrentStep('thirdStep');
		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<SignupHeader
				title="Créez vos identifiants pour commencer !"
				description="Entrez vos informations de connexion pour accéder à votre tableau de bord et démarrer votre parcours."
			/>
			<div className="space-y-7">
				<Form {...signupFormSchema}>
					<form onSubmit={handleSubmit(onNext)} className="space-y-7">
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<FormField
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Prénom</FormLabel>
										<FormControl>
											<Input placeholder="Thomas" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nom</FormLabel>
										<FormControl>
											<Input placeholder="Puget" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<FormField
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Numéro de téléphone</FormLabel>
										<FormControl>
											<Input placeholder="06 66 41 62 67" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Adresse mail</FormLabel>
										<FormControl>
											<Input placeholder="tpuget@levupp.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<FormField
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mot de passe</FormLabel>
										<FormControl>
											<Input autoComplete={"new-password"} type="password" placeholder="************" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirmation du mot de passe</FormLabel>
										<FormControl>
											<Input autoComplete={"new-password"} type="password" placeholder="************" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<SignupNavigationButtons
							onBack={() => setCurrentStep('firstStep')}
							isSubmit={true}
						/>
					</form>
				</Form>
			</div>
		</>
	);
};