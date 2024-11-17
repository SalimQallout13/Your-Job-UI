import { SignupProvider, useSignupContext } from "@/lib/context/signup-context"
import { cn } from "@/lib/utils/utils";
import { SignupProfileCandidateSection } from "@/components/pages/signup-page/signup-profil-candidate-section.tsx"
import { SignupProfileEmployerSection } from "@/components/pages/signup-page/sign-profil-employeur-section.tsx"
import { SignupImageSection } from "@/components/pages/signup-page/signup-image-section.tsx"
import { Logo } from "@/components/pages/signup-page/logo.tsx"
import { SignupDetailsSection } from "@/components/pages/signup-page/signup-detail-section.tsx"
import { SignupSuccess } from "@/components/pages/signup-page/signup-success.tsx"
import { SignupFormSection } from "@/components/pages/signup-page/signup-form-section.tsx"

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
			<div className="flex w-full flex-col overflow-auto bg-white p-8 xl:w-1/2 xl:px-16 xl:pb-16 xl:pt-12">
				<div className={cn(
					"mx-auto max-w-xl",
					currentStep === 4 && "flex h-full flex-col items-center justify-center"
				)}>
					<div className={currentStep === 4 ? "hidden" : ""}>
						<Logo />
					</div>
					<div className={cn(
						"space-y-8",
						currentStep === 4 && "flex flex-col gap-6"
					)}>
						{currentStep === 1 && (
							<SignupFormSection userType={userType} setUserType={setUserType} />
						)}
						{currentStep === 2 && (
							<SignupDetailsSection updateFormData={updateFormData} />
						)}
						{currentStep === 3 && renderThirdStep()}
						{currentStep === 4 && (
							<SignupSuccess />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupPage = () => (
	<SignupProvider>
		<SignupContent />
	</SignupProvider>
);

export default SignupPage;

