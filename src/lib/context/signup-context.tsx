import React, { createContext, useContext, useState } from "react"
import {
	SignupThirdStepEmployeurSchema,
	SignupThirdStepCandidateSchema,
	SignupSecondStepSchema
} from "../schemas-validation-form/signupValidation"
import { Roles } from "@/lib/enums/Roles.ts"

export type SignupStep = "firstStep" | "secondStep" | "thirdStep" | "successStep";

export interface SignupFormData {
	firstStepData?: {
		userRole: Roles;
	};
	secondStepData?: SignupSecondStepSchema;
	thirdStepData?: SignupThirdStepCandidateSchema | SignupThirdStepEmployeurSchema;
}

interface SignupPageContextType {
	userRole: Roles;
	currentStep: SignupStep;
	formData: SignupFormData;
	setUserRole: (type: Roles) => void;
	setCurrentStep: (step: SignupStep) => void;
	updateFormData: (data: Partial<SignupFormData>) => void;
	resetForm: () => void;
}

const SignupPageContext = createContext<SignupPageContextType | undefined>(undefined)

export const SignupPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userRole, setUserRole] = useState<Roles>(Roles.Candidat)
	const [currentStep, setCurrentStep] = useState<SignupStep>("firstStep")
	const [formData, setFormData] = useState<SignupFormData>({})

	const updateFormData = (data: Partial<SignupFormData>) => {
		setFormData(prev => ({ ...prev, ...data }))
	}

	const resetForm = () => {
		setUserRole(Roles.Candidat)
		setCurrentStep("firstStep")
		setFormData({})
	}

	return (
		<SignupPageContext.Provider
			value={{
				userRole,
				currentStep,
				formData,
				setUserRole,
				setCurrentStep,
				updateFormData,
				resetForm
			}}
		>
			{children}
		</SignupPageContext.Provider>
	)
}

export const useSignupPageContext = () => {
	const context = useContext(SignupPageContext)
	if (context === undefined) {
		throw new Error("useSignup must be used within a SignupPageProvider")
	}
	return context
}
