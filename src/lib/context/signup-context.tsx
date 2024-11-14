// lib/context/signup-context.tsx
import React, { createContext, useContext, useState } from 'react';
import { SignupSchema } from "@/lib/schemas-validation-form/signupValidation";
import { ProfileSchema } from "@/lib/schemas-validation-form/profileValidation";

export type UserType = 'candidate' | 'employer' | null;
export type SignupStep = 1 | 2 | 3;

interface FormData {
	userDetails?: SignupSchema;
	profile?: ProfileSchema;
}

interface SignupContextType {
	userType: UserType;
	currentStep: SignupStep;
	formData: FormData;
	setUserType: (type: UserType) => void;
	setCurrentStep: (step: SignupStep) => void;
	updateFormData: (data: Partial<FormData>) => void;
	resetForm: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userType, setUserType] = useState<UserType>(null);
	const [currentStep, setCurrentStep] = useState<SignupStep>(1);
	const [formData, setFormData] = useState<FormData>({});

	const updateFormData = (data: Partial<FormData>) => {
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