import { Link } from "react-router-dom";
import { cn } from "@/lib/utils/utils.ts"
import { SidebarToggle } from "@/components/commons/others/sidebar-toggle.tsx"
import { ROUTES } from "@/lib/configs/routes.ts"
import { siteConfig } from "@/lib/configs/site.ts"
import { Button } from "@/components/commons/ui/button.tsx"
import { Menu } from "@/components/commons/others/menu.tsx"

function Sidebar ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

	return (
		<aside
			className={
				`fixed inset-y-0 left-0 z-50 h-screen border-r bg-background transition-all duration-300 ease-in-out 
				${ isOpen ? 'w-[230px]' : 'w-[85px]'} 
				lg:${isOpen ? 'w-[230px]' : 'w-[90px]'} 
				${!isOpen ? 'hidden lg:block' : ''}`
			}
		>

				<div>
					<SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
					<Button
						className={cn(
							"transition-transform ease-in-out duration-300 flex w-full items-center justify-center mt-[16px] mb-[40px]",
							!isOpen ? "translate-x-1" : "translate-x-0"
						)}
						variant="link"
						asChild
					>
						<Link to={ROUTES.HOME_PATH} className="flex items-center gap-3">
							<img
								className="size-[1.60rem] transition-all group-hover:scale-110"
								src={siteConfig.logoWithoutText}
								alt={siteConfig.name}
							/>
							<h1
								className={cn(
									"font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
									!isOpen
										? "-translate-x-96 opacity-0 hidden"
										: "translate-x-0 opacity-100"
								)}
							>
								{siteConfig.name}
							</h1>
						</Link>
					</Button>

					<Menu isOpen={isOpen} />
				</div>

		</aside>
	);
}

export default Sidebar;
