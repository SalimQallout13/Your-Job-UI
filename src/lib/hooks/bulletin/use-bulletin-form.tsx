import {IConnectionApi} from "@/lib/interfaces/IConnectionApi.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BulletinValidation, bulletinValidation} from "@/lib/schemas-validation-form/bulletinValidation.ts";
import {Bulletin} from "@/lib/class/Bulletin.ts";
import {showToast} from "@/lib/hooks/use-toast.tsx";
import {BadgeCheck} from "lucide-react";
import {useMainHooks} from "@/lib/hooks/main.tsx";
import {getDate} from "@/lib/utils/date.ts";

export const useBulletinForm = (connectionApi: IConnectionApi) => {
    const {
        isSubmitting,
        errorMessage,
        startSubmitting,
        stopSubmitting,
        displayErrorMessage,
    } = useMainHooks();

    const bulletinFormSchema = useForm<BulletinValidation>({
        resolver: zodResolver(bulletinValidation),
        defaultValues: {
            date: getDate(),
            equipe: 0,
        },
    });

    const handleFormSubmit = async (data: BulletinValidation) => {
        startSubmitting();

        const bulletin = new Bulletin(new Date(data.date), data.equipe);

        const response = await connectionApi.createBulletin(bulletin);
        stopSubmitting();

        console.log(response);
        if (response.status === 'success') {
            const createdBulletin = response.data; // Instance de Bulletin
            showToast('Bulletin', 'Création réussie', false, <BadgeCheck className="mr-2 size-4 text-green-600"/>);
            console.log('Bulletin créé :', createdBulletin); // Vous pouvez accéder aux méthodes de Bulletin ici
        } else if (response.status === 'error') {
            displayErrorMessage(response.error);
        }
    };


    const submitBulletinForm = (data: BulletinValidation) => {
        handleFormSubmit(data).catch(console.error);
    };

    return {
        bulletinFormSchema,
        isSubmitting,
        errorMessage,
        submitBulletinForm,
    };
}