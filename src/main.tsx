import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css"
import "./styles/spinner-page-load.css"

import { BrowserRouter as Router } from "react-router-dom"
import { TooltipProvider } from "./components/commons/ui/tooltip.tsx"
import { ToastProvider } from "@/components/commons/ui/toast.tsx"
import { DashboardErrorProvider } from "./lib/context/dashboard-error-context.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <DashboardErrorProvider>
        <TooltipProvider>
          <ToastProvider>
              <App />
            </ToastProvider>
          </TooltipProvider>
        </DashboardErrorProvider>
    </Router>
  </React.StrictMode>
)
