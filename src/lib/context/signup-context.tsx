import React, { createContext, useContext, useState } from 'react';

export type UserType = 'candidate' | 'employer' | null;
export type SignupStep = 1 | 2 | 3;

interface SignupSchema {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface ProfileSchema {
	currentPosition?: string;
	ville: string;
	codePostal: string;
	adresse: string;
	photo?: File;
	cv: File;
	motivationLetter?: File;
}

interface EmployerProfileSchema {
	companyName: string;
	companyWebsite: string;
	// Ajoutez d'autres champs si nécessaire
}

export interface SignupFormData {
	userDetails?: SignupSchema;
	profile?: ProfileSchema | EmployerProfileSchema;
}

interface SignupContextType {
	userType: UserType;
	currentStep: SignupStep;
	formData: SignupFormData;
	setUserType: (type: UserType) => void;
	setCurrentStep: (step: SignupStep) => void;
	updateFormData: (data: Partial<SignupFormData>) => void;
	resetForm: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userType, setUserType] = useState<UserType>(null);
	const [currentStep, setCurrentStep] = useState<SignupStep>(1);
	const [formData, setFormData] = useState<SignupFormData>({});

	const updateFormData = (data: Partial<SignupFormData>) => {
		setFormData(prev => ({ ...prev, ...data }));
	};

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

export const useSignupContext = () => {
	const context = useContext(SignupContext);
	if (context === undefined) {
		throw new Error('useSignup must be used within a SignupProvider');
	}
	return context;
};
