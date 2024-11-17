import { UserType, useSignupContext } from "@/lib/context/signup-context.tsx"
import { Icons } from "@/components/others/icons.tsx"
import { SignupHeader } from "@/components/pages/signup-page/signup-header.tsx"
import { SignupCard } from "@/components/pages/signup-page/signup-card.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/signup-navigation-buttons.tsx"
import { LoginLink } from "@/components/pages/signup-page/login-link.tsx"

type SignupFormSectionProps = {
	userType: UserType;
	setUserType: (type: UserType) => void;
};

export const SignupFormSection = ({ userType, setUserType }: SignupFormSectionProps) => {
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