import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ROUTES} from "@/lib/configs/routes.ts";

export const useMainHooks = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const startSubmitting = () => setIsSubmitting(true);
    const stopSubmitting = () => setIsSubmitting(false);
    const redirectToHome = () => navigate(ROUTES.HOME_PATH);
    const displayErrorMessage = (error: string) => {
        setErrorMessage(error);
        clearErrorMessageAfterDelay();
    };

    const clearErrorMessageAfterDelay = () => {
        setTimeout(() => setErrorMessage(null), 5000);
    };

    return {
        isSubmitting,
        errorMessage,
        startSubmitting,
        stopSubmitting,
        redirectToHome,
        displayErrorMessage,
    };
};
