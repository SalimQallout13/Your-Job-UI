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
import { getSectors } from "@/api/signup-api.ts"
import { toast } from "@/lib/hooks/use-toast.tsx"

interface Sector {
	id: string;
	name: string;
}

export const SignupThirdStepEmployeur = ({ updateFormData }: {
	updateFormData: (data: Partial<SignupFormData>) => void
}) => {
	const { setCurrentStep } = useSignupPageContext();
	const [sectors, setSectors] = useState<Sector[]>([]);
	const [isLoadingSectors, setIsLoadingSectors] = useState(false);

	const form = useForm<SignupThirdStepEmployeurSchema>({
		resolver: zodResolver(signupThirdStepEmployeur),
		defaultValues: {
			companyName: "",
			contactName: "",
			contactPosition: "",
			companyAddress: "",
			sector: "",
			employeesCount: "",
			logo: null,
		},
	});

	useEffect(() => {
		const fetchSectors = async () => {
			setIsLoadingSectors(true);
			try {
				const response = await getSectors();
				setSectors(response.sectors);
			} catch (error) {
				toast({
					title: "Erreur",
					description: error instanceof Error ? error.message : "Impossible de charger les secteurs d'activité",
					variant: "destructive",
				});
			} finally {
				setIsLoadingSectors(false);
			}
		};

		fetchSectors().catch();
	}, []);

	const onSubmit = (data: SignupThirdStepEmployeurSchema) => {
		updateFormData({ profile: data });
		setCurrentStep("successStep");
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
										<Input placeholder="Allan McArthur" className="h-12" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="contactPosition"
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
							name="companyAddress"
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
							control={form.control}
							name="sector"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secteur d'activité</FormLabel>
									<Select
										disabled={isLoadingSectors}
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger className="h-12">
												<SelectValue placeholder="Sélectionnez un secteur d'activité">
													{isLoadingSectors && (
														<div className="flex items-center gap-2">
															<div className="h-4 w-4 animate-spin rounded-full border-2 border-purple border-t-transparent" />
															<span>Chargement...</span>
														</div>
													)}
												</SelectValue>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sectors.map((sector) => (
												<SelectItem key={sector.id} value={sector.id}>
													{sector.name}
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
						nextLabel="Créer mon compte entreprise"
					/>
				</form>
			</Form>
		</>
	);
};