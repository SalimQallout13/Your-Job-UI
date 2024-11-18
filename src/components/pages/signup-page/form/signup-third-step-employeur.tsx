import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupThirdStepEmployeur, SignupThirdStepEmployeurSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { SignupHeader } from "@/components/pages/signup-page/commons/signup-header.tsx"
import { FileUploader } from "@/components/ui/file-uploader.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { getSecteursActivite, SecteurActivite, signup } from "@/api/signup-api.ts"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"

export const SignupThirdStepEmployeur = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {
	const { setCurrentStep, formData } = useSignupPageContext();
	const [secteurActivites, setSecteurActivites] = useState<SecteurActivite[]>([]);
	const [isLoadingSecteurActivite, setIsLoadingSecteurActivite] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUserData } = useNavigationContext();

	const form = useForm<SignupThirdStepEmployeurSchema>({
		resolver: zodResolver(signupThirdStepEmployeur),
		defaultValues: {
			companyName: "",
			contactName: formData.secondStepData?.prenom + ' ' + formData.secondStepData?.nom,
			contactPoste: "",
			ville: "",
			adresse: "",
			codePostal: "",
			secteurActivite: "",
			employeesCount: "0",
			logo: null,
		},
	});

	useEffect(() => {
		const fetchSecteurActivite = async () => {
			setIsLoadingSecteurActivite(true);
			try {
				const response = await getSecteursActivite();
				setSecteurActivites(response.secteursActivite);

				if (response.message) {
					toast({
						title: "Information",
						description: response.message,
					});
				}
			} catch (error) {
				console.error("Erreur lors du fetch des secteurs:", error);
				toast({
					title: "Erreur",
					description: "Impossible de charger les secteurs d'activité",
				});
			} finally {
				setIsLoadingSecteurActivite(false);
			}
		};

		fetchSecteurActivite().catch(console.error);
	}, []);

	const onSubmit = async (data: SignupThirdStepEmployeurSchema) => {
		if (!formData.secondStepData) {
			toast({
				title: "Erreur",
				description: "Données du formulaire incomplètes"
			});
			return;
		}

		try {
			setIsSubmitting(true);

			// Mise à jour du context avec les nouvelles données
			const updatedFormData = {
				...formData,
				thirdStepData: data
			};
			updateFormData(updatedFormData);

			// Appel à l'API d'inscription
			await signup(updatedFormData);

			toast({
				title: "Succès",
				description: "Votre compte entreprise a été créé avec succès",
			});

			setCurrentStep("successStep");
			// Transformation en un objet unique contenant tous les champs
			const flatUserData = {
				...updatedFormData.firstStepData,
				...updatedFormData.secondStepData,
				...updatedFormData.thirdStepData,
			};

			// Sauvegarde dans le local storage
			localStorage.setItem("userData", JSON.stringify(flatUserData));
			if (updatedFormData.secondStepData?.prenom !== undefined) {
				setUserData({prenom: updatedFormData.secondStepData?.prenom});
			}
		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (

		<>
			<SignupHeader
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
							name="employeesCount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de collaborateurs (facultatif)</FormLabel>
									<FormControl>
										<Input type="number" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="logo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Logo de l'entreprise (facultatif)</FormLabel>
									<FormControl>
										<FileUploader
											accept="image/*"
											maxSize={5 * 1024 * 1024}
											onFileSelect={field.onChange}
										>
											<Button type="button" variant="gradient" className="rounded-full">
												Choisir une photo
											</Button>
										</FileUploader>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<SignupNavigationButtons
						onBack={() => setCurrentStep('secondStep')}
						isSubmit={true}
						isLoading={isSubmitting}
						nextLabel={isSubmitting ? "Création en cours..." : "Créer mon compte entreprise"}
					/>
				</form>
			</Form>
		</>
	);
};