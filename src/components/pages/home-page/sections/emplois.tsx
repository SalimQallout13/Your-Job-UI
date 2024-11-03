import { Star } from "lucide-react";
import { Button } from "@/components/commons/ui/button.tsx"
import { Card, CardContent } from "@/components/commons/ui/card.tsx"
import EmploiSection from "@/assets/img/emploi-section.png"
import TriIcon from "@/assets/img/tri-icon.png"
import CocaCola from "@/assets/img/cocacola.png"
import Levupp from "@/assets/img/levup.png"
import PernodRicard from "@/assets/img/pernod-ricard.png"

const Emplois = () => {
	const jobs = [
		{
			logo: CocaCola,
			logoSize: "size-14",
			title: "VP, Sales",
			company: "Coca-Cola Company",
			location: "New-York, USA",
			bulletPoints: [
				"excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
				"mmodo fugiat eu irure eu offici..."
			],
			type: "Full time",
			titleColor: "text-indigo-400"
		},
		{
			logo: PernodRicard,
			logoSize: "size-16",
			title: "VP, Sales",
			company: "Coca-Cola Company",
			location: "New-York, USA",
			bulletPoints: [
				"excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
				"mmodo fugiat eu irure eu offici..."
			],
			type: "Full time",
			titleColor: "text-indigo-400"
		},
		{
			logo: Levupp,
			logoSize: "size-12",
			title: "Product Manager",
			company: "Levupp",
			location: "Marseille, France",
			bulletPoints: [
				"excepteur incididunt occaecat pariatur in consequat est aliqua nostrud nostrud anim laboris incididunt.",
				"mmodo fugiat eu irure eu offici..."
			],
			type: "Full time",
			titleColor: "text-indigo-400"
		}
	];

	return (
		<div className="bg-emplois-section">
			<div className="mx-auto max-w-5xl px-4">
				{/* Monde entier Section */}
				<div className="py-16">
					<div className="flex flex-col items-start justify-between gap-14 lg:flex-row">
						<div className="lg:w-1/2">
							<img
								src={EmploiSection}
								alt="Person celebrating success"
								className="size-[480px] rounded-3xl object-cover"
							/>
						</div>
						<div className="mt-5 space-y-8 lg:w-1/2">
							<div className="inline-flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-white">
								<Star className="size-4" />
								<span className="text-sm">Croire en ses rêves</span>
							</div>

							<h1 className="h2 font-semibold leading-none">
								Trouvez des emplois dans le{' '}
								<span className="text-indigo-400">Monde entier</span>
							</h1>

							<p className="text-gray-600">
								Recherchez et entrez en contact avec des offres d'emploi dans le monde entier.
								Cela vous donne la possibilité de trouver le métier de vos rêves.
							</p>

							<div className="flex flex-wrap gap-4">
								<Button
									variant="outline"
									className="rounded-full bg-transparent px-8 py-6"
								>
									Connexion
								</Button>
								<Button
									variant="gradient2"
									className="rounded-full px-8 py-6 hover:bg-indigo-500"
								>
									Créer mon compte
								</Button>
							</div>
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
						<h2 className="text-5xl font-bold">
							<span className="text-indigo-400">Des entreprises</span> Pour Vous
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{jobs.map((job, index) => (
							<Card key={index} className="rounded-2xl border-none bg-[#F2F2F2] shadow-sm">
								<CardContent className="p-6">
									<div className="ml-4 flex items-center">
										<img
											src={job.logo}
											alt={`${job.company} logo`}
											className={`${job.logoSize} rounded-xl object-contain`}
										/>
										<div className="ml-6 grow">
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
										<Button
											variant="default"
											className="rounded-full bg-black px-6 py-2 text-sm font-medium hover:bg-gray-800"
										>
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