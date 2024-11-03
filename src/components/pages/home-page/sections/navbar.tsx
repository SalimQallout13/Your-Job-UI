import React, { useState } from 'react';
import { Button } from "@/components/commons/ui/button.tsx";
import { Menu } from 'lucide-react'; // Icône de menu hamburger

const Navbar: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
	<header className="bg-[#17181C] shadow-lg">

			<div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-20 lg:p-[40px]">

				{/* Logo */}
				<div className="text-gradient-primary text-2xl font-bold lg:text-3xl">
					YourJob
				</div>

				{/* Navigation Links (Hidden on small screens) */}
				<nav className="text-body-gray ml-40 hidden space-x-6 font-semibold md:flex">
					<a href="#home" className="transition hover:text-primary">Toutes les offres</a>
					<a href="#blog" className="transition hover:text-primary">Blog</a>
					<a href="#recruiter" className="transition hover:text-primary">Recruteur</a>
				</nav>

				{/* Actions (Hidden on small screens) */}
				<div className="hidden items-center space-x-4 md:flex">
					<a href="#login" className="font-semibold text-white transition">Connexion</a>
					<Button variant="gradient" size="lg">
						Créer mon compte
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<div className="flex items-center md:hidden">
					<button onClick={toggleMobileMenu} className="text-white focus:outline-none">
						<Menu className="size-6" />
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMobileMenuOpen && (
				<div className="md:hidden">
					<nav className="flex flex-col items-center space-y-4 py-4">
						<a href="#home" className="text-body-gray font-semibold transition hover:text-primary">Toutes les offres</a>
						<a href="#blog" className="text-body-gray font-semibold transition hover:text-primary">Blog</a>
						<a href="#recruiter" className="text-body-gray font-semibold transition hover:text-primary">Recruteur</a>
						<a href="#login" className="font-semibold text-white transition">Connexion</a>
						<Button variant="gradient" size="lg">
							Créer mon compte
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Navbar;
