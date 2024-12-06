import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { User } from "lucide-react"; // Import de l'icône utilisateur

const avatarVariants = cva(
	"overflow-hidden rounded-full flex items-center justify-center bg-gray-200 text-gray-500",
	{
		variants: {
			size: {
				sm: "w-8 h-8 text-sm",
				md: "w-12 h-12 text-base",
				lg: "w-16 h-16 text-lg",
				xl: "w-20 h-20 text-xl",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
);

type AvatarProps = {
	photoProfile?: string; // Peut être `undefined`
} & VariantProps<typeof avatarVariants>;

const Avatar: React.FC<AvatarProps> = ({ photoProfile, size }) => {
	const hasPhoto = Boolean(photoProfile); // Vérifie si une photo est présente

	return (
		<div className={avatarVariants({ size })}>
			{hasPhoto ? (
				<img
					src={`${import.meta.env.VITE_API_URL.replace("/api", "/uploads")}/${photoProfile}`}
					alt="Photo de profil"
					className="w-full h-full object-cover"
				/>
			) : (
				<User className="w-1/2 h-1/2" /> // Icône utilisateur par défaut
			)}
		</div>
	);
};

export default Avatar;
