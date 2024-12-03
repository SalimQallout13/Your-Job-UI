export const ROUTES_BACK = {
	SIGNIN: "/auth/connexion",
	SIGNUP: "/auth/inscription",

	UPLOAD_FILE: "/uploadFiles",

	UPDATE_USER: "/users/",
	UPDATE_PROFILE_CANDIDAT: "/users/profile/",
	VERIFY_EMAIL: "/users/existsByEmail",
	VERIFY_PHONE: "/users/existsByPhone",

	GET_ALL_SECTEURS_ACTIVITE: "/domaines",
} as const;

export type RoutesBackType = typeof ROUTES_BACK[keyof typeof ROUTES_BACK];

