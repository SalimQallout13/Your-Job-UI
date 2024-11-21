import React from "react"
import { Progress } from "@/components/ui/progress"
import ProfileForm from "@/components/pages/profile/profile-form.tsx"
import ProfileNav from "@/components/pages/profile/commons/profile-nav.tsx"
import { Title } from "@/components/pages/profile/commons/title.tsx"

const ProfilePage: React.FC = () => {
	return (
		<>
			<ProfileNav />
			<main className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{/* Left Column - 25% */}
				<section className="rounded-lg bg-white p-6 col-span-1">
					<Title>Profil</Title>

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

				{/* Right Column - 75% */}
				<section className="rounded-lg bg-white p-6 col-span-3">
					<ProfileForm />
				</section>
			</main>


		</>
	)
}

export default ProfilePage
