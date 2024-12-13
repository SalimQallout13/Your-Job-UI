import Navbar from "@/components/commons/navbar.tsx"
import {NavLink} from "react-router-dom"
import {useSigninContext} from "@/lib/context/signin-context.tsx"

const HeaderNav = () => {
    const {isOpen, setIsOpen, openLoginDialog} = useSigninContext()
    return (
        <>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} openLoginDialog={openLoginDialog}/>
            <nav className="flex space-x-8 bg-[#F2F2F2] ps-32 pt-4">
                <NavLink to="/dashboard"
                         className={({isActive}) => isActive ? "text-black font-semibold border-b-4 border-gray-800 pb-2.5" : "text-gray-500 hover:text-black"}>
                    Tableau de bord
                </NavLink>
                <NavLink to="/profil"
                         className={({isActive}) => isActive ? "text-black font-semibold border-b-4 border-gray-800 pb-2.5" : "text-gray-500 hover:text-black"}>
                    Mon profil
                </NavLink>
                <NavLink to="/offres"
                         className={({isActive}) => isActive ? "text-black font-semibold border-b-4 border-gray-800 pb-2.5" : "text-gray-500 hover:text-black"}>
                    Mes offres
                </NavLink>
            </nav>
        </>)
}

export default HeaderNav