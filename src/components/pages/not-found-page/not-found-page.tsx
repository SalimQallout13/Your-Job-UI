import { Link } from "react-router-dom";
import React from "react";
import { ROUTES } from "@/lib/configs/routes.ts"

export default function NotFoundPage() {

	return (
		<React.Fragment>
			<div className="flex min-h-dvh flex-col items-center justify-center space-y-6 px-4 md:px-6">
				<div className="space-y-2 text-center ">
					<h1 className="text-4xl font-bold">404</h1>
					<p className="text-gray-500 dark:text-gray-400">Page non trouvée</p>
				</div>
				<Link
					className="inline-flex h-10 items-center justify-center rounded-md bg-primaryHexacoffre px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-accent-primaryHexacoffre focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
					to={ROUTES.LOGIN}
				>
					Retourner à la page d'accueil
				</Link>
			</div>
		</React.Fragment>
	);
}