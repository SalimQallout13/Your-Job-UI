import { RoutesType } from "@/lib/configs/routes.ts"

export type Submenu = {
	href: RoutesType;
	label: string;
	active: boolean;
};