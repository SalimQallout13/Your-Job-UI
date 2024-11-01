export const ROUTES = {
	LOGIN: "/connexion",
	FORGOT_PASSWORD: "/mot-de-passe-oublie",

	HOME_PATH: "/accueil",

	USERS_GESTION_PATH: "/agents",

	ACTIVITE_BASE_PATH: "/liste-activites/nouvelle",
	ACTIVITE_LIST_PATH: "/liste-activites",
	ACTIVITE_NEW_PATH: "/nouvelle-activite",

	SETTINGS_PATH: "/parametres",

	SUPPORT_PATH: "/support",


} as const;

export type RoutesType = typeof ROUTES[keyof typeof ROUTES];

