import { SignupFormData } from "@/lib/context/signup-context.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SignUpHeader } from "@/components/commons/sign-up-header.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"

import Dropzone from "@/components/ui/dropzone.tsx"
import { ImageUploader } from "@/components/ui/image-uploader.tsx"
import { useThirdStepCandidate } from "@/lib/hooks/signup/use-third-step-candidate.ts"

export const SignupThirdSTepCandidate = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {

	const {
		signupThirdStepDataCandidat,
		submitSignInForm,
		setCurrentStep,
		isSubmitting
	} = useThirdStepCandidate({ updateFormData })

	return (
		<>
			<SignUpHeader
				title="Créez votre profil et trouvez votre prochain défi professionnel."
				description="Renseignez ces informations pour compléter votre profil et accéder aux meilleures offres d'emploi."
			/>
			<Form {...signupThirdStepDataCandidat}>
				<form onSubmit={signupThirdStepDataCandidat.handleSubmit(submitSignInForm)} className="space-y-8">
					{/* Champs spécifiques au candidat */}
					<div className="space-y-4">
						<FormField
							control={signupThirdStepDataCandidat.control}
							name="photo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Photo de profil</FormLabel>
									<FormControl>
										<ImageUploader
											accept="image/*"
											maxSizeInBytes={5 * 1024 * 1024}
											onImageChange={field.onChange}
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
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							name="currentPoste"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Poste actuel (facultatif)</FormLabel>
									<FormControl>
										<Input placeholder="Graphic Designer" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="ville"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ville</FormLabel>
									<FormControl>
										<Input placeholder="Marseille" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							name="codePostal"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code postal</FormLabel>
									<FormControl>
										<Input placeholder="13001" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="adresse"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse</FormLabel>
									<FormControl>
										<Input placeholder="12 rue de Jouy" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={signupThirdStepDataCandidat.control}
							name="cv"
							render={({ field }) => (
								<FormItem className="space-y-4">
									<FormLabel>CV</FormLabel>
									<FormControl>
										<Dropzone
											accept="application/pdf"
											maxSize={10 * 1024 * 1024}
											onFileChange={(file) => {
												field.onChange(file)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={signupThirdStepDataCandidat.control}
							name="lettreMotivation"
							render={({ field }) => (
								<FormItem className="space-y-4">
									<FormLabel>Lettre de motivation</FormLabel>
									<FormControl>
										<Dropzone
											accept="application/pdf"
											maxSize={10 * 1024 * 1024}
											onFileChange={(file) => {
												field.onChange(file)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<SignupNavigationButtons
						onBack={() => setCurrentStep("secondStep")}
						isSubmit={true}
						isLoading={isSubmitting}
						nextLabel="Créer mon compte candidat"
					/>
				</form>
			</Form>
		</>
	)
}
