import React, { createContext, useState, ReactNode, FC, useContext } from "react"

interface DashboardError {
	message: string;
	status: number;
}

interface DashboardErrorContextType {
	dashboardError: DashboardError | null;
	setDashboardError: React.Dispatch<React.SetStateAction<DashboardError | null>>;
}

// Crée le contexte avec une valeur par défaut
export const DashboardErrorContext = createContext<DashboardErrorContextType | undefined>(undefined);

// Définition du type pour les propriétés du fournisseur
interface DashboardErrorProviderProps {
	children: ReactNode;
}

// Fournisseur de contexte d'erreur du tableau de bord
export const DashboardErrorProvider: FC<DashboardErrorProviderProps> = ({ children }) => {
	const [dashboardError, setDashboardError] = useState<DashboardError | null>(null);

	return (
		<DashboardErrorContext.Provider value={{ dashboardError, setDashboardError }}>
			{children}
		</DashboardErrorContext.Provider>
	);
};

// Hook personnalisé pour utiliser le contexte d'erreur du tableau de bord
export const useDashboardErrorContext = () => {
	const context = useContext(DashboardErrorContext);
	if (context === undefined) {
		throw new Error('useDashboardErrorContext must be used within a DashboardErrorProvider');
	}
	return context;
};
