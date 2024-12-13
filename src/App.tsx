import {useRoutes} from "react-router-dom"
import {TailwindIndicator} from "@/components/others/tailwind-indicator.tsx"
import {useDisableIosTextFieldZoom} from "@/lib/hooks/use-disable-ios-text-field-zoom.ts" // Import du nouveau hook
import NotFoundPage from "@/app/not-found-page/not-found-page.tsx"
import {Toaster} from "@/components/ui/toaster.tsx"
import "typeface-inter"
import React from "react"
import HomePage from "@/app/home-page/home-page.tsx"
import ProfilePage from "@/app/profile/profile-page.tsx"
import SignUpPage from "@/app/signup-page/sign-up-page"
import "@/lib/schemas-validation-form/zodConfig";
import OffersPage from "@/app/offers/offers-page.tsx";

const routes = [
    {path: "/offres", element: <OffersPage/>},
    {path: "/profil", element: <ProfilePage/>},
    {path: "/signup", element: <SignUpPage/>},
    {path: "/", element: <HomePage/>},
    {path: "*", element: <NotFoundPage/>}
]

function App() {
    const children = useRoutes(routes)

    // Use the hook to disable the zoom on iOS, when clicking on an input field
    useDisableIosTextFieldZoom()

    return (
        <React.Fragment>
            <div>
                <div className={"w-full"}>{children}</div>
            </div>
            {import.meta.env.DEV && <TailwindIndicator/>}
            <Toaster/>
        </React.Fragment>
    )
}

export default App
