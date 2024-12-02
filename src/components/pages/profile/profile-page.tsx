import React from "react"
import ProfileForm from "@/components/pages/profile/profile-form.tsx"
import HeaderNav from "@/components/pages/profile/commons/header-nav.tsx"
import HeaderTitle from "@/components/pages/profile/commons/header-title.tsx"
import Title from "@/components/ui/title.tsx"
import Avatar from "@/components/ui/avatar.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"

const ProfilePage: React.FC = () => {
	const { userData, photoProfile } = useSessionContext()
	return (
		<>
			<HeaderNav />
			<main className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				<HeaderTitle>Profil</HeaderTitle>
				{/* Left Column - 25% */}
				<section className="col-span-1 rounded-lg ps-24">
					<Title>Vos informations</Title>
					<div className="flex flex-row py-8 mt-4">
						<div className="basis-1/4">
						<Avatar size="lg" photoProfile={photoProfile} />
						</div>
						<div className="basis-1/2 text-left">
							<p className="font-poppins text-[24px] font-bold leading-[39px] tracking-[-0.06em]">{userData?.nom + " " + userData?.prenom}</p>
							<p className="font-inter text-[20px] font-bold leading-[24.2px] tracking-[-0.06em]">{userData?.currentPoste}</p>
							<p className="font-inter text-gray-600 text-[12px] font-normal leading-[14.52px] tracking-[-0.06em]">{userData?.ville}</p>
						</div>
					</div>
				</section>

				{/* Right Column - 75% */}
				<section className="col-span-3 rounded-lg p-6">
					<ProfileForm />
				</section>
			</main>


		</>
	)
}

export default ProfilePage
