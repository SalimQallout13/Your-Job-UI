import { SignupProvider, useSignupContext } from "@/lib/context/signup-context"
import { cn } from "@/lib/utils/utils";
import { SignupThirdSTepCandidate } from "@/components/pages/signup-page/form/signup-third-step-candidate.tsx"
import { SignupThirdStepEmployeur } from "@/components/pages/signup-page/form/signup-third-step-employeur.tsx"
import { SignupImageSection } from "@/components/pages/signup-page/commons/signup-image-section.tsx"
import { Logo } from "@/components/pages/signup-page/commons/logo.tsx"
import { SignupSecondStep } from "@/components/pages/signup-page/form/signup-second-step.tsx"
import { SignupSuccessStep } from "@/components/pages/signup-page/form/signup-success-step.tsx"
import { SignupFirstStep } from "@/components/pages/signup-page/form/signup-first-step.tsx"

const SignupPageContent = () => {
	const { userType, currentStep, setUserType, updateFormData } = useSignupContext();

	const renderThirdStep = () => {
		if (userType === 'candidate') {
			return <SignupThirdSTepCandidate updateFormData={updateFormData} />;
		} else if (userType === 'employer') {
			return <SignupThirdStepEmployeur updateFormData={updateFormData} />;
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
							<SignupFirstStep userType={userType} setUserType={setUserType} />
						)}
						{currentStep === 2 && (
							<SignupSecondStep updateFormData={updateFormData} />
						)}
						{currentStep === 3 && renderThirdStep()}
						{currentStep === 4 && (
							<SignupSuccessStep />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupPage = () => (
	<SignupProvider>
		<SignupPageContent />
	</SignupProvider>
);

export default SignupPage;

