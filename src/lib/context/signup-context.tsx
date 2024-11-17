import React, { createContext, useContext, useState } from 'react';
import { SignupThirdStepEmployeurSchema, SignupThirdStepCandidateSchema, SignupSecondStepSchema } from "../schemas-validation-form/signupValidation"

export type UserType = 'candidate' | 'employer' | null;
export type SignupStep = 'firstStep' | 'secondStep' | 'thirdStep' | 'successStep';

export interface SignupFormData {
	userType?: UserType;
	secondStepData?: SignupSecondStepSchema;
	thirdStepData?: SignupThirdStepCandidateSchema | SignupThirdStepEmployeurSchema;
}

interface SignupPageContextType {
	userType: UserType;
	currentStep: SignupStep;
	formData: SignupFormData;
	setUserType: (type: UserType) => void;
	setCurrentStep: (step: SignupStep) => void;
	updateFormData: (data: Partial<SignupFormData>) => void;
	resetForm: () => void;
}

const SignupPageContext = createContext<SignupPageContextType | undefined>(undefined);

export const SignupPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userType, setUserType] = useState<UserType>("candidate");
	const [currentStep, setCurrentStep] = useState<SignupStep>("firstStep");
	const [formData, setFormData] = useState<SignupFormData>({});

	const updateFormData = (data: Partial<SignupFormData>) => {
		setFormData(prev => ({ ...prev, ...data }));
	};

	const resetForm = () => {
		setUserType(null);
		setCurrentStep("firstStep");
		setFormData({});
	};

	return (
		<SignupPageContext.Provider
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
		</SignupPageContext.Provider>
	);
};

export const useSignupPageContext = () => {
	const context = useContext(SignupPageContext);
	if (context === undefined) {
		throw new Error('useSignup must be used within a SignupPageProvider');
	}
	return context;
};
