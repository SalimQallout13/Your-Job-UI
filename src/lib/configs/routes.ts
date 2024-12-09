export const ROUTES = {
	HOME_PATH: "/",
	SIGNUP_PATH: "/signup",
	PROFILE_PATH: "/profil",
	OFFRES_PATH: "/offres",
} as const;

export type RoutesType = typeof ROUTES[keyof typeof ROUTES];

