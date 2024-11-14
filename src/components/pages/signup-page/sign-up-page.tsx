import React, { useCallback, useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignupProvider, SignupStep, UserType, useSignupContext } from "@/lib/context/signup-context";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils/utils";
import { Icons } from "@/components/others/icons";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ProfileSchema,
	profileSchema,
	signupDetailsSchema,
	SignupSchema
} from "@/lib/schemas-validation-form/signupValidation";
import heroImage from "@/assets/img/hero-image.png";
import signupForm2 from "@/assets/img/signup-form-2.png";
import signupForm3Candidate from "@/assets/img/signup-form-3-candidat.png";
import signupForm3Employer from "@/assets/img/signup-form-3-employeur.png";
import { useDropzone } from 'react-dropzone';
import { Trash2, Upload } from "lucide-react";

type SignupFormSectionProps = {
	userType: UserType;
	setUserType: (type: UserType) => void;
};

type SignupDetailsSectionProps = {
	updateFormData: (data: Record<string, unknown>) => void;
};

type SignupNavigationButtonsProps = {
	onBack: () => void;
	onNext?: () => void;
	nextDisabled?: boolean;
	isSubmit?: boolean;
	nextLabel?: string;
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

interface FileUploaderProps {
	accept: string;
	maxSize: number;
	onFileSelect: (file: File) => void;
	children: React.ReactNode;
	widthFull?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
																										 accept,
																										 maxSize,
																										 onFileSelect,
																											widthFull,
																										 children,
																									 }) => {
	const [preview, setPreview] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file && file.size <= maxSize) {
				onFileSelect(file);
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[maxSize, onFileSelect]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: accept ? { [accept]: [] } : undefined,
		maxSize,
		multiple: false,
	});

	return (
		<div className="flex items-center gap-4">
			<div {...getRootProps()} className={cn(
				"cursor-pointer transition-colors rounded-full",
				isDragActive && "bg-purple/5",
				widthFull && "w-full"
			)}>
				<input {...getInputProps()} />
				{preview ? (
					<div className="w-14 h-14 rounded-full overflow-hidden">
						<img src={preview} alt="Preview" className="w-full h-full object-cover" />
					</div>
				) : (
					children
				)}
			</div>
			{preview && (
				<Button
					variant="outline"
					className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
					onClick={() => setPreview(null)}
				>
					<Trash2 className="size-4" /> Supprimer
				</Button>
			)}
		</div>

	);

};

