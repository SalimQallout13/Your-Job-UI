import Navbar from "@/components/pages/home-page/sections/navbar.tsx"
import Hero from "./sections/hero"
import Emplois from "@/components/pages/home-page/sections/emplois.tsx"
import CvAndAvis from "./sections/cv-and-avis"
import EmailAlerts from "./sections/email-alerts"
import Footer from "@/components/pages/home-page/sections/footer.tsx"

const HomePage = () => {
	return (
		<div>
			<Navbar/>
			<Hero/>
			<Emplois/>
			<CvAndAvis/>
			<EmailAlerts/>
			<Footer/>
		</div>
	)
}

export default HomePage