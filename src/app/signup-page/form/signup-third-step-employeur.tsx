import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import {
	signupThirdStepEmployeur,
	SignupThirdStepEmployeurSchema
} from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { SignUpHeader } from "@/components/commons/sign-up-header.tsx"
import { SignupNavigationButtons } from "@/app/signup-page/commons/signup-navigation-buttons.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { SecteurActivite } from "@/api/domaine-api.ts"
import { signup } from "@/api/signup-api.ts"
import { showErrorToast, showToast, toast } from "@/lib/hooks/use-toast.tsx"
import { ImageUploader } from "@/components/ui/image-uploader.tsx"
import { useSessionContext } from "@/lib/context/session-context.tsx"
import { getSecteursActivite } from "@/api/domaine-api.ts"

export const SignupThirdStepEmployeur = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {
	const { setCurrentStep, formData } = useSignupPageContext()
	const [secteurActivites, setSecteurActivites] = useState<SecteurActivite[]>([])
	const [isLoadingSecteurActivite, setIsLoadingSecteurActivite] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { setUserData } = useSessionContext()

	const form = useForm<SignupThirdStepEmployeurSchema>({
		resolver: zodResolver(signupThirdStepEmployeur),
		defaultValues: {
			photo: undefined,
			companyName: "",
			contactName: formData.secondStepData?.prenom + " " + formData.secondStepData?.nom,
			contactPoste: "",
			ville: "",
			adresse: "",
			codePostal: "",
			secteurActivite: "",
			employeCount: 0
		}
	})

	useEffect(() => {
		const fetchSecteurActivite = async () => {
			setIsLoadingSecteurActivite(true)
			try {
				const response = await getSecteursActivite()
				setSecteurActivites(response.secteursActivite)

				if (response.message) {
					toast({
						title: "Information",
						description: response.message
					})
				}
			} catch (error) {
				throw new Error(error instanceof Error ? error.message : "Une erreur est survenue")
			} finally {
				setIsLoadingSecteurActivite(false)
			}
		}

		fetchSecteurActivite().catch(console.error)
	}, [])

	const onSubmit = async (data: SignupThirdStepEmployeurSchema) => {
		if (!formData.secondStepData) {
			toast({
				title: "Erreur",
				description: "Données du formulaire incomplètes"
			})
			return
		}

		try {
			setIsSubmitting(true)

			// Mise à jour du context avec les nouvelles données
			const updatedFormData = {
				...formData,
				thirdStepData: data
			}
			updateFormData(updatedFormData)

			const response = await signup(updatedFormData)

			if (response.status === "success") {
				showToast("Succès", "Inscription en cours", true)
				setCurrentStep("successStep")
				setUserData(response.data)
				showToast("Succès", "Votre inscription a bien été prise en compte", false)
			} else {
				// Gérer les erreurs renvoyées par l'API
				showErrorToast(response.error)
			}

		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
				variant: "destructive"
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (

		<>
			<SignUpHeader
				title="Créez un compte entreprise et trouvez vos futurs talents."
				description="Complétez ces informations pour publier des offres et gérer vos candidatures."
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="companyName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom de l'entreprise</FormLabel>
									<FormControl>
										<Input placeholder="Manufacture & Co" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="contactName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom du contact (recruteur)</FormLabel>
									<FormControl>
										<Input disabled={true} placeholder="Allan McArthur" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
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
							control={form.control}
							name="adresse"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse de l'entreprise</FormLabel>
									<FormControl>
										<Input placeholder="303 West, 93rd Street, 1005" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
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
							control={form.control}
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
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="photo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Logo de l'entreprise (facultatif)</FormLabel>
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

					<SignupNavigationButtons
						onBack={() => setCurrentStep("secondStep")}
						isSubmit={true}
						isLoading={isSubmitting}
						nextLabel={isSubmitting ? "Création en cours..." : "Créer mon compte entreprise"}
					/>
				</form>
			</Form>
		</>
	)
}