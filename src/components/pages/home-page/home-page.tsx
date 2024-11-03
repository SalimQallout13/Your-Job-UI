import Navbar from "@/components/pages/home-page/sections/navbar.tsx"
import Hero from "./sections/hero"
import Emplois from "@/components/pages/home-page/sections/emplois.tsx"
import CvAndAvis from "./sections/cv-and-avis"

const HomePage = () => {
	return (
		<div>
			<Navbar/>
			<Hero/>
			<Emplois/>
			<CvAndAvis/>
		</div>
	)
}

export default HomePage