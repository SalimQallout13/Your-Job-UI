export const ROUTES_BACK = {
	SIGNIN: "/auth/connexion",
} as const;

export type RoutesBackType = typeof ROUTES_BACK[keyof typeof ROUTES_BACK];

