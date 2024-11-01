export const ROUTES_BACK = {
	SIGNIN: "/auth/signin",
	BULLETIN: "/bulletins",
} as const;

export type RoutesBackType = typeof ROUTES_BACK[keyof typeof ROUTES_BACK];

