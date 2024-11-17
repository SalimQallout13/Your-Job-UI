import { Card, CardContent } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils/utils.ts"
import { Icons } from "@/components/others/icons.tsx"
import React from "react"

type SignupCardProps = {
	isSelected: boolean;
	onClick: () => void;
	title: string;
	description: string;
	icon: React.ReactNode;
};

export const SignupCard = ({ isSelected, onClick, title, description, icon }: SignupCardProps) => (
	<Card
		className={cn(
			"relative cursor-pointer rounded-xl p-5 bg-gray-50 transition-all hover:shadow-lg",
			isSelected ? 'border-2 border-purple' : 'border border-gray-200'
		)}
		onClick={onClick}
	>
		{isSelected && (
			<div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-purple p-1">
				<Icons.signupSelectCard className="size-6" />
			</div>
		)}
		<CardContent className="text-center">
			<div className="mb-4 mt-12 flex justify-center">
				<div className="flex size-12 items-center justify-center rounded-xl bg-purple/10">
					{icon}
				</div>
			</div>
			<h3 className="mb-2 text-lg font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">{description}</p>
		</CardContent>
	</Card>
);