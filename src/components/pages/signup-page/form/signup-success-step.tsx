import { Icons } from "@/components/others/icons.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes.ts"
import { Logo } from "@/components/pages/signup-page/commons/logo.tsx"

export const SignupSuccessStep = () => {
	return (
		<>
			<Icons.signUpSuccessValid className="size-16"/>
			<Logo />
			<div className="pt-4">
				<h2 className="mb-6 text-3xl font-semibold text-black-primary">
					Créez un compte entreprise et trouvez vos futurs talents.
				</h2>
				<p className="text-lg text-gray-600">
					Complétez ces informations pour publier des offres et gérer vos candidatures.
				</p>
			</div>
			<Button variant="gradient" size="lg" asChild className="h-12 w-fit">
				<Link to={ROUTES.HOME_PATH} className="flex items-center gap-3">
					Aller au tableau de bord
				</Link>
			</Button>
		</>
	);
};