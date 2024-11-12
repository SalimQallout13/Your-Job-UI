import Navbar from "@/components/pages/home-page/sections/navbar.tsx"
import Hero from "./sections/hero"
import Emplois from "@/components/pages/home-page/sections/emplois.tsx"
import CvAndAvis from "./sections/cv-and-avis"
import EmailAlerts from "./sections/email-alerts"
import Footer from "@/components/pages/home-page/sections/footer.tsx"
import { useState } from "react"

const HomePage = () => {

	const [isOpen, setIsOpen] = useState(false)

	// Fonction pour ouvrir le modal
	const openLoginDialog = () => setIsOpen(true)

	return (
		<div>
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} openLoginDialog={openLoginDialog}/>
			<Hero/>
			<Emplois openLoginDialog={openLoginDialog}/>
			<CvAndAvis openLoginDialog={openLoginDialog}/>
			<EmailAlerts/>
			<Footer openLoginDialog={openLoginDialog}/>
		</div>
	)
}

export default HomePage