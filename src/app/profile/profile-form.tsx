import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useProfileForm} from "@/lib/hooks/profile/use-profile-form";
import {Message} from "@/components/ui/alert.tsx";
import {ImageUploader} from "@/components/ui/image-uploader.tsx";
import Title from "@/components/ui/title";

const ProfileForm: React.FC = () => {
    const {profileFormOneSchema, isSubmitting, isLoading, errorMessage, submitProfileFormOne} =
        useProfileForm();

    if (isLoading) {
        // Affichez un indicateur de chargement tant que les valeurs par défaut ne sont pas prêtes
        return <div>Chargement...</div>;
    }

    return (
        <Form {...profileFormOneSchema}>
            {errorMessage && <Message message={errorMessage} type={"alert"}/>}
            <form onSubmit={profileFormOneSchema.handleSubmit(submitProfileFormOne)}>
                <div className="mb-12">
                    <FormField
                        name="photo"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <ImageUploader
                                        accept="image/*"
                                        maxSizeInBytes={5 * 1024 * 1024}
                                        value={field.value} // Passez la valeur actuelle
                                        size="xl" // Taille extra large (200px)
                                        onImageChange={field.onChange} // Gère les modifications
                                        uploadButton={
                                            <Button type="button" variant="gradient" className="rounded-full">
                                                Choisir une photo
                                            </Button>
                                        }
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Title className="mb-7">Informations de contact</Title>
                <div className="p-6">
                    <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={profileFormOneSchema.control}
                            name="prenom"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Thomas" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileFormOneSchema.control}
                            name="nom"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Puget" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileFormOneSchema.control}
                            name="telephone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Numéro de téléphone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+33 6 66 41 62 67" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileFormOneSchema.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Adresse mail de contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tpuget@icloud.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormControl>
                        <Button type="submit" variant="gradient" disabled={isSubmitting}>
                            {isSubmitting ? "Enregistrement en cours..." : "Enregistrer"}
                        </Button>
                    </FormControl>
                </div>
            </form>
        </Form>
    );
};

export default ProfileForm;
