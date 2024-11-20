import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupThirdStepCandidateSchema, SignupThirdStepCandidateSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SignupHeader } from "@/components/pages/signup-page/commons/signup-header.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { signup } from "@/api/signup-api.ts"
import { useState } from "react"
import { useNavigationContext } from "@/lib/context/navigation-context.tsx"
import Dropzone from "@/components/others/dropzone.tsx"
import { ImageUploader } from "@/components/others/image-uploader.tsx"

export const SignupThirdSTepCandidate = ({ updateFormData }: { updateFormData: (data: Partial<SignupFormData>) => void }) => {
	const { setCurrentStep, formData } = useSignupPageContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { updateUserData } = useNavigationContext();

	const form = useForm<SignupThirdStepCandidateSchema>({
		resolver: zodResolver(signupThirdStepCandidateSchema),
		defaultValues: {
			currentPoste: "",
			ville: "",
			codePostal: "",
			adresse: "",
			photo: undefined,
			cv: undefined,
			lettreMotivation: undefined
		},
	});

	const onSubmit = async (data: SignupThirdStepCandidateSchema) => {
		if (!formData.secondStepData) {
			toast({
				title: "Erreur",
				description: "Données du formulaire incomplètes",
				variant: "destructive",
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
				description: "Votre compte a été créé avec succès",
			});

			setCurrentStep("successStep");
			// Transformation en un objet unique contenant tous les champs
			const flatUserData = {
				...updatedFormData.firstStepData,
				...updatedFormData.secondStepData,
				...updatedFormData.thirdStepData,
			};

			// Sauvegarde dans le local storage
			updateUserData(flatUserData)
			if (updatedFormData.secondStepData?.prenom !== undefined) {
				updateUserData({prenom: updatedFormData.secondStepData?.prenom});
			}

		} catch (error) {
			toast({
				title: "Erreur",
				description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<SignupHeader
				title="Créez votre profil et trouvez votre prochain défi professionnel."
				description="Renseignez ces informations pour compléter votre profil et accéder aux meilleures offres d'emploi."
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Champs spécifiques au candidat */}
					<div className="space-y-4">
						<FormField
							control={form.control}
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
							control={form.control}
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
							control={form.control}
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
						onBack={() => setCurrentStep('secondStep')}
						isSubmit={true}
						isLoading={isSubmitting}
						nextLabel="Créer mon compte candidat"
					/>
				</form>
			</Form>
		</>
	);
};
