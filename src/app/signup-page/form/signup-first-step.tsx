import { useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { Icons } from "@/components/ui/icons.tsx"
import { SignUpHeader } from "@/components/commons/sign-up-header.tsx"
import { SignupCard } from "@/app/signup-page/commons/signup-card.tsx"
import { SignupNavigationButtons } from "@/app/signup-page/commons/signup-navigation-buttons.tsx"
import { LoginLink } from "@/app/signup-page/commons/login-link.tsx"
import { Roles } from "@/lib/enums/Roles.ts"
import { useSigninContext } from "@/lib/context/signin-context.tsx"

type SignupFirstStepProps = {
	userRole: Roles;
	setUserRole: (type: Roles) => void;
};

export const SignupFirstStep = ({ userRole, setUserRole }: SignupFirstStepProps) => {
	const { setCurrentStep, updateFormData } = useSignupPageContext()
	const { openLoginDialog } = useSigninContext()

	const handleNext = () => {
		updateFormData({
			firstStepData: { userRole: userRole }
		})
		setCurrentStep("secondStep")
	}

	return (
		<>
			<SignUpHeader
				title="Comment souhaitez-vous utiliser YourJob ?"
				description="Choisissez votre voie et commencez votre aventure dans le monde du travail, que vous soyez en quête de talents ou de votre prochaine opportunité."
			/>
			<div className="space-y-7">
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
					<SignupCard
						isSelected={userRole === Roles.Candidat}
						onClick={() => setUserRole(Roles.Candidat)}
						title="Trouver un emploi"
						description="Prêt à découvrir de nouvelles opportunités ?"
						icon={<Icons.signupCandidat className="size-8" />}
					/>
					<SignupCard
						isSelected={userRole === Roles.Entreprise}
						onClick={() => setUserRole(Roles.Entreprise)}
						title="Recruter des profils"
						description="Trouvez les talents qui feront la différence."
						icon={<Icons.signupEmployeur className="size-8" />}
					/>
				</div>
				<SignupNavigationButtons
					onBack={() => window.history.back()}
					onNext={handleNext}
					nextDisabled={!userRole}
				/>
				<LoginLink openLoginDialog={openLoginDialog} />
			</div>
		</>
	)
}