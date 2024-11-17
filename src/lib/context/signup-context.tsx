import React, { createContext, useContext, useState } from 'react';
import { profileSchema } from '../schemas-validation-form/signupValidation';
import { z } from "zod"

export type UserType = 'candidate' | 'employer' | null;
export type SignupStep = 1 | 2 | 3 | 4;

interface SignupSchema {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface EmployerProfileSchema {
	companyName: string;
	contactName: string;
	contactPosition: string;
	companyAddress: string;
	sector: string;
	employeesCount?: string; // Rendre optionnel
	logo?: File | null; // Rendre optionnel
}

// Supprimer l'interface ProfileSchema et utiliser le type inféré par Zod
type ProfileSchema = z.infer<typeof profileSchema>;

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
	const [userType, setUserType] = useState<UserType>("employer");
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
