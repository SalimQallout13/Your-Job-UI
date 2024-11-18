import { SignupPageProvider, useSignupPageContext } from "@/lib/context/signup-context"
import { cn } from "@/lib/utils/utils";
import { SignupThirdSTepCandidate } from "@/components/pages/signup-page/form/signup-third-step-candidate.tsx"
import { SignupThirdStepEmployeur } from "@/components/pages/signup-page/form/signup-third-step-employeur.tsx"
import { SignupImageSection } from "@/components/pages/signup-page/commons/signup-image-section.tsx"
import { Logo } from "@/components/pages/signup-page/commons/logo.tsx"
import { SignupSecondStep } from "@/components/pages/signup-page/form/signup-second-step.tsx"
import { SignupSuccessStep } from "@/components/pages/signup-page/form/signup-success-step.tsx"
import { SignupFirstStep } from "@/components/pages/signup-page/form/signup-first-step.tsx"

const SignupPageContent = () => {
	const { userRole, currentStep, setUserRole, updateFormData } = useSignupPageContext();

	const renderThirdStep = () => {
		if (userRole === 'candidate') {
			return <SignupThirdSTepCandidate updateFormData={updateFormData} />;
		} else if (userRole === 'employer') {
			return <SignupThirdStepEmployeur updateFormData={updateFormData} />;
		}
		return null;
	};

	return (
		<div className="flex min-h-screen overflow-hidden xl:flex-row">
			<SignupImageSection currentStep={currentStep} userRole={userRole} />
			<div className="flex w-full flex-col overflow-auto bg-white p-8 xl:w-1/2 xl:px-16 xl:pb-16 xl:pt-12">
				<div className={cn(
					"mx-auto max-w-xl",
					currentStep === "successStep" && "flex h-full flex-col items-center justify-center"
				)}>
					<div className={currentStep === 'successStep' ? "hidden" : ""}>
						<Logo />
					</div>
					<div className={cn(
						"space-y-8",
						currentStep === "successStep" && "flex flex-col gap-6"
					)}>
						{currentStep === 'firstStep' && (
							<SignupFirstStep userRole={userRole} setUserRole={setUserRole} />
						)}
						{currentStep === 'secondStep' && (
							<SignupSecondStep updateFormData={updateFormData} />
						)}
						{currentStep === 'thirdStep' && renderThirdStep()}
						{currentStep === 'successStep' && (
							<SignupSuccessStep />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupPage = () => (
	<SignupPageProvider>
		<SignupPageContent />
	</SignupPageProvider>
);

export default SignupPage;

