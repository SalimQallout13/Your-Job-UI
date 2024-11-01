import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/commons/ui/command.tsx";
import { DialogTitle, DialogDescription } from "@/components/commons/ui/dialog.tsx";
import { getSidebarMenuList } from "@/lib/configs/sidebar-menu-list.ts"

interface CommandDialogDemoProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CommandDialogSearch({ isOpen, onOpenChange }: CommandDialogDemoProps) {
	const location = useLocation();
	const menuList = getSidebarMenuList(location.pathname);

	const down = (e: KeyboardEvent) => {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			onOpenChange(!isOpen);
		}
	};

	React.useEffect(() => {
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [isOpen, onOpenChange]);

	return (
		<>
			<CommandDialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogTitle className="hidden">Rechercher</DialogTitle>
				<DialogDescription className="hidden">
					Utilisez cette boîte de dialogue pour rechercher une commande ou une fonctionnalité.
				</DialogDescription>
				<CommandInput placeholder="Rechercher ..." />
				<CommandList>
					{menuList.length === 0 ? (
						<CommandEmpty>No results found.</CommandEmpty>
					) : (
						menuList.map((group, groupIndex) => (
							<React.Fragment key={group.groupLabel + groupIndex}>
								<CommandGroup heading={group.groupLabel}>
									{group.menus.map((menu, menuIndex) => (
										menu.submenus.length > 0 ? (
											// Si le menu a des sous-menus, on affiche les sous-menus avec l'icône du menu principal
											menu.submenus.map((submenu, submenuIndex) => (
												<CommandItem key={submenu.href + submenuIndex} asChild>
													<Link to={submenu.href} onClick={() => onOpenChange(false)}>
														<div className="flex items-center">
															{/* Icône du menu principal */}
															<menu.icon className="mr-2 size-4" />
															<span>{submenu.label}</span>
														</div>
													</Link>
												</CommandItem>
											))
										) : (
											// Sinon, on affiche directement le menu principal
											<CommandItem key={menu.href + menuIndex} asChild>
												<Link to={menu.href} onClick={() => onOpenChange(false)}>
													<div className="flex items-center">
														<menu.icon className="mr-2 size-4" />
														<span>{menu.label}</span>
													</div>
												</Link>
											</CommandItem>
										)
									))}
								</CommandGroup>
								{groupIndex < menuList.length - 1 && <CommandSeparator />}
							</React.Fragment>
						))
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}
