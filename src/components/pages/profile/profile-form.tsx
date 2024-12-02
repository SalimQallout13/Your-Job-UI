import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useProfileForm } from "@/lib/hooks/profile/use-profile-form.ts"
import { Message } from "@/components/ui/alert.tsx"

const ProfileForm: React.FC = () => {

	const {
		profileFormOneSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormOne,
	} = useProfileForm()


	return (
		<>
			<Form {...profileFormOneSchema}>
				{errorMessage && <Message message={errorMessage} type={"alert"} />}
				<form>
					<h2 className="mb-6 text-2xl font-bold">Informations de contact</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
						<FormField
							control={profileFormOneSchema.control}
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
							control={profileFormOneSchema.control}
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
							control={profileFormOneSchema.control}
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
							control={profileFormOneSchema.control}
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
					<FormControl>
						<Button variant="gradient" onClick={profileFormOneSchema.handleSubmit(submitProfileFormOne)}
										disabled={isSubmitting}>
							{isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
						</Button>
					</FormControl>
				</form>
			</Form>
		</>
	)
}

export default ProfileForm
