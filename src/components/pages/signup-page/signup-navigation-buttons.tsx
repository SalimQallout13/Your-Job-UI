import { Button } from "@/components/ui/button.tsx"

type SignupNavigationButtonsProps = {
	onBack: () => void;
	onNext?: () => void;
	nextDisabled?: boolean;
	isSubmit?: boolean;
	nextLabel?: string;
};

export const SignupNavigationButtons = ({
																	 onBack,
																	 onNext,
																	 nextDisabled = false,
																	 isSubmit = false,
																	 nextLabel = "Suivant"
																 }: SignupNavigationButtonsProps) => (
	<div className="flex justify-center gap-4 pt-6 xl:justify-start">
		<Button
			variant="outline"
			className="rounded-full px-8 py-3"
			onClick={onBack}
		>
			Retour
		</Button>
		<Button
			variant="gradient"
			disabled={nextDisabled}
			onClick={!isSubmit ? onNext : undefined}
			type={isSubmit ? 'submit' : 'button'}
		>
			{nextLabel}
		</Button>
	</div>
);