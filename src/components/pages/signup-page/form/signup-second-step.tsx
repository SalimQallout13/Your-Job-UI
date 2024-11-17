import { SignupFormData, useSignupContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupDetailsSchema, SignupSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { SignupHeader } from "@/components/pages/signup-page/commons/signup-header.tsx"

type SignupDetailsSectionProps = {
	updateFormData: (data: Partial<SignupFormData>) => void;
};

export const SignupSecondStep = ({ updateFormData }: SignupDetailsSectionProps) => {
	const { setCurrentStep } = useSignupContext();

	const signupFormSchema = useForm<SignupSchema>({
		resolver: zodResolver(signupDetailsSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { handleSubmit } = signupFormSchema;

	const onSubmit = (data: SignupSchema) => {
		updateFormData({ userDetails: data });
		setCurrentStep(3);
	};

	return (
		<>
			<SignupHeader
				title="Créez vos identifiants pour commencer !"
				description="Entrez vos informations de connexion pour accéder à votre tableau de bord et démarrer votre parcours."
			/>
			<div className="space-y-7">
				<Form {...signupFormSchema}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
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
							onBack={() => setCurrentStep(1)}
							onNext={() => setCurrentStep(3)}
						/>
					</form>
				</Form>
			</div>
		</>
	);
};