// SignupNavigationButtons.tsx
import { Button } from "@/components/ui/button.tsx"
import { Loader2 } from "lucide-react"

type SignupNavigationButtonsProps = {
	onBack: () => void;
	onNext?: () => void;
	nextDisabled?: boolean;
	isSubmit?: boolean;
	isLoading?: boolean;
	nextLabel?: string;
};

export const SignupNavigationButtons = ({
																					onBack,
																					onNext,
																					nextDisabled = false,
																					isSubmit = false,
																					isLoading = false,
																					nextLabel = "Suivant"
																				}: SignupNavigationButtonsProps) => (
	<div className="flex justify-center gap-4 pt-6 xl:justify-start">
		<Button
			variant="outline"
			className="rounded-full px-8 py-3"
			onClick={onBack}
			disabled={isLoading}
			type="button"
		>
			Retour
		</Button>
		<Button
			variant="gradient"
			className="rounded-full px-8 py-3"
			disabled={nextDisabled || isLoading}
			onClick={!isSubmit ? onNext : undefined}
			type={isSubmit ? 'submit' : 'button'}
		>
			{isLoading ? (
				<div className="flex items-center gap-2">
					<Loader2 className="size-4 animate-spin" />
					<span>En cours...</span>
				</div>
			) : (
				nextLabel
			)}
		</Button>
	</div>
);