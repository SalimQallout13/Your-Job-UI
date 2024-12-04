import React from "react"
import ProfileForm from "@/components/pages/profile/profile-form.tsx"
import HeaderNav from "@/components/pages/profile/commons/header-nav.tsx"
import HeaderTitle from "@/components/pages/profile/commons/header-title.tsx"
import Title from "@/components/ui/title.tsx"
import Avatar from "@/components/ui/avatar.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import ProfileFormCandidat from "@/components/pages/profile/profile-form-candidat.tsx"
import { Button } from "@/components/ui/button.tsx"
import { ImageUploader } from "@/components/ui/image-uploader.tsx"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { FormProvider } from "react-hook-form"
import { useProfileForm } from "@/lib/hooks/profile/use-profile-form.ts"

const ProfilePage: React.FC = () => {
	const { userData, currentPoste } = useSessionContext()
	const { isSubmitting, profileFormOneSchema, submitPhotoProfile } = useProfileForm()

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
					<FormProvider  {...profileFormOneSchema}>
						<form onSubmit={profileFormOneSchema.handleSubmit(submitPhotoProfile)} className="space-y-8">
							<FormField
								name="photo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Photo de profil</FormLabel>
										<FormControl>
											<ImageUploader
												accept="image/*"
												maxSizeInBytes={5 * 1024 * 1024}
												value={field.value} // Rendre le composant contrôlé
												onImageChange={field.onChange} // Propager les changements
												uploadButton={
													<Button type="button" variant="gradient" className="rounded-full">
														Choisir une photo
													</Button>
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormControl>
								<Button variant="gradient" disabled={isSubmitting}>
									{isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
								</Button>
							</FormControl>
						</form>
					</FormProvider>
					<ProfileForm />
					<ProfileFormCandidat />
				</section>
			</main>


		</>
	)
}

export default ProfilePage
