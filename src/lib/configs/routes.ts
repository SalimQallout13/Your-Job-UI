export const ROUTES = {
	HOME_PATH: "/",
} as const;

export type RoutesType = typeof ROUTES[keyof typeof ROUTES];

