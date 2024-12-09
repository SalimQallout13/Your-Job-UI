import { cn } from "@/lib/utils/utils"

const HeaderTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return (
		<div className="col-span-4 py-4 ps-24">
			<h1
				className={cn(
					"font-poppins text-[66px] font-bold leading-[99px] tracking-[-0.06em] text-left",
					className
				)}
			>
				{children}
			</h1>
		</div>
	)
}

export default HeaderTitle
