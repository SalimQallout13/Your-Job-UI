import { UserData } from "@/lib/interfaces/userData.ts"

export type UserSignInResponse = Omit<UserData, "createdAt" | "updatedAt"> & {
	createdAt?: string; // Rendez certaines propriétés optionnelles ou spécifiques
	updatedAt?: string;
};
