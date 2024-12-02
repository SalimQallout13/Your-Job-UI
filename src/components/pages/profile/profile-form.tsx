import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDropzone } from "react-dropzone"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useProfileForm } from "@/lib/hooks/profile/use-profile-form.ts"
import { Message } from "@/components/ui/alert.tsx"
import { ImageUploader } from "@/components/ui/image-uploader.tsx"

const ProfileForm: React.FC = () => {

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => console.log(acceptedFiles)
	})

	const { profileFormSchema, isSubmitting, errorMessage, submitProfileForm } = useProfileForm()


	return (
		<Form {...profileFormSchema}>
			{errorMessage && <Message message={errorMessage} type={"alert"} />}
			<form>
				<div className="flex flex-row gap-4">
					<div>
						<FormField
							control={profileFormSchema.control}
							name="photo"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUploader
											accept="image/*"
											maxSizeInBytes={5 * 1024 * 1024}
											onImageChange={field.onChange}
											uploadButton={
												<Button type="button" variant="gradient" className="rounded-full">
													Modifier la photo
												</Button>
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/></div>
				</div>
				<h2 className="mb-6 text-2xl font-bold">Informations de contact</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormField
						control={profileFormSchema.control}
						name="prenom"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Prénom</FormLabel>
								<FormControl>
									<Input placeholder="Thomas" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={profileFormSchema.control}
						name="nom"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom</FormLabel>
								<FormControl>
									<Input placeholder="Puget" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={profileFormSchema.control}
						name="telephone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Numéro de téléphone</FormLabel>
								<FormControl>
									<Input placeholder="+33 6 66 41 62 67" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={profileFormSchema.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse mail de contact</FormLabel>
								<FormControl>
									<Input placeholder="tpuget@icloud.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<h2 className="mb-6 mt-8 text-2xl font-bold">Informations professionnelles</h2>
				<FormField
					control={profileFormSchema.control}
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
				/>
				<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormField
						control={profileFormSchema.control}
						name="poste"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Poste actuel</FormLabel>
								<FormControl>
									<Input placeholder="Graphic Designer" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={profileFormSchema.control}
						name="localisation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Localisation</FormLabel>
								<FormControl>
									<Input placeholder="Marseille, France" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Zone de téléchargement de fichiers */}
				<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div {...getRootProps({ className: "border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer" })}>
						<input {...getInputProps()} />
						<p>Glissez-déposez ou choisissez un fichier à télécharger</p>
					</div>
					<div {...getRootProps({ className: "border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer" })}>
						<input {...getInputProps()} />
						<p>Glissez-déposez ou choisissez un fichier à télécharger</p>
					</div>
				</div>

				<FormControl>
					<Button variant="gradient" onClick={profileFormSchema.handleSubmit(submitProfileForm)}
									disabled={isSubmitting}>
						{isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
					</Button>
				</FormControl>
			</form>
		</Form>
	)
}

export default ProfileForm
