import { Button } from "@/components/commons/ui/button.jsx";
import heroImage from "@/assets/img/hero-image.png";
import SearchIcon from "@/assets/icons/search-icon.png";
import TriIcon from "@/assets/icons/tri-icon.png";
import { MapPin } from "lucide-react";
import { Icons } from "@/components/commons/others/icons.jsx";

const Hero = () => {
	return (
		<section className="relative bg-white pb-24">
			{/* Partie supérieure */}
			<div className="bg-hero-section pb-72">
				<div className="container mx-auto flex flex-col items-center space-y-6 pt-2 text-center">
					{/* Barre de recherche */}
					<div className="flex w-full max-w-lg items-center rounded-full bg-white p-1 shadow-md">
						<img src={SearchIcon} alt="Search Icon" className="ml-4 mr-2 size-7" />
						<input
							type="text"
							placeholder="Rechercher"
							className="text-black-primary flex-1 bg-transparent outline-none"
						/>
						<Button variant="gradient2" size="lg" className="rounded-full px-6 text-white">
							Trouve ton job
						</Button>
					</div>

					{/* Titre principal */}
					<h1 className="mt-12 text-7xl font-bold text-white">Recherchez, Trouvez & Postulez</h1>

					{/* Description */}
					<p className="text-body-gray max-w-2xl">
						Des milliers d'opportunités vous attendent ! Trouvez l'emploi de vos rêves, où que vous
						soyez, et à tout moment avec YourJob.
					</p>
				</div>
			</div>

			{/* Image superposée */}
			<div className="relative z-10 -mt-60 flex flex-col items-center">
				<div className="w-full max-w-5xl">
					<img
						src={heroImage}
						alt="Hero image"
						className="w-full rounded-lg object-cover shadow-lg"
					/>
				</div>

				{/* Barre de localisation */}
				<div className="absolute bottom-0 left-1/2 w-[85%] max-w-xl -translate-x-1/2 translate-y-1/2 rounded-2xl bg-white px-4 py-6 shadow-lg">
					<div className="flex items-center justify-around text-slate-600">
						{["Marseille", "Paris", "New-York"].map((city) => (
							<div key={city} className="flex items-center space-x-2">
								<MapPin className="h-6 w-5 text-slate-400" />
								<span>{city}</span>
							</div>
						))}
						<Button variant="gradient2" size="sm" className="rounded-full px-6 text-white">
							Trouve ton job
						</Button>
					</div>
				</div>
			</div>

			{/* Section catégories */}
			<div className="container mx-auto mt-24 text-center">
				<div className="w-full pt-3">
					<div className="bg-black-solid m-auto mb-6 flex w-fit items-center space-x-2 rounded-full px-4 py-1">
						<img src={TriIcon} alt="Triangle Icon" className="size-6" />
						<span className="text-sm text-white">Emplois sélectionnés par catégories</span>
					</div>

					<h2 className="text-black-primary h2 mb-12 font-bold">
						Trouve ton job par <span className="text-purple-highlight">Catégories</span>
					</h2>

					{/* Cartes de catégories */}
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{categories.map((category, index) => (
							<div
								key={index}
								className={`${category.bgColor} ${category.textColor} h-[180px] cursor-pointer rounded-xl p-6`}
							>
								<div className="mb-4">{category.icon}</div>
								<div className="text-left">
									<h3 className="mb-2 max-w-[136px] font-semibold">{category.title}</h3>
									<p className="text-sm opacity-75">{category.jobs}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

const categories = [
	{
		icon: <Icons.market className="size-7" />,
		title: "Marketing & Communication",
		jobs: "1058 Jobs Disponibles",
		bgColor: "bg-purple",
		textColor: "text-white",
	},
	{
		icon: <Icons.develop className="size-7" />,
		title: "Développement & Ingénierie",
		jobs: "1042 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.design className="size-7" />,
		title: "Design & Création",
		jobs: "2347 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.gestion className="size-7" />,
		title: "Gestion de projet",
		jobs: "231 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.vente className="size-7" />,
		title: "Vente / Business Développement",
		jobs: "7245 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.serviceClient className="size-7" />,
		title: "Support & Service clients",
		jobs: "209 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.finance className="size-7" />,
		title: "Finance & Comptabilité",
		jobs: "364 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
	{
		icon: <Icons.rh className="size-7" />,
		title: "Ressources humaines",
		jobs: "1069 Jobs Disponibles",
		bgColor: "bg-gray-100",
		textColor: "text-gray-900",
	},
];
