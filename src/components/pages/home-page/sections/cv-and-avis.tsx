import DefaultAvatar from "@/assets/img/placeholder-avatar.webp"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/commons/ui/carousel.tsx"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { type CarouselApi } from "@/components/commons/ui/carousel"
import { Button } from "@/components/commons/ui/button.tsx"
import CvandAvisSection from "@/assets/img/cv-and-avis-section.png"
import { Icons } from "@/components/commons/others/icons"

const CvAndAvis = () => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api) return

		const onSelect = () => {
			setCurrent(api.selectedScrollSnap())
		}

		api.on("select", onSelect)
		// Mise à jour initiale
		onSelect()

		return () => {
			api.off("select", onSelect)
		}
	}, [api])

	// Handler pour les flèches et les points
	const scrollTo = (index: number) => {
		api?.scrollTo(index)
		setCurrent(index)
	}

	return (<div className="bg-white">
			<div className="mx-auto max-w-5xl px-4 py-20">
				<div className="flex flex-col items-start justify-between gap-14 lg:flex-row">
					<div className="lg:w-1/2">
						<div className="space-y-6">
							<div className="inline-flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-white">
								<Icons.dream className="size-4" />
								<span className="text-sm">Croire en ses rêves</span>
							</div>

							<h1 className="h2 font-bold leading-[1.05]">
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

							<p className="text-gray-600">
								YourJob vous aide à trouver le travail qui correspond à vos
								intérêt et vos passions pour que vous puissiez réaliser vos
								rêves.
							</p>

							<div className="flex flex-wrap gap-4">
								<Button
									variant="outline"
									className="rounded-full bg-transparent px-8 py-6 text-base"
								>
									Connexion
								</Button>
								<Button
									variant="gradient2"
									className="rounded-full px-8 py-6 text-base hover:bg-indigo-600"
								>
									Dépose ton CV
								</Button>
							</div>
						</div>
					</div>

					<div className="lg:w-1/2">
						<img
							src={CvandAvisSection}
							alt="Interview scene"
							className="h-auto w-full rounded-3xl object-cover"
						/>
					</div>
				</div>
			</div>
			{/* Reviews Section */}
			<div className="py-20">
				<div className="mx-auto max-w-6xl px-4">
					{/* Header reste le même */}

					{/* Reviews Carousel */}
					<div className="relative">
						<Carousel
							setApi={setApi}
							className="w-full"
							opts={{
								align: "start", loop: true
							}}
						>
							<CarouselContent className="-ml-2 md:-ml-4">
								{reviews.map((review, index) => (
									<CarouselItem key={review.id} className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
										<div
											className={`rounded-3xl p-8 transition-colors duration-300 ${index === current ? "bg-purple text-white" : "bg-gray-50 font-medium text-gray-900"}`}
										>
											<div className="mb-6 flex items-center justify-center">
												<div className="size-20 overflow-hidden rounded-full">
													<img
														src={review.image || DefaultAvatar}
														alt={`${review.name}'s profile`}
														className="size-full object-cover"
														onError={(e) => {
															e.currentTarget.src = DefaultAvatar
														}}
													/>
												</div>
											</div>
											<div className="space-y-4 text-center">
												<h3 className="text-xl font-semibold">{review.name}</h3>
												<p
													className={`${index === current ? "text-white" : ""} font-semibold transition-colors duration-300`}>
													{review.position}
												</p>
												<Separator
													className={`${index === current ? "bg-white" : "bg-gray-900"} h-px transition-colors duration-300`} />
												<p
													className={`text-sm transition-colors duration-300 ${index === current ? "text-white/80" : "text-gray-600"}`}>
													{review.text}
												</p>
											</div>
										</div>
									</CarouselItem>))}
							</CarouselContent>
							<CarouselPrevious
								onClick={() => scrollTo(current === 0 ? reviews.length - 1 : current - 1)}
								className="-left-6 size-12 bg-black text-white transition-colors hover:bg-gray-800 hover:text-white"
							/>
							<CarouselNext
								onClick={() => scrollTo(current === reviews.length - 1 ? 0 : current + 1)}
								className="-right-6 size-12 bg-black text-white transition-colors hover:bg-gray-800 hover:text-white"
							/>

							{/* Dots */}
							<div className="mt-8 flex justify-center gap-2">
								{reviews.map((_, index) => (<button
										key={index}
										onClick={() => scrollTo(index)}
										className={`size-2 rounded-full transition-all duration-300 ease-in-out ${index === current ? "bg-purple scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
										aria-label={`Aller à l'avis ${index + 1}`}
									/>))}
							</div>
						</Carousel>
					</div>
				</div>
			</div>
		</div>)
}

export default CvAndAvis

const reviews = [{
  id: 1,
  name: "Nom Prénom",
  position: "Poste",
  text: "Cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi. cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi.",
  image: "/path/to/user1.jpg"
}, {
  id: 2,
  name: "Nom Prénom",
  position: "Poste",
  text: "Cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi. cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi."
}, {
  id: 3,
  name: "Nom Prénom",
  position: "Poste",
  text: "Cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi. cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi.",
  image: "/path/to/user3.jpg"
}, {
  id: 4,
  name: "Nom Prénom",
  position: "Poste",
  text: "Cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi. cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi."
}, {
  id: 5,
  name: "Nom Prénom",
  position: "Poste",
  text: "Cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi. cupidatat cillum irure ea irure exercitation ex in irure commodo id nisi.",
  image: "/path/to/user5.jpg"
}]
