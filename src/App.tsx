import {useRoutes} from "react-router-dom";
import {TailwindIndicator} from "@/components/commons/others/tailwind-indicator.tsx";
import {useDisableIosTextFieldZoom} from "@/lib/hooks/use-disable-ios-text-field-zoom.ts"; // Import du nouveau hook
import LoginPage from "@/components/pages/login-page/login-page.tsx";
import {ROUTES} from "@/lib/configs/routes.ts"
import NotFoundPage from "@/components/pages/not-found-page/not-found-page.tsx"
import {Toaster} from "@/components/commons/ui/toaster.tsx"
import {Dashboard} from "@/components/pages/dashboard/dashboard.tsx"
import 'typeface-inter';
import React from "react";

const routes = [
    {path: ROUTES.LOGIN, element: <LoginPage/>},
    {path: "/*", element: <Dashboard/>},
    {path: "*", element: <NotFoundPage/>},
    {path: "/", element: <LoginPage/>},
];

function App() {
    const children = useRoutes(routes);

    // Use the hook to disable the zoom on iOS, when clicking on an input field
    useDisableIosTextFieldZoom();

    return (
        <React.Fragment>
            <div className="relative flex min-h-screen">
                <div className={"w-full"}>{children}</div>
            </div>
            {import.meta.env.DEV && <TailwindIndicator/>}
            <Toaster/>
        </React.Fragment>
    );
}

export default App;
