import React, {useState} from "react";
import {Input} from "@/components/commons/ui/input.tsx";
import {Button} from "@/components/commons/ui/button.tsx";
import {getDate} from "@/lib/utils/date.ts";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/commons/ui/form.tsx";
import {ConnectionApi} from "@/api/connection-api.ts";
import {useBulletinForm} from "@/lib/hooks/bulletin/use-bulletin-form.tsx";
import {FormProvider, useForm} from "react-hook-form"; // Ajout de FormProvider
import {Message} from "@/components/commons/ui/alert.tsx";
import {Select} from "@/components/commons/ui/select.tsx";

export const BulletinForm: React.FC = () => {
    // State pour la date et la sélection
    const [selectedDate, setSelectedDate] = useState(getDate());
    const [selectedOption, setSelectedOption] = useState('');

    // Options pour la liste déroulante
    const listEquipe = [
        {value: 0, label: 'Option 1'},
        {value: 1, label: 'Option 2'},
        {value: 2, label: 'Option 3'}
    ];

    const {bulletinFormSchema, isSubmitting, errorMessage, submitBulletinForm} = useBulletinForm(new ConnectionApi());
    const methods = useForm(); // Initialise le formulaire

    return (
        <FormProvider {...methods}> {/* Ajout du FormProvider */}
            <form className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2"
                  onSubmit={bulletinFormSchema.handleSubmit(submitBulletinForm)}>
                {errorMessage && <Message message={errorMessage} type={"alert"}/>}
                {/* Sélecteur de date */}
                <FormField
                    control={bulletinFormSchema.control}
                    name="date"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input autoComplete="date" type="date" {...field} value={selectedDate}
                                       className="justify-end"
                                       onChange={(e) => setSelectedDate(e.target.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Liste déroulante */}
                <FormField
                    control={bulletinFormSchema.control}
                    name="equipe"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Equipe</FormLabel>
                            <FormControl>
                                <Select options={listEquipe} {...field} value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Bouton Envoyer */}
                <FormControl className="flex justify-end">
                    <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                        {isSubmitting ? 'Création en cours...' : 'Créer'}
                    </Button>
                </FormControl>
            </form>
        </FormProvider>
    );
};
