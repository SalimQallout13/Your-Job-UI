// use-login-form.ts
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, loginSchema} from '@/lib/schemas-validation-form/loginValidation.ts';
import {IConnectionApi} from "@/lib/interfaces/IConnectionApi.ts"
import {UserSignInResponse} from "@/lib/types/api/responses/UserSignInResponse.ts"
import {UserSignInRequest} from "@/lib/types/api/requests/UserSignInRequest.ts"
import {useNavigationContext} from "@/lib/context/navigation-context.tsx";

export const useLoginForm = (connectionApi: IConnectionApi) => {
    const {
        isSubmitting,
        errorMessage,
        startSubmitting,
        stopSubmitting,
        displayErrorMessage,
    } = useNavigationContext();

    const loginFormSchema = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const storeUserInLocalStorage = (user: UserSignInResponse) => {
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('justLoggedIn', 'true');
    };

    const handleFormSubmit = async ({email, password}: UserSignInRequest) => {
        startSubmitting();
        const response = await connectionApi.login({email, password});
        stopSubmitting();

        if (response.status === 'success') {
            storeUserInLocalStorage(response.data);
            location.reload();
        } else if (response.status === 'error') {
            displayErrorMessage(response.error);
        }
    };

    const submitLoginForm = (data: LoginSchema) => {
        handleFormSubmit(data).catch(console.error);
    };

    return {
        loginFormSchema,
        isSubmitting,
        errorMessage,
        submitLoginForm,
    };
};
