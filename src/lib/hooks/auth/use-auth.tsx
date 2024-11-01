import {useNavigate} from 'react-router-dom';
import {useToast} from "@/lib/hooks/use-toast.tsx";
import React, {useEffect, useCallback} from 'react';
import {ReloadIcon} from "@radix-ui/react-icons";
import {BadgeAlert, BadgeCheck} from "lucide-react";
import {axiosInstance} from '@/api/axios-instance';
import {ROUTES} from "@/lib/configs/routes.ts"
import {ROUTES_BACK} from "@/lib/configs/routes-back.ts"

interface ToastProps {
    title: string;
    description: React.ReactNode;
    duration: number;
}

interface ErrorResponse {
    response?: {
        status: number;
    };
    config: {
        url?: string;
    };
}

const showErrorToast = (toast: (props: ToastProps) => void): void => {
    toast({
        title: "Erreur",
        description: (
            <div className="flex">
                <BadgeAlert className="mr-2 size-4 text-red-600"/>
                Une erreur est survenue
            </div>
        ),
        duration: 2000,
    });
};

const showInitialLogoutToast = (toast: (props: ToastProps) => void): void => {
    toast({
        title: "Déconnexion",
        description: (
            <div className="flex">
                <ReloadIcon className="mr-2 size-4 animate-spin"/>
                Déconnexion en cours
            </div>
        ),
        duration: 2000,
    });
};

const showFinalLogoutToast = (toast: (props: ToastProps) => void): void => {
    toast({
        title: "Déconnexion",
        description: (
            <div className="flex">
                <BadgeCheck className="mr-2 size-4 text-green-600"/>
                Déconnexion réussie
            </div>
        ),
        duration: 2000,
    });
};

const handleLogout = (toast: (props: ToastProps) => void, navigate: (path: string) => void): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('justLoggedIn');
    setTimeout(() => {
        showInitialLogoutToast(toast);
    }, 2000);

    setTimeout(() => {
        showFinalLogoutToast(toast);
    }, 2900);

    setTimeout(() => {
        navigate(ROUTES.LOGIN);
    }, 3000);
};

const handle401Error = (error: ErrorResponse, handleLogout: () => void): Promise<never> => {
    if (error.response?.status === 401 && !error.config.url?.includes(ROUTES_BACK.SIGNIN)) {
        handleLogout();
    }
    return Promise.reject(error);
};

export const useAuth = (): null => {
    const navigate = useNavigate();
    const {toast} = useToast();

    const logout = useCallback(() => {
        handleLogout(toast, navigate);
    }, [toast, navigate]);

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401 && !error.config.url?.includes(ROUTES_BACK.SIGNIN) && error.response?.message == "Logout") {
                    showErrorToast(toast);
                    handle401Error(error as ErrorResponse, logout).catch();
                    return Promise.reject(error);
                } else {
                    return Promise.reject(error);
                }
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logout]);

    return null;
};
