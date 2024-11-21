import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupSecondStepSchema, SignupSecondStepSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { SignUpHeader } from "@/components/commons/sign-up-header.tsx"
import { checkEmail, checkPhone } from "@/api/signup-api.ts"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { useState } from "react"

type SignupSecondStepProps = {
	updateFormData: (data: Partial<SignupFormData>) => void;
};

export const SignupSecondStep = ({ updateFormData }: SignupSecondStepProps) => {
	const { setCurrentStep, formData } = useSignupPageContext();
	const [isLoadingEmail, setIsLoadingEmail] = useState(false);
	const [isLoadingPhone, setIsLoadingPhone] = useState(false);

	const signupFormSchema = useForm<SignupSecondStepSchema>({
		resolver: zodResolver(signupSecondStepSchema),
		defaultValues: {
			prenom: '',
			nom: '',
			telephone: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { handleSubmit, setError } = signupFormSchema;

	const onNext = async (data: SignupSecondStepSchema) => {
		try {
			setIsLoadingEmail(true);
			const emailCheck = await checkEmail(data.email);
			setIsLoadingEmail(false);

			if (emailCheck.isEmailTaken) {
				setError('email', {
					type: 'manual',
					message: emailCheck.message || 'Cette adresse email est déjà utilisée',
				});
				return;
			}

			setIsLoadingPhone(true);
			const phoneCheck = await checkPhone(data.telephone);
			setIsLoadingPhone(false);

			if (phoneCheck.isPhoneTaken) {
				setError('telephone', {
					type: 'manual',
					message: phoneCheck.message || 'Ce numéro de téléphone est déjà utilisé',
				});
				return;
			}

			updateFormData({
				...formData,
				secondStepData: data,
			});

			setCurrentStep('thirdStep');
		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue",
				variant: "destructive",
			});
		} finally {
			setIsLoadingEmail(false);
			setIsLoadingPhone(false);
		}
	};

	return (
		<>
			<SignUpHeader
				title="Créez vos identifiants pour commencer !"
				description="Entrez vos informations de connexion pour accéder à votre tableau de bord et démarrer votre parcours."
			/>
			<div className="space-y-7">
				<Form {...signupFormSchema}>
					<form onSubmit={handleSubmit(onNext)} className="space-y-7">
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<FormField
								name="prenom"
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
								name="nom"
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
								name="telephone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Numéro de téléphone</FormLabel>
										<FormControl>
											<div className="relative">
												<Input placeholder="06 66 41 62 67" {...field} />
												{isLoadingPhone && (
													<span className="absolute right-2 top-2 size-5 animate-spin rounded-full border-2 border-purple border-t-transparent"></span>
												)}
											</div>
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
											<div className="relative">
												<Input placeholder="tpuget@levupp.com" {...field} />
												{isLoadingEmail && (
													<span className="absolute right-2 top-2 size-5 animate-spin rounded-full border-2 border-purple border-t-transparent"></span>
												)}
											</div>
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
											<Input autoComplete="new-password" type="password" placeholder="************" {...field} />
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
											<Input autoComplete="new-password" type="password" placeholder="************" {...field} />
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
