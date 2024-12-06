import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import EmploiSectionImg from "@/assets/img/emploi-section.png";
import TriIcon from "@/assets/icons/tri-icon.png";
import CocaColaLogo from "@/assets/img/cocacola.png";
import LevuppLogo from "@/assets/img/levup.png";
import PernodRicardLogo from "@/assets/img/pernod-ricard.png";
import { Icons } from "@/components/ui/icons.tsx";
import { useLocalStorage } from 'usehooks-ts';
import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/configs/routes.ts"

type EmploisProps = {
	openLoginDialog: () => void
}

const Emplois:React.FC<EmploisProps> = ({openLoginDialog}) => {
	const [userData] = useLocalStorage<{ name: string } | null>('userData', null);

	return (
		<div className="bg-emplois-section">
			<div className="mx-auto max-w-5xl px-4">
				{/* Monde entier Section */}
				<div className="py-16">
					<div className="flex flex-col items-start justify-between gap-14 lg:flex-row">
						<div className="w-full lg:w-1/2">
							<img
								src={EmploiSectionImg}
								alt="Person celebrating success"
								className="w-full rounded-3xl object-cover"
							/>
						</div>
						<div className="mt-5 w-full space-y-8 text-center md:text-left lg:w-1/2">
							<div className="inline-flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-white">
								<Icons.dream className="size-4" />
								<span className="text-sm">Croire en ses rêves</span>
							</div>

							<h1 className="text-3xl font-semibold leading-none md:text-5xl">
								Trouvez des emplois dans le{" "}
								<span className="text-purple-highlight">Monde entier</span>
							</h1>

							<p className="text-body-dark">
								Recherchez et entrez en contact avec des offres d'emploi dans le monde entier.
								Cela vous donne la possibilité de trouver le métier de vos rêves.
							</p>

							{!userData ? (
								<div className="flex flex-wrap gap-4">
									<Button variant="outline" onClick={openLoginDialog} className="rounded-full px-8 py-4">
										Connexion
									</Button>
									<Link to={ROUTES.SIGNUP_PATH}>
										<Button variant="gradient2" className="rounded-full px-8 py-4">
											Créer mon compte
										</Button>
									</Link>
								</div>
							) : (
								<div className="flex flex-wrap justify-center gap-4 md:justify-start">
									<Button variant="gradient2" className="rounded-full px-8 py-4">
										Trouver des emplois
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Jobs Section */}
				<div className="py-16">
					<div className="mb-8 flex flex-col items-center space-y-6">
						<div className="inline-flex items-center space-x-2 rounded-full bg-black px-6 py-3">
							<img src={TriIcon} alt="Triangle Icon" className="size-5" />
							<span className="text-sm text-white">Emplois sélectionnés par catégories</span>
						</div>
						<h2 className="text-center text-3xl font-bold md:text-5xl">
							<span className="text-purple-highlight">Des entreprises</span> Pour Vous
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{jobs.map((job, index) => (
							<Card key={index} className="rounded-2xl border-none bg-gray-100 shadow-sm">
								<CardContent className="p-6">
									<div className="flex items-center">
										<img
											src={job.logo}
											alt={`${job.company} logo`}
											className={`${job.logoSize} rounded-xl object-contain`}
										/>
										<div className="ml-4 grow">
											<h3 className={`text-xl font-semibold ${job.titleColor}`}>{job.title}</h3>
											<p className="font-medium text-gray-900">{job.company}</p>
											<p className="text-sm text-gray-500">{job.location}</p>
										</div>
									</div>

									<ul className="mt-6 space-y-2">
										{job.bulletPoints.map((point, idx) => (
											<li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
												<span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-gray-600" />
												<span>{point}</span>
											</li>
										))}
									</ul>

									<div className="mt-6 flex justify-end">
										<Button variant="default" className="rounded-full bg-black px-6 py-2 text-sm font-medium hover:bg-gray-800">
											{job.type}
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Emplois;


const jobs = [
	{
		logo: CocaColaLogo,
		logoSize: "h-14 w-14",
		title: "VP, Sales",
		company: "Coca-Cola Company",
		location: "New-York, USA",
		bulletPoints: [
			"Excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
			"Mmodo fugiat eu irure eu officia.",
		],
		type: "Full time",
		titleColor: "text-purple-highlight",
	},
	{
		logo: PernodRicardLogo,
		logoSize: "h-16 w-16",
		title: "VP, Sales",
		company: "Pernod Ricard",
		location: "Paris, France",
		bulletPoints: [
			"Excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
			"Mmodo fugiat eu irure eu officia.",
		],
		type: "Full time",
		titleColor: "text-purple-highlight",
	},
	{
		logo: LevuppLogo,
		logoSize: "h-12 w-12",
		title: "Product Manager",
		company: "Levupp",
		location: "Marseille, France",
		bulletPoints: [
			"Excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
			"Mmodo fugiat eu irure eu officia.",
		],
		type: "Full time",
		titleColor: "text-purple-highlight",
	},
];
