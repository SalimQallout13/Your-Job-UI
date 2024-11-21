import { cn } from "@/lib/utils/utils";

export const Title = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return (
		<h1
			className={cn(
				"font-poppins text-[66px] font-bold leading-[99px] tracking-[-0.06em] text-left",
				className
			)}
		>
			{children}
		</h1>
	);
};
