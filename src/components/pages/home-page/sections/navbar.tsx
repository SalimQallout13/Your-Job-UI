import React, { useState } from "react"
import { Button } from "@/components/ui/button.jsx"
import { Menu } from "lucide-react"
import { useLogout } from "@/lib/hooks/auth/use-logout.tsx"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import LoginPage from "@/components/pages/signin-page/login-page.tsx"
import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes.ts"
import { Roles } from "@/lib/enums/Roles.ts"
import { CandidatProfile } from "@/lib/interfaces/userData.ts"
import { RecruteurProfile } from "@/lib/interfaces/userData.ts"

type NavbarProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void,
	openLoginDialog: () => void
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen, openLoginDialog }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { handleLogout } = useLogout() // Utilisation du hook `useLogout`
	const { userData } = useNavigationContext()

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const photoProfile = userData
		? userData.role === Roles.Candidat
			? (userData.profile as CandidatProfile)?.photo
			: (userData.profile as RecruteurProfile)?.logo
		: undefined

	return (
		<>
			<LoginPage isOpen={isOpen} setIsOpen={setIsOpen} />
			<header className="bg-[#17181C] shadow-lg">
				<div
					className="container mx-auto flex items-center justify-between px-6 py-4 md:px-20 lg:px-[40px] lg:py-[30px]">
					{/* Left side */}
					<div className="flex items-center">
						{/* Logo */}
						<Link to={"/"} className="text-gradient-primary text-2xl font-bold lg:text-3xl">
							YourJob
						</Link>
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
						{!userData ? (
							<>
								<button onClick={openLoginDialog} className="font-semibold text-white transition hover:text-gray-50">
									Connexion
								</button>
								<Link to={ROUTES.SIGNUP_PATH} className="text-white">
									<Button variant="gradient" size="lg">
										Créer mon compte
									</Button>
								</Link>
							</>
						) : (
							<div className="flex items-center space-x-4">
              <span className="font-semibold text-white">
                Bonjour, {userData.prenom}
              </span>
								<div className="size-14 overflow-hidden rounded-full">
									<img src={`${import.meta.env.VITE_API_URL.replace('/api', '/uploads')}/${photoProfile}`} alt="Photo de profil"
											 className="size-full object-cover" />
								</div>
								<Button variant="gradient2" size="sm" onClick={handleLogout}>
									Déconnexion
								</Button>
							</div>
						)}
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
							{!userData ? (
								<>
									<button onClick={openLoginDialog}
													className="font-semibold text-white transition hover:text-gray-50">
										Connexion
									</button>
									<Link to={ROUTES.SIGNUP_PATH}>
										<Button variant="gradient" size="lg">
											Créer mon compte
										</Button>
									</Link>
								</>
							) : (
								<div className="flex flex-col items-center space-y-2">
                <span className="font-semibold text-white">
                  Bonjour, {userData.prenom}
                </span>
									<Button variant="gradient2" size="sm" onClick={handleLogout}>
										Déconnexion
									</Button>
								</div>
							)}
						</nav>
					</div>
				)}
			</header>
		</>
	)
}

export default Navbar
