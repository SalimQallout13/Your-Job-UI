import { SignupFormData, useSignupPageContext } from "@/lib/context/signup-context.tsx"
import { useForm } from "react-hook-form"
import { signupThirdStepCandidateSchema, SignupThirdStepCandidateSchema } from "@/lib/schemas-validation-form/signupValidation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import DocumentUploader from "@/components/others/document-uploader.tsx"
import { SignupHeader } from "@/components/pages/signup-page/commons/signup-header.tsx"
import { FileUploader } from "@/components/ui/file-uploader.tsx"
import { SignupNavigationButtons } from "@/components/pages/signup-page/commons/signup-navigation-buttons.tsx"
import { toast } from "@/lib/hooks/use-toast.tsx"
import { signup } from "@/api/signup-api.ts"
import { useState } from "react"

export const SignupThirdSTepCandidate = ({ updateFormData }: { updateFormData: (data: Partial<SignupFormData>) => void }) => {
	const { setCurrentStep, formData } = useSignupPageContext();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<SignupThirdStepCandidateSchema>({
		resolver: zodResolver(signupThirdStepCandidateSchema),
		defaultValues: {
			currentPoste: "",
			ville: "",
			codePostal: "",
			adresse: "",
			photo: undefined,
			cv: undefined,
			motivationLetter: undefined
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
										<FileUploader
											accept="image/*"
											maxSize={5 * 1024 * 1024}
											onFileSelect={field.onChange}  // Passer directement field.onChange
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
										<DocumentUploader
											accept="application/pdf"
											maxSize={10 * 1024 * 1024}
											onFileSelect={(file) => {
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
							name="motivationLetter"
							render={({ field }) => (
								<FormItem className="space-y-4">
									<FormLabel>Lettre de motivation</FormLabel>
									<FormControl>
										<DocumentUploader
											accept="application/pdf"
											maxSize={10 * 1024 * 1024}
											onFileSelect={(file) => {
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
