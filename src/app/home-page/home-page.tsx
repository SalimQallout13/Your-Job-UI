import Navbar from "@/app/home-page/sections/navbar.tsx"
import Hero from "./sections/hero"
import Emplois from "@/app/home-page/sections/emplois.tsx"
import CvAndAvis from "./sections/cv-and-avis"
import EmailAlerts from "./sections/email-alerts"
import Footer from "@/app/home-page/sections/footer.tsx"
import { useSigninContext } from "@/lib/context/signin-context.tsx"

const HomePage = () => {

	const { isOpen, setIsOpen, openLoginDialog } = useSigninContext()

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