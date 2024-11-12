import React, { useState } from "react"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/pages/home-page/sections/navbar.tsx"
import ProfileForm from "@/components/pages/profile/profile-form.tsx"
import { NavLink } from "react-router-dom"

const ProfilePage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	// Fonction pour ouvrir le modal
	const openLoginDialog = () => setIsOpen(true)

	return (
		<>
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} openLoginDialog={openLoginDialog} />
			<nav className="bg-[#F2F2F2] p-4 flex space-x-8">
				<NavLink
					to="/dashboard"
					className={({ isActive }) =>
						isActive ? "text-black font-bold border-b-2 border-gray-800 pb-1" : "text-gray-500 hover:text-black"
					}
				>
					Tableau de bord
				</NavLink>
				<NavLink
					to="/profile"
					className={({ isActive }) =>
						isActive ? "text-black font-bold border-b-2 border-gray-800 pb-1" : "text-gray-500 hover:text-black"
					}
				>
					Mon profil
				</NavLink>
				<NavLink
					to="/offers"
					className={({ isActive }) =>
						isActive ? "text-black font-bold border-b-2 border-gray-800 pb-1" : "text-gray-500 hover:text-black"
					}
				>
					Mes offres
				</NavLink>
			</nav>
			<main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left Column - Profile Summary */}
				<section className="rounded-lg bg-white p-6 shadow">
					<h2 className="mb-4 text-2xl font-bold">Profil</h2>

					{/* Profile Completion */}
					<div className="mt-8">
						<p className="mb-2 text-sm text-gray-700">Complétez votre profil</p>
						<Progress value={65} className="bg-purple-500 h-2" />
					</div>

					{/* Profile Stats */}
					<div className="mt-8">
						<h3 className="mb-2 text-lg font-semibold">Votre recherche</h3>
						<p className="text-gray-700">163 Offres vues</p>
						<p className="text-gray-700">29 Candidatures</p>
						<p className="text-gray-700">4 Entretiens</p>
					</div>
				</section>

				{/* Middle Column - Contact Information */}
				<section className="col-span-2 rounded-lg bg-white p-6 shadow">
					<ProfileForm />
				</section>
			</main>
		</>
	)
}

export default ProfilePage
