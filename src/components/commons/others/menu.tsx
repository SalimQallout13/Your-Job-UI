import React from 'react';
import { useLocation } from "react-router-dom";
import { useLogout } from "@/lib/hooks/auth/use-logout.tsx";
import { cn } from "@/lib/utils/utils.ts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/commons/ui/tooltip.tsx";
import { Link } from "react-router-dom";
import { Ellipsis, LogOut } from "lucide-react";
import { Button } from "@/components/commons/ui/button.tsx"
import { useMediaQuery } from "@/lib/hooks/use-media-query.ts"
import { getSidebarMenuList } from "@/lib/configs/sidebar-menu-list.ts"
import { CollapseMenuButton } from "@/components/commons/others/collapse-menu-button.tsx"
import { Icon } from "@/components/commons/others/icons.tsx"
import { RoutesType } from "@/lib/configs/routes.ts"
import { Submenu } from "@/lib/types/Submenu.ts"

interface MenuProps {
	isOpen: boolean;
	closeSidebarMobile?: () => void;
}

export function Menu({ isOpen, closeSidebarMobile }: MenuProps) {

	const { handleLogout } = useLogout();

	const isDesktop = useMediaQuery("desktop");
	const location = useLocation();
	const currentPath = location.pathname;
	const menuGroups = getSidebarMenuList(currentPath);

	return (
		<nav className="flex h-[calc(100vh-110px)] flex-col justify-between lg:px-4">
			<div>
				{menuGroups.map((menuGroup) => (
					<MenuGroup
						key={menuGroup.groupLabel}
						groupLabel={menuGroup.groupLabel}
						isOpen={isOpen}
						menus={menuGroup.menus}
						closeSidebarMobile={closeSidebarMobile}
					/>
				))}
			</div>
			<div className={cn(!isDesktop && "flex items-center justify-center gap-4")}>
				<div className="flex w-full flex-col items-center">
					<LogoutButton isOpen={isOpen} onLogout={handleLogout} />
				</div>
			</div>
		</nav>
	);
}

interface MenuGroupProps {
	groupLabel: string;
	isOpen: boolean;
	menus: {
		href: RoutesType;
		label: string;
		icon: Icon;
		active: boolean;
		submenus: Submenu[];
	}[];
	closeSidebarMobile: (() => void) | undefined;
}

const MenuGroup: React.FC<MenuGroupProps> = ({ groupLabel, isOpen, menus, closeSidebarMobile }) => {
	return (
		<div className={cn("flex flex-col gap-2", !isOpen && "items-center")}>
			<div className={"mt-7"}>
				{isOpen || isOpen === undefined ? (
					<p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
						{groupLabel}
					</p>
				) : (
					<TooltipProvider>
						<Tooltip delayDuration={100}>
							<TooltipTrigger className="w-full">
								<div className="flex w-full items-center justify-center">
									<Ellipsis className="size-5" />
								</div>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>{groupLabel}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
			{menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
				submenus.length === 0 ? (
					<div className="w-full" key={index}>
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button
										variant={active ? "secondary" : "ghost"}
										className={`mb-1 h-10 w-full justify-start ${!isOpen && 'justify-center'}`}
										asChild
									>
										<Link to={href} onClick={closeSidebarMobile}>
                      <span className={cn(!isOpen ? "flex justify-center w-full" : "mr-4")}>
                        <Icon size={20} />
                      </span>
											<p className={cn("max-w-[200px] truncate", !isOpen ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100")}>
												{label}
											</p>
										</Link>
									</Button>
								</TooltipTrigger>
								{!isOpen && (
									<TooltipContent side="right">
										{label}
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				) : (
					<div className="w-full" key={index}>
						<CollapseMenuButton
							closeSidebarMobile={closeSidebarMobile}
							icon={Icon}
							label={label}
							active={active}
							submenus={submenus}
							isOpen={isOpen}
						/>
					</div>
				)
			)}
		</div>
	);
};


interface LogoutButtonProps {
	isOpen: boolean;
	onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isOpen, onLogout }) => {

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						onClick={onLogout}
						variant="outline"
						className={`h-9 w-full ${!isOpen && 'justify-center'}`}
					>
            <span className={cn(!isOpen ? "flex justify-center w-full" : "mr-4")}>
              <LogOut size={20} />
            </span>
						<p className={cn("whitespace-nowrap", !isOpen ? "opacity-0 hidden" : "opacity-100")}>
							Déconnexion
						</p>
					</Button>
				</TooltipTrigger>
				{!isOpen && (
					<TooltipContent side="right">Déconnexion</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
};



