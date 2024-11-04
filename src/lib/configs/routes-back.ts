export const ROUTES_BACK = {
	SIGNIN: "/connexion",
	BULLETIN: "/bulletins",
} as const;

export type RoutesBackType = typeof ROUTES_BACK[keyof typeof ROUTES_BACK];

