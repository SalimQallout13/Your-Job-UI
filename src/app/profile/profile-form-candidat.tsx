import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Message } from "@/components/ui/alert.tsx"
import Dropzone from "@/components/ui/dropzone.tsx"
import { useProfileFormCandidat } from "@/lib/hooks/profile/use-profile-form-candidat.ts"

const ProfileFormCandidat: React.FC = () => {

	const {
		profileFormSecondSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormSecond
	} = useProfileFormCandidat()


	return (
		<>
			<Form {...profileFormSecondSchema}>
				{errorMessage && <Message message={errorMessage} type={"alert"} />}
				<form>
					<h2 className="mb-6 mt-8 text-2xl font-bold">Informations professionnelles</h2>
					{/*<FormField
						control={profileFormSecondSchema.control}
						name="biographie"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Biographie</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Décrivez votre parcours, vos compétences et ce qui vous passionne." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>*/}

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
						<FormField
							control={profileFormSecondSchema.control}
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
							control={profileFormSecondSchema.control}
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

						<FormField
							control={profileFormSecondSchema.control}
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
							control={profileFormSecondSchema.control}
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
						<FormField
							control={profileFormSecondSchema.control}
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
							control={profileFormSecondSchema.control}
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

					<FormControl>
						<Button variant="gradient" onClick={profileFormSecondSchema.handleSubmit(submitProfileFormSecond)}
										disabled={isSubmitting}>
							{isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
						</Button>
					</FormControl>
				</form>
			</Form>
		</>
	)
}

export default ProfileFormCandidat
