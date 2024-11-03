import { useState } from 'react';
import { Button } from "@/components/commons/ui/button.jsx";
import { Menu } from 'lucide-react';

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="bg-[#17181C] shadow-lg">
				<div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-20 lg:px-[40px] lg:py-[30px]">

				{/* Left side */}
				<div className="flex items-center">
					{/* Logo */}
					<div className="text-gradient-primary text-2xl font-bold lg:text-3xl">
						YourJob
					</div>
					{/* Navigation Links */}
					<nav className="text-body-gray hidden space-x-6 font-semibold md:ml-10 md:block lg:ml-32 xl:ml-96">
						<a href="#home" className="hover:text-purple-highlight transition">
							Toutes les offres
						</a>
						<a href="#blog" className="hover:text-purple-highlight transition">
							Blog
						</a>
						<a href="#recruiter" className="hover:text-purple-highlight transition">
							Recruteur
						</a>
					</nav>
				</div>

				{/* Right side */}
				<div className="hidden items-center space-x-4 md:flex">
					<a href="#login" className="font-semibold text-white transition hover:!text-gray-100">
						Connexion
					</a>
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
						<a
							href="#home"
							className="text-body-gray hover:text-purple-highlight font-semibold transition"
						>
							Toutes les offres
						</a>
						<a
							href="#blog"
							className="text-body-gray hover:text-purple-highlight font-semibold transition"
						>
							Blog
						</a>
						<a
							href="#recruiter"
							className="text-body-gray hover:text-purple-highlight font-semibold transition"
						>
							Recruteur
						</a>
						<a href="#login" className="font-semibold text-white transition">
							Connexion
						</a>
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
