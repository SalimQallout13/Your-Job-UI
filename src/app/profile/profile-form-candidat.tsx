import React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Message} from "@/components/ui/alert.tsx"
import Dropzone from "@/components/ui/dropzone.tsx"
import {useProfileFormCandidat} from "@/lib/hooks/profile/use-profile-form-candidat.ts"
import Title from "@/components/ui/title.tsx";

const ProfileFormCandidat: React.FC = () => {

    const {
        profileFormSecondSchema,
        isSubmitting,
        errorMessage,
        submitProfileFormSecond,
        isLoading
    } = useProfileFormCandidat()


    if (isLoading) {
        // Affichez un indicateur de chargement tant que les valeurs par défaut ne sont pas prêtes
        return <div>Chargement...</div>
    }

    return (
        <>
            <Form {...profileFormSecondSchema}>
                {errorMessage && <Message message={errorMessage} type={"alert"}/>}
                <form>
                    <Title className="mb-7">Informations professionnelles</Title>
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
                    <div className="p-6">

                        <div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={profileFormSecondSchema.control}
                                name="currentPoste"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Poste actuel (facultatif)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Graphic Designer" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileFormSecondSchema.control}
                                name="ville"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Ville</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Marseille" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileFormSecondSchema.control}
                                name="codePostal"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Code postal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="13001" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileFormSecondSchema.control}
                                name="adresse"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Adresse</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12 rue de Jouy" className="h-12" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileFormSecondSchema.control}
                                name="cv"
                                render={({field}) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel>CV</FormLabel>
                                        <FormControl>
                                            <Dropzone
                                                accept="application/pdf"
                                                maxSize={10 * 1024 * 1024}
                                                defaultFile={field.value}
                                                onFileChange={(file) => {
                                                    field.onChange(file)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileFormSecondSchema.control}
                                name="lettreMotivation"
                                render={({field}) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel>Lettre de motivation</FormLabel>
                                        <FormControl>
                                            <Dropzone
                                                accept="application/pdf"
                                                maxSize={10 * 1024 * 1024}
                                                defaultFile={field.value}
                                                onFileChange={(file) => {
                                                    field.onChange(file)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
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

export default ProfileFormCandidat
