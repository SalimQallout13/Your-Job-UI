import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignupProvider, SignupStep, UserType, useSignup } from "@/lib/context/signup-context";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils/utils";
import heroImage from "@/assets/img/hero-image.png";

type SignupFormSectionProps = {
	userType: UserType;
	setUserType: (type: UserType) => void;
	setCurrentStep: (step: SignupStep) => void;
};

type SignupCardProps = {
	isSelected: boolean;
	onClick: () => void;
	title: string;
	description: string;
};

type SignupActionsProps = {
	setCurrentStep: (step: SignupStep) => void;
	userType: UserType;
};

const SignupContent = () => {
	const { userType, setUserType, setCurrentStep } = useSignup();

	return (
		<div className="flex min-h-screen flex-col overflow-hidden xl:flex-row">
			<SignupImageSection />
			<SignupFormSection userType={userType} setUserType={setUserType} setCurrentStep={setCurrentStep} />
		</div>
	);
};

const SignupImageSection = () => (
	<div className="relative h-[50vh] w-full xl:h-screen xl:w-1/2">
		<img
			src={heroImage}
			alt="Professional woman"
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

const SignupFormSection = ({ userType, setUserType, setCurrentStep }: SignupFormSectionProps) => (
	<div className="w-full bg-white p-8 xl:w-1/2 xl:p-16">
		<div className="mx-auto max-w-xl">
			<Logo />
			<div className="space-y-8">
				<SignupHeader />
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
					<SignupCard
						isSelected={userType === 'candidate'}
						onClick={() => setUserType('candidate')}
						title="Trouver un emploi"
						description="Prêt à découvrir de nouvelles opportunités ?"
					/>
					<SignupCard
						isSelected={userType === 'employer'}
						onClick={() => setUserType('employer')}
						title="Recruter des profils"
						description="Trouvez les talents qui feront la différence."
					/>
				</div>
				<SignupActions setCurrentStep={setCurrentStep} userType={userType} />
				<LoginLink />
			</div>
		</div>
	</div>
);

const Logo = () => (
	<div className="mb-8 text-center xl:text-left">
		<h1 className="text-gradient-primary text-4xl font-bold">YourJob</h1>
	</div>
);

const SignupHeader = () => (
	<div className="pt-4 text-center xl:text-left">
		<h2 className="mb-6 text-3xl font-bold text-black-primary lg:max-w-[450px]">
			Comment souhaitez-vous utiliser YourJob ?
		</h2>
		<p className="text-lg text-gray-600">
			Choisissez votre voie et commencez votre aventure dans le monde du travail, que vous soyez en quête de talents ou de votre prochaine opportunité.
		</p>
	</div>
);

const SignupCard = ({ isSelected, onClick, title, description }: SignupCardProps) => (
	<Card
		className={cn(
			"relative cursor-pointer rounded-xl p-5 transition-all hover:shadow-lg",
			isSelected ? 'border-2 border-purple' : 'border border-gray-200'
		)}
		onClick={onClick}
	>
		{isSelected && (
			<div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-purple p-2">
				<svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
			</div>
		)}
		<CardContent className="text-center">
			<div className="mb-4 mt-12 flex justify-center">
				<div className="flex size-12 items-center justify-center rounded-xl bg-purple/10">
					<svg className="size-6 text-purple" /* Ajoutez votre chemin SVG ici */ />
				</div>
			</div>
			<h3 className="mb-2 text-lg font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">{description}</p>
		</CardContent>
	</Card>
);

const SignupActions = ({ setCurrentStep, userType }: SignupActionsProps) => (
	<div className="flex justify-center gap-4 pt-6 xl:justify-start">
		<Button
			variant="outline"
			className="rounded-full px-8 py-3"
			onClick={() => window.history.back()}
		>
			Retour
		</Button>
		<Button
			variant="gradient2"
			className="rounded-full bg-purple px-8 py-3 text-white"
			disabled={!userType}
			onClick={() => setCurrentStep(2)}
		>
			Suivant
		</Button>
	</div>
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
