export const ROUTES_BACK = {
	SIGNIN: "/auth/connexion",
	SIGNUP: "/auth/inscription",
	UPDATE_PROFILE: "/users/:id",
} as const;

export type RoutesBackType = typeof ROUTES_BACK[keyof typeof ROUTES_BACK];

