import { Link } from "react-router-dom"

export const SignUpLink = () => (
	<div className="pt-6 text-center xl:text-left">
		<span className="text-sm text-gray-600">Vous n’avez pas encore de compte ? </span>
		<Link to="/signup" className="text-purple hover:underline">
			Créez le tout de suite en cliquant ici.
		</Link>
	</div>
);