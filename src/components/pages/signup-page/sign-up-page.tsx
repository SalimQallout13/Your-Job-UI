import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignupProvider, SignupStep, UserType, useSignupContext } from "@/lib/context/signup-context";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils/utils";
import heroImage from "@/assets/img/hero-image.png";
import signupForm2 from "@/assets/img/signup-form-2.png";
import { Icons } from "@/components/others/icons.jsx";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signupDetailsSchema, SignupSchema } from "@/lib/schemas-validation-form/signupValidation.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupFormSectionProps = {
	userType: UserType;
	setUserType: (type: UserType) => void;
};

type SignupDetailsSectionProps = {
	updateFormData: (data: Record<string, unknown>) => void;
};

type SignupNavigationButtonsProps = {
	onBack: () => void;
	onNext: () => void;
	nextDisabled?: boolean;
	isSubmit?: boolean;
};

type SignupHeaderProps = {
	title: string;
	description: string;
};

type SignupCardProps = {
	isSelected: boolean;
	onClick: () => void;
	title: string;
	description: string;
	icon: React.ReactNode;
};

const SignupContent = () => {
	const { userType, currentStep, setUserType, updateFormData } = useSignupContext();

	return (
		<div className="flex min-h-screen flex-col overflow-hidden xl:flex-row">
			<SignupImageSection currentStep={currentStep} />
			<div className="w-full bg-white p-8 xl:w-1/2 xl:p-16">
				<div className="mx-auto max-w-xl">
					<Logo />
					<div className="space-y-8">
						{currentStep === 1 ? (
							<SignupFormSection userType={userType} setUserType={setUserType} />
						) : (
							<SignupDetailsSection updateFormData={updateFormData} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupImageSection = ({ currentStep }: { currentStep: SignupStep }) => (
	<div className="relative h-[50vh] w-full xl:h-screen xl:w-1/2">
		<img
			src={currentStep === 1 ? heroImage : signupForm2}
			alt="Professional"
			className="absolute inset-0 size-full rounded-3xl object-cover p-3"
		/>
		{/* Gradient overlay */}
		<div className="absolute inset-0 m-3 rounded-xl bg-gradient-to-t from-purple/60 via-transparent to-transparent" />
		<div className="absolute bottom-20 left-10 z-10 text-white xl:left-20">
			<h1 className="text-5xl font-bold leading-tight md:text-6xl xl:text-[var(--font-size-h1)]">
				Recherchez,<br />
				Trouvez<br />
				& Postulez
			</h1>
		</div>
	</div>
);

const SignupFormSection = ({ userType, setUserType }: SignupFormSectionProps) => {
	const { setCurrentStep } = useSignupContext();

	return (
		<>
			<SignupHeader
				title="Comment souhaitez-vous utiliser YourJob ?"
				description="Choisissez votre voie et commencez votre aventure dans le monde du travail, que vous soyez en quête de talents ou de votre prochaine opportunité."
			/>
			<div className="space-y-7">
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
					<SignupCard
						isSelected={userType === 'candidate'}
						onClick={() => setUserType('candidate')}
						title="Trouver un emploi"
						description="Prêt à découvrir de nouvelles opportunités ?"
						icon={<Icons.signupCandidat className="size-8" />}
					/>
					<SignupCard
						isSelected={userType === 'employer'}
						onClick={() => setUserType('employer')}
						title="Recruter des profils"
						description="Trouvez les talents qui feront la différence."
						icon={<Icons.signupEmployeur className="size-8" />}
					/>
				</div>
				<SignupNavigationButtons
					onBack={() => window.history.back()}
					onNext={() => setCurrentStep(2)}
					nextDisabled={!userType}
				/>
				<LoginLink />
			</div>
		</>
	);
};

const SignupDetailsSection = ({ updateFormData }: SignupDetailsSectionProps) => {
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
		updateFormData(data);
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
											<Input type="password" placeholder="************" {...field} />
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
											<Input type="password" placeholder="************" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<SignupNavigationButtons
							onBack={() => setCurrentStep(1)}
							onNext={() => {}}
							isSubmit={true}
						/>
					</form>
				</Form>
			</div>
		</>
	);
};

const SignupNavigationButtons = ({
																	 onBack,
																	 onNext,
																	 nextDisabled = false,
																	 isSubmit = false,
																 }: SignupNavigationButtonsProps) => (
	<div className="flex justify-center gap-4 pt-6 xl:justify-start">
		<Button
			variant="outline"
			className="rounded-full px-8 py-3"
			onClick={onBack}
		>
			Retour
		</Button>
		<Button
			variant="gradient2"
			className="rounded-full bg-purple px-8 py-3 text-white"
			disabled={nextDisabled}
			onClick={!isSubmit ? onNext : undefined}
			type={isSubmit ? 'submit' : 'button'}
		>
			Suivant
		</Button>
	</div>
);

const Logo = () => (
	<div className="mb-8 text-center xl:text-left">
		<h1 className="text-gradient-primary text-4xl font-bold">YourJob</h1>
	</div>
);

const SignupHeader = ({ title, description }: SignupHeaderProps) => (
	<div className="pt-4 text-center xl:text-left">
		<h2 className="mb-6 text-3xl font-semibold text-black-primary">{title}</h2>
		<p className="text-lg text-gray-600">{description}</p>
	</div>
);

const SignupCard = ({ isSelected, onClick, title, description, icon }: SignupCardProps) => (
	<Card
		className={cn(
			"relative cursor-pointer rounded-xl p-5 bg-gray-50 transition-all hover:shadow-lg",
			isSelected ? 'border-2 border-purple' : 'border border-gray-200'
		)}
		onClick={onClick}
	>
		{isSelected && (
			<div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-purple p-1">
				<Icons.signupSelectCard className="size-6" />
			</div>
		)}
		<CardContent className="text-center">
			<div className="mb-4 mt-12 flex justify-center">
				<div className="flex size-12 items-center justify-center rounded-xl bg-purple/10">
					{icon}
				</div>
			</div>
			<h3 className="mb-2 text-lg font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">{description}</p>
		</CardContent>
	</Card>
);

const LoginLink = () => (
	<div className="pt-6 text-center xl:text-left">
		<span className="text-sm text-gray-600">Vous avez déjà un compte ? </span>
		<Link to="/" className="text-purple hover:underline">
			Connectez-vous tout de suite en cliquant ici.
		</Link>
	</div>
);

const SignupPage = () => (
	<SignupProvider>
		<SignupContent />
	</SignupProvider>
);

export default SignupPage;
