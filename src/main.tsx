import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css"
import "./styles/spinner-page-load.css"

import { BrowserRouter as Router } from "react-router-dom"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { ToastProvider } from "@/components/ui/toast.tsx"
import { DashboardErrorProvider } from "./lib/context/dashboard-error-context.tsx"
import { NavigationProvider } from "@/lib/context/navigation-context.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<DashboardErrorProvider>
				<TooltipProvider>
					<ToastProvider>
						<NavigationProvider>
							<App />
						</NavigationProvider>
					</ToastProvider>
				</TooltipProvider>
			</DashboardErrorProvider>
		</Router>
	</React.StrictMode>
)
