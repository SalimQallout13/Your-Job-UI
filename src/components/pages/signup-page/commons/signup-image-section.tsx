import { SignupStep, UserType } from "@/lib/context/signup-context.tsx"
import heroImage from "@/assets/img/hero-image.png"
import signupForm2 from "@/assets/img/signup-form-2.png"
import signupSuccessImage from "@/assets/img/signup-succes.png"
import signupForm3Candidate from "@/assets/img/signup-form-3-candidat.png"
import signupForm3Employer from "@/assets/img/signup-form-3-employeur.png"

export const SignupImageSection = ({ currentStep, userType }: { currentStep: SignupStep, userType: UserType }) => (
	<div className="relative hidden size-full xl:block xl:w-1/2">
		<img
			src={currentStep === 1 ? heroImage : currentStep === 2 ? signupForm2 :currentStep === 4 ? signupSuccessImage : (userType === 'candidate' ? signupForm3Candidate : signupForm3Employer)}
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