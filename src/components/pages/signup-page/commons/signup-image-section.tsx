import { SignupStep, UserType } from "@/lib/context/signup-context.tsx"
import firstStepImage from "@/assets/img/hero-image.png"
import secondStepImage from "@/assets/img/signup-form-2.png"
import signupSuccessStepImage from "@/assets/img/signup-succes.png"
import signupThirdStepCandidate from "@/assets/img/signup-form-3-candidat.png"
import signupThirdStepEmployer from "@/assets/img/signup-form-3-employeur.png"

// SignupImageSection.tsx
export const SignupImageSection = ({ currentStep, userType }: { currentStep: SignupStep, userType: UserType }) => (
	<div className="relative hidden xl:block xl:w-1/2">
		<div className="fixed h-screen w-1/2"> {/* Ajout de fixed et w-1/2 */}
			<img
				src={currentStep === 'firstStep' ? firstStepImage : currentStep === "secondStep" ? secondStepImage : currentStep === "successStep" ? signupSuccessStepImage : (userType === 'candidate' ? signupThirdStepCandidate : signupThirdStepEmployer)}
				alt="Professional"
				className="h-full w-full rounded-3xl object-cover p-3"
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
	</div>
);