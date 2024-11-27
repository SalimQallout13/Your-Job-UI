export const ROUTES = {
	HOME_PATH: "/",
	SIGNUP_PATH: "/signup",
	PROFILE_PATH: "/profile",
} as const;

export type RoutesType = typeof ROUTES[keyof typeof ROUTES];