const SignupContent = () => {
	const { userType, currentStep, setUserType, updateFormData } = useSignupContext();

	const renderThirdStep = () => {
		if (userType === 'candidate') {
			return <SignupProfileCandidateSection updateFormData={updateFormData} />;
		} else if (userType === 'employer') {
			return <SignupProfileEmployerSection updateFormData={updateFormData} />;
		}
		return null;
	};

	return (
		<div className="flex h-screen overflow-hidden xl:flex-row">
			<SignupImageSection currentStep={currentStep} userType={userType} />
			<div className="flex w-full flex-col overflow-auto bg-white p-8 xl:w-1/2 xl:p-16">
				<div className="mx-auto max-w-xl">
					<Logo />
					<div className="space-y-8">
						{currentStep === 1 && (
							<SignupFormSection userType={userType} setUserType={setUserType} />
						)}
						{currentStep === 2 && (
							<SignupDetailsSection updateFormData={updateFormData} />
						)}
						{currentStep === 3 && renderThirdStep()}
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupImageSection = ({ currentStep, userType }: { currentStep: SignupStep, userType: UserType }) => (
	<div className="relative hidden h-full w-full xl:block xl:w-1/2">
		<img
			src={currentStep === 1 ? heroImage : currentStep === 2 ? signupForm2 : (userType === 'candidate' ? signupForm3Candidate : signupForm3Employer)}
			alt="Professional"
			className="absolute inset-0 size-full rounded-3xl object-cover p-3"
		/>
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
							isSubmit={true}
						/>
					</form>
				</Form>
			</div>
		</>
	);
};

const SignupProfileCandidateSection = ({ updateFormData }: { updateFormData: (data: Record<string, unknown>) => void }) => {
	const { setCurrentStep } = useSignupContext();
	const form = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
	});

	const onSubmit = (data: ProfileSchema) => {
		updateFormData({ profile: data });
	};

	return (
		<>
			<SignupHeader
				title="Créez votre profil et trouvez votre prochain défi professionnel."
				description="Renseignez ces informations pour compléter votre profil et accéder aux meilleures offres d'emploi."
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Champs spécifiques au candidat */}
					<div className="space-y-4">
						<FormLabel>Photo de profil</FormLabel>
						<FileUploader
							accept="image/*"
							maxSize={5 * 1024 * 1024}
							onFileSelect={(file) => form.setValue("photo", file)}
						>
							<Button variant="gradient" className="rounded-full">
								Choisir une photo
							</Button>
						</FileUploader>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							name="currentPosition"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Poste actuel (facultatif)</FormLabel>
									<FormControl>
										<Input placeholder="Graphic Designer" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="ville"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ville</FormLabel>
									<FormControl>
										<Input placeholder="Marseille" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							name="codePostal"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code postal</FormLabel>
									<FormControl>
										<Input placeholder="13001" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="adresse"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse</FormLabel>
									<FormControl>
										<Input placeholder="12 rue de Jouy" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<FormLabel>CV</FormLabel>
							<FileUploader
								accept=".pdf,.doc,.docx"
								maxSize={10 * 1024 * 1024}
								onFileSelect={(file) => form.setValue("cv", file)}
								widthFull={true}
							>
								<div
									className="flex items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 p-6">
									<Upload className="size-6 text-gray-400" />
									<div className="text-center">
										<p>Glissez-déposez ou</p>
										<span className="text-purple">choisissez un fichier</span>
										<p>à télécharger</p>
									</div>
								</div>
							</FileUploader>
						</div>

						<div className="space-y-4">
							<FormLabel>Lettre de motivation (facultatif)</FormLabel>
							<FileUploader
								accept=".pdf,.doc,.docx"
								maxSize={10 * 1024 * 1024}
								onFileSelect={(file) => form.setValue("motivationLetter", file)}
								widthFull={true}
							>
								<div
									className="flex items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 p-6">
									<Upload className="size-6 text-gray-400" />
									<div className="text-center">
										<p>Glissez-déposez ou</p>
										<span className="text-purple">choisissez un fichier</span>
										<p>à télécharger</p>
									</div>
								</div>
							</FileUploader>
						</div>
					</div>

					<SignupNavigationButtons
						onBack={() => setCurrentStep(2)}
						isSubmit={true}
						nextLabel="Créer mon compte candidat"
					/>
				</form>
			</Form>
		</>
	);
};


const SignupProfileEmployerSection = ({ updateFormData }: {
	updateFormData: (data: Record<string, unknown>) => void
}) => {
	const { setCurrentStep } = useSignupContext()
	const form = useForm({
		// Vous pouvez définir un schéma spécifique pour l'employeur ici
		// resolver: zodResolver(employerProfileSchema),
	})

	const onSubmit = (data: any) => {
		updateFormData({ profile: data });
		// Vous pouvez ajouter la logique pour l'étape suivante ou une redirection ici
	};

	return (
		<>
			<SignupHeader
				title="Créez le profil de votre entreprise."
				description="Renseignez ces informations pour compléter votre profil employeur."
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Champs spécifiques à l'employeur */}
					<div className="space-y-4">
						<FormField
							name="companyName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom de l'entreprise</FormLabel>
									<FormControl>
										<Input placeholder="Votre entreprise" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="companyWebsite"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site web de l'entreprise</FormLabel>
									<FormControl>
										<Input placeholder="https://votre-entreprise.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Ajoutez d'autres champs si nécessaire */}
					</div>
					<SignupNavigationButtons
						onBack={() => setCurrentStep(2)}
						isSubmit={true}
						nextLabel="Créer mon compte employeur"
					/>
				</form>
			</Form>
		</>
	);
};

const SignupNavigationButtons = ({
																	 onBack,
																	 onNext,
																	 nextDisabled = false,
																	 isSubmit = false,
																	 nextLabel = "Suivant"
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
			variant="gradient"
			disabled={nextDisabled}
			onClick={!isSubmit ? onNext : undefined}
			type={isSubmit ? 'submit' : 'button'}
		>
			{nextLabel}
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
