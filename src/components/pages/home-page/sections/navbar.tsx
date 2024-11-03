import React from 'react';
import { Button } from "@/components/commons/ui/button.tsx"

const Navbar: React.FC = () => {
	return (
	// padding: 20px 100px 20px 100px;
	<header className="bg-black-primary p-[20px_100px_20px_100px] shadow-lg">
			<div className="container mx-auto flex items-center justify-between p-4">

				{/* Logo */}
				<div className="text-gradient-primary text-[36px] font-bold">
					YourJob
				</div>

				{/* Navigation Links */}
				<nav className="text-body-gray space-x-6 font-semibold">
					<a href="#home" className="transition hover:text-primary">Toutes les offres</a>
					<a href="#blog" className="transition hover:text-primary">Blog</a>
					<a href="#recruiter" className="transition hover:text-primary">Recruteur</a>
				</nav>

				{/* Actions */}
				<div className="flex items-center space-x-4">
					<a href="#login" className="font-semibold text-white transition">Connexion</a>
					<Button variant="gradient" size="lg">
						Créer mon compte
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
