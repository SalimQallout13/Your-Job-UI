import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/commons/ui/button";
import {
	Sheet,
	SheetHeader,
	SheetContent,
	SheetTrigger,
	SheetTitle, SheetDescription
} from "@/components/commons/ui/sheet"
import { Link } from "react-router-dom";
import { Menu } from "@/components/commons/others/menu.tsx"
import { cn } from "@/lib/utils/utils.ts"
import { siteConfig } from "@/lib/configs/site.ts"
import { ROUTES } from "@/lib/configs/routes.ts"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function SheetMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const openSidebar = () => setIsOpen(true);
	const closeSidebar = () => setIsOpen(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon" onClick={openSidebar}>
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex h-full flex-col rounded-2xl px-3 sm:w-72" side="left">
				<SheetTitle>
					<VisuallyHidden>
						Menu
					</VisuallyHidden>
				</SheetTitle>
				<SheetDescription>
					<VisuallyHidden>
						Menu de navigation
					</VisuallyHidden>
				</SheetDescription>
				<SheetHeader>
					<Button
						className="flex items-center justify-center pb-2 pt-1"
						variant="link"
						asChild
						onClick={closeSidebar}
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
				</SheetHeader>
				<Menu isOpen={isOpen} closeSidebarMobile={closeSidebar} />
			</SheetContent>
		</Sheet>
	);
}
