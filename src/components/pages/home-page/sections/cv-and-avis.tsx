import { Star } from "lucide-react";
import { Button } from "@/components/commons/ui/button.tsx"
import CvAndAvisSection from "@/assets/img/cv-and-avis-section.png"

const CvAndAvis = () => {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-5xl px-4 py-20">
				<div className="flex flex-col items-start justify-between gap-14 lg:flex-row">
					<div className="lg:w-1/2">
						<div className="space-y-6">
							{/* Badge */}
							<div className="inline-flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-white">
								<Star className="size-4" />
								<span className="text-sm">Croire en ses rêves</span>
							</div>

							{/* Title */}
							<h1 className="h2 font-bold leading-[1.05]">
								<span className="text-indigo-400">Téléchargez</span>
								<br />
								votre CV,
								<br />
								<span className="text-black">Laissez</span>
								<br />
								l'entreprise
								<br />
								vous trouver
							</h1>

							{/* Description */}
							<p className="text-gray-600">
								YourJob vous aide à trouver le travail qui correspond à vos
								intérêt et vos passions pour que vous puissiez réaliser vos
								rêves.
							</p>

							{/* Buttons */}
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

					{/* Image */}
					<div className="lg:w-1/2">
						<img
							src={CvAndAvisSection}
							alt="Interview scene"
							className="h-auto w-full rounded-3xl object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CvAndAvis;