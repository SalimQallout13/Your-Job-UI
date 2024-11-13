import React, { createContext, useContext, useState } from 'react';

// Définition des types pour le type d'utilisateur et l'étape du processus d'inscription
export type UserType = 'candidate' | 'employer' | null;
export type SignupStep = 1 | 2 | 3;

// Interface pour le contexte d'inscription, définissant les types de valeurs et méthodes
interface SignupContextType {
	userType: UserType;
	currentStep: SignupStep;
	formData: Record<string, any>;
	setUserType: (type: UserType) => void;
	setCurrentStep: (step: SignupStep) => void;
	updateFormData: (data: Record<string, any>) => void;
	resetForm: () => void;
}

// Création du contexte avec un type optionnel, initialisé à `undefined`
const SignupContext = createContext<SignupContextType | undefined>(undefined);

// Fournisseur du contexte pour encapsuler le processus d'inscription
export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// État pour stocker le type d'utilisateur (candidat ou employeur)
	const [userType, setUserType] = useState<UserType>(null);
	// État pour suivre l'étape actuelle du processus d'inscription
	const [currentStep, setCurrentStep] = useState<SignupStep>(1);
	// État pour stocker les données du formulaire d'inscription
	const [formData, setFormData] = useState<Record<string, any>>({});

	// Fonction pour mettre à jour les données du formulaire en fusionnant les nouvelles valeurs
	const updateFormData = (data: Record<string, any>) => {
		setFormData(prev => ({ ...prev, ...data }));
	};

	// Fonction pour réinitialiser le formulaire aux valeurs initiales
	const resetForm = () => {
		setUserType(null);
		setCurrentStep(1);
		setFormData({});
	};

	return (
		<SignupContext.Provider
			value={{
				userType,
				currentStep,
				formData,
				setUserType,
				setCurrentStep,
				updateFormData,
				resetForm,
			}}
		>
			{children}
		</SignupContext.Provider>
	);
};

// Hook personnalisé pour consommer le contexte d'inscription
export const useSignup = () => {
	const context = useContext(SignupContext);
	if (context === undefined) {
		throw new Error('useSignup must be used within a SignupProvider');
	}
	return context;
};
