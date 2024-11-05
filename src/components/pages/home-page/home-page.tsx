import Navbar from "@/components/pages/home-page/sections/navbar.tsx"
import Hero from "./sections/hero"
import Emplois from "@/components/pages/home-page/sections/emplois.tsx"
import CvAndAvis from "./sections/cv-and-avis"
import EmailAlerts from "./sections/email-alerts"
import Footer from "@/components/pages/home-page/sections/footer.tsx"
import LoginPage from "@/components/pages/login-page/login-page.tsx"
import { useState } from "react"

const HomePage = () => {

	const [isOpen, setIsOpen] = useState(false)

	// Fonction pour ouvrir le modal
	const openDialog = () => setIsOpen(true)

	return (
		<div>
			<LoginPage isOpen={isOpen} setIsOpen={setIsOpen}/>
			<Navbar openDialog={openDialog}/>
			<Hero/>
			<Emplois openDialog={openDialog}/>
			<CvAndAvis openDialog={openDialog}/>
			<EmailAlerts/>
			<Footer openDialog={openDialog}/>
		</div>
	)
}

export default HomePage