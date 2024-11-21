import { Link } from "react-router-dom"
import React from "react"

type LinkProps = {
	openLoginDialog: () => void
}
export const LoginLink: React.FC<LinkProps> = ({ openLoginDialog }) => (
	<div className="pt-6 text-center xl:text-left">
		<span className="text-sm text-gray-600">Vous avez déjà un compte ? </span>
		<Link to="/" onClick={openLoginDialog} className="text-purple hover:underline">
			Connectez-vous tout de suite en cliquant ici.
		</Link>
	</div>
)