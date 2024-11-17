import { Link } from "react-router-dom"

export const LoginLink = () => (
	<div className="pt-6 text-center xl:text-left">
		<span className="text-sm text-gray-600">Vous avez déjà un compte ? </span>
		<Link to="/" className="text-purple hover:underline">
			Connectez-vous tout de suite en cliquant ici.
		</Link>
	</div>
);