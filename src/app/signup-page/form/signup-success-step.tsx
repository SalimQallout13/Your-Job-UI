import { Icons } from "@/components/ui/icons.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes.ts"
import { Logo } from "@/components/commons/logo.tsx"
import { useSigninContext } from "@/lib/context/signin-context.tsx"

export const SignupSuccessStep = () => {
	const { closeLoginDialog } = useSigninContext()

	return (
		<>
			<Icons.signUpSuccessValid className="mx-auto size-16 xl:mx-0" />
			<Logo />
			<div className="pt-4 text-center xl:text-left">
				<h2 className="mb-6 text-3xl font-semibold text-black-primary">
					Créez un compte entreprise et trouvez vos futurs talents.
				</h2>
				<p className="text-lg text-gray-600">
					Complétez ces informations pour publier des offres et gérer vos candidatures.
				</p>
			</div>
			<Button variant="gradient" size="lg" asChild className="mx-auto h-12 w-fit xl:mx-0">
				<Link to={ROUTES.PROFILE_PATH} onClick={closeLoginDialog} className="flex items-center gap-3">
					Aller au tableau de bord
				</Link>
			</Button>
		</>
	)
}