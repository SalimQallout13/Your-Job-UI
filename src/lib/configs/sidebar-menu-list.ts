import { Settings, CalendarDays, LayoutDashboard, Users2, BookUser } from "lucide-react"
import { ROUTES, RoutesType } from "./routes.ts"
import { Icon } from "@/components/commons/others/icons.tsx"
import { Submenu } from "@/lib/types/Submenu.ts"



type Menu = {
	href: RoutesType;
	label: string;
	active: boolean;
	icon: Icon;
	submenus: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getSidebarMenuList(pathname: string): Group[] {

	return [
		{
			groupLabel: "",
			menus: [
				{
					href: ROUTES.HOME_PATH,
					label: "Acceuil",
					active: pathname.includes(ROUTES.HOME_PATH),
					icon: LayoutDashboard,
					submenus: []
				}
			]
		},
		{
			groupLabel: "Contenus",
			menus: [
				{
					href: ROUTES.USERS_GESTION_PATH,
					label: "Agents",
					active: pathname.includes(ROUTES.USERS_GESTION_PATH),
					icon: Users2,
					submenus: []
				},
				{
					href: ROUTES.ACTIVITE_BASE_PATH,
					label: "Activités",
					active: pathname === ROUTES.ACTIVITE_LIST_PATH || pathname === ROUTES.ACTIVITE_NEW_PATH,
					icon: CalendarDays,
					submenus: [
						{
							href: ROUTES.ACTIVITE_LIST_PATH,
							label: "Liste activités",
							active: pathname === ROUTES.ACTIVITE_LIST_PATH
						},
						{
							href: ROUTES.ACTIVITE_NEW_PATH,
							label: "Nouvelle activité",
							active: pathname === ROUTES.ACTIVITE_NEW_PATH
						}
					]
				},
			]
		},
		{
			groupLabel: "Paramètres",
			menus: [
				{
					href: ROUTES.SETTINGS_PATH,
					label: "Mon compte",
					active: pathname.includes(ROUTES.SETTINGS_PATH),
					icon: Settings,
					submenus: []
				},
				{
					href: ROUTES.SUPPORT_PATH,
					label: "Support",
					active: pathname.includes(ROUTES.SUPPORT_PATH),
					icon: BookUser,
					submenus: []
				}
			]
		},
	];
}
