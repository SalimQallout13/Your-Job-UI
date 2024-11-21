import React, { useState } from "react"

type SigninContextType = {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	openLoginDialog: () => void
	closeLoginDialog: () => void
}

const SigninPageContext = React.createContext<SigninContextType | undefined>(undefined)

export const SigninPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	// Fonction pour ouvrir le modal
	const openLoginDialog = () => setIsOpen(true)

	const closeLoginDialog = () => setIsOpen(false)

	return (
		<SigninPageContext.Provider value={{ isOpen, setIsOpen, openLoginDialog, closeLoginDialog }}>{children}</SigninPageContext.Provider>
	)
}

export const useSigninContext = () => {
	const context = React.useContext(SigninPageContext)
	if (context === undefined) {
		throw new Error("useSigninContext must be used within a SigninProvider")
	}
	return context
}