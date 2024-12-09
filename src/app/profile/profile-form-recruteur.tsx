import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Message } from "@/components/ui/alert.tsx"
import { useProfileFormRecruteur } from "@/lib/hooks/profile/use-profile-form-recruteur.ts"
import Title from "@/components/ui/title.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"

const ProfileFormRecruteur: React.FC = () => {

	const {
		profileFormSecondSchema,
		isSubmitting,
		errorMessage,
		submitProfileFormSecond,
		isLoading,
		secteurActivites,
		isLoadingSecteurActivite
	} = useProfileFormRecruteur()


	if (isLoading) {
		// Affichez un indicateur de chargement tant que les valeurs par défaut ne sont pas prêtes
		return <div>Chargement...</div>
	}

	return (
		<>
			<Form {...profileFormSecondSchema}>
				{errorMessage && <Message message={errorMessage} type={"alert"} />}
				<form>
					<Title className="mb-7">Informations professionnelles</Title>
					<div className="p-6">

						<div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={profileFormSecondSchema.control}
								name="contactPoste"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Poste du contact</FormLabel>
										<FormControl>
											<Input placeholder="CEO" className="h-12" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={profileFormSecondSchema.control}
								name="secteurActivite"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Secteur d'activité</FormLabel>
										<Select
											disabled={isLoadingSecteurActivite}
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger className="h-12 text-gray-900">
												<SelectValue placeholder="Sélectionnez un secteur d'activité" />
											</SelectTrigger>
											<SelectContent>
												{secteurActivites.map((secteurActivite) => (
													<SelectItem
														key={secteurActivite.id}
														value={secteurActivite.id}
														className="text-gray-900"
													>
														{secteurActivite.nom}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={profileFormSecondSchema.control}
								name="employeCount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre de collaborateurs</FormLabel>
										<FormControl>
											<Input type="number" className="h-12" {...field}
														 onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)} // Conversion en entier
											/>
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
						</div>

						<FormControl>
							<Button variant="gradient"
											onClick={profileFormSecondSchema.handleSubmit(submitProfileFormSecond)}
											disabled={isSubmitting}>
								{isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
							</Button>
						</FormControl>
					</div>
				</form>
			</Form>
		</>
	)
}

export default ProfileFormRecruteur
