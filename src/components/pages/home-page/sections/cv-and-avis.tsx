import DefaultAvatar from "@/assets/img/placeholder-avatar.webp";
import {
	Carousel, type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/commons/ui/carousel.jsx"
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/commons/ui/button.jsx"
import CvAndAvisImage from "@/assets/img/cv-and-avis-section.png"
import { Icons } from "@/components/commons/others/icons.jsx"

const CvAndAvis = () => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api) return

		const onSelect = () => {
			setCurrent(api.selectedScrollSnap())
		}

		api.on("select", onSelect)
		onSelect()

		return () => {
			api.off("select", onSelect)
		}
	}, [api])

	const scrollTo = (index: SetStateAction<number>) => {
		if (typeof index === "number") {
			api?.scrollTo(index)
		}
		setCurrent(index);
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-5xl px-4 py-20">
				<div className="flex flex-col items-start justify-between gap-14 lg:flex-row">
					<div className="w-full lg:w-1/2">
						<div className="space-y-6">
							<div className="inline-flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-white">
								<Icons.dream className="size-4" />
								<span className="text-sm">Croire en ses rêves</span>
							</div>

							<h1 className="text-3xl font-bold leading-[1.05] md:text-5xl">
								<span className="text-purple-highlight">Téléchargez</span>
								<br />
								votre CV,
								<br />
								<span className="text-black">Laissez</span>
								<br />
								l'entreprise
								<br />
								vous trouver
							</h1>

							<p className="text-body-dark">
								YourJob vous aide à trouver le travail qui correspond à vos
								intérêts et vos passions pour que vous puissiez réaliser vos
								rêves.
							</p>

							<div className="flex flex-wrap gap-4">
								<Button variant="outline" className="rounded-full px-8 py-4 text-base">
									Connexion
								</Button>
								<Button variant="gradient2" className="rounded-full px-8 py-4 text-base">
									Dépose ton CV
								</Button>
							</div>
						</div>
					</div>

					<div className="w-full lg:w-1/2">
						<img
							src={CvAndAvisImage}
							alt="Interview scene"
							className="h-auto w-full rounded-3xl object-cover"
						/>
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<div className="py-20">
				<div className="mx-auto max-w-5xl px-4">
					{/* Header */}
					<div className="mb-12 text-center">
						<div className="inline-flex items-center space-x-2 rounded-full bg-black px-6 py-3">
							<Icons.dream className="size-5 text-white" />
							<span className="text-sm text-white">Ce qu'ils en disent</span>
						</div>
						<h2 className="mt-6 text-3xl font-bold md:text-5xl">
							Ce que disent nos <span className="text-purple-highlight">utilisateurs</span>
						</h2>
					</div>

					{/* Reviews Carousel */}
					<div className="relative">
						<Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
							<CarouselContent className="-ml-2 md:-ml-4">
								{reviews.map((review, index) => (
									<CarouselItem
										key={review.id}
										className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
									>
										<div
											className={`rounded-3xl p-8 transition-colors duration-300 ${
												index === current ? "bg-purple text-white" : "bg-gray-50 font-medium text-gray-900"
											}`}
										>
											<div className="mb-6 flex items-center justify-center">
												<div className="size-20 overflow-hidden rounded-full">
													<img
														src={review.image || DefaultAvatar}
														alt={`${review.name}'s profile`}
														className="size-full object-cover"
														onError={(e) => {
															e.currentTarget.src = DefaultAvatar;
														}}
													/>
												</div>
											</div>
											<div className="space-y-4 text-center">
												<h3 className="text-xl font-semibold">{review.name}</h3>
												<p className="font-semibold">{review.position}</p>
												<hr className={`my-4 ${index === current ? "border-white" : "border-gray-300"}`} />
												<p
													className={`text-sm ${
														index === current ? "text-white/80" : "text-gray-600"
													}`}
												>
													{review.text}
												</p>
											</div>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious
								onClick={() => scrollTo(current === 0 ? reviews.length - 1 : current - 1)}
								className="-right-6 size-12 bg-black text-white transition-colors hover:bg-gray-800 hover:text-white"
							/>
							<CarouselNext
								onClick={() => scrollTo(current === reviews.length - 1 ? 0 : current + 1)}
								className="-right-6 size-12 bg-black text-white transition-colors hover:bg-gray-800 hover:text-white"
							/>

							{/* Dots */}
							<div className="mt-8 flex justify-center gap-2">
								{reviews.map((_, index) => (
									<button
										key={index}
										onClick={() => scrollTo(index)}
										className={`size-2 rounded-full transition-all duration-300 ease-in-out ${
											index === current ? "bg-purple scale-110" : "bg-gray-300 hover:bg-gray-400"
										}`}
										aria-label={`Aller à l'avis ${index + 1}`}
									/>
								))}
							</div>
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CvAndAvis;

const reviews = [
	{
		id: 1,
		name: "Alice Dupont",
		position: "Développeuse Web",
		text: "YourJob m'a aidée à trouver le travail de mes rêves en un temps record.",
		image: "/path/to/user1.jpg",
	},
	{
		id: 2,
		name: "Jean Martin",
		position: "Designer UX/UI",
		text: "Une plateforme intuitive et efficace pour la recherche d'emploi.",
	},
	{
		id: 3,
		name: "Claire Petit",
		position: "Chef de Projet",
		text: "Grâce à YourJob, j'ai pu changer de carrière facilement.",
		image: "/path/to/user3.jpg",
	},
	{
		id: 4,
		name: "Lucas Bernard",
		position: "Analyste Financier",
		text: "Une expérience utilisateur exceptionnelle, je recommande fortement.",
	},
	{
		id: 5,
		name: "Emma Leroy",
		position: "Marketing Manager",
		text: "YourJob est la meilleure plateforme pour trouver un emploi rapidement.",
		image: "/path/to/user5.jpg",
	},
];
