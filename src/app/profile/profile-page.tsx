import React from "react"
import ProfileForm from "@/app/profile/profile-form.tsx"
import HeaderNav from "@/app/profile/commons/header-nav.tsx"
import HeaderTitle from "@/app/profile/commons/header-title.tsx"
import Title from "@/components/ui/title.tsx"
import Avatar from "@/components/ui/avatar.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"

const ProfilePage: React.FC = () => {
	const { userData, currentPoste } = useSessionContext()

	return (
		<>
			<HeaderNav />
			<main className="grid grid-cols-1 gap-8 xl:grid-cols-3">
				<HeaderTitle>Profil</HeaderTitle>
				{/* Left Column - 25% */}
				<section className="hidden xl:block col-span-1 ps-24">
					<Title>Vos informations</Title>
					<div className="mt-4 flex flex-row py-8">
						<div className="basis-1/4">
							<Avatar size="lg" photoProfile={userData?.photo} />
						</div>
						<div className="basis-1/2 text-left">
							<p
								className="font-poppins text-[24px] font-bold leading-[39px] tracking-[-0.06em]">{userData?.nom + " " + userData?.prenom}</p>
							<p className="font-inter text-[20px] font-bold leading-[24.2px] tracking-[-0.06em]">{currentPoste}</p>
							<p
								className="font-inter text-[12px] font-normal leading-[14.52px] tracking-[-0.06em] text-gray-600">{userData?.ville}</p>
						</div>
					</div>
				</section>

				{/* Right Column - 75% */}
				<section className="col-span-2 md:col-span-3 p-6">
					<ProfileForm />
				</section>
			</main>


		</>
	)
}

export default ProfilePage