export const ROUTES = {
	HOME_PATH: "/",
	SIGNUP_PATH: "/signup",
} as const;

export type RoutesType = typeof ROUTES[keyof typeof ROUTES];

