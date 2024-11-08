import {useRoutes} from "react-router-dom";
import {TailwindIndicator} from "@/components/commons/others/tailwind-indicator.tsx";
import {useDisableIosTextFieldZoom} from "@/lib/hooks/use-disable-ios-text-field-zoom.ts"; // Import du nouveau hook
import NotFoundPage from "@/components/pages/not-found-page/not-found-page.tsx"
import {Toaster} from "@/components/commons/ui/toaster.tsx"
import 'typeface-inter';
import React from "react";
import HomePage from "@/components/pages/home-page/home-page.tsx"

const routes = [
    {path: "/", element: <HomePage/>},
    {path: "*", element: <NotFoundPage/>},
];

function App() {
    const children = useRoutes(routes);

    // Use the hook to disable the zoom on iOS, when clicking on an input field
    useDisableIosTextFieldZoom();

    return (
        <React.Fragment>
            <div>
                <div className={"w-full"}>{children}</div>
            </div>
            {import.meta.env.DEV && <TailwindIndicator/>}
            <Toaster/>
        </React.Fragment>
    );
}

export default App;
