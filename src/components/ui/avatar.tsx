import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { User } from "lucide-react"; // Import de l'icône utilisateur

const avatarVariants = cva(
	"flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500",
	{
		variants: {
			size: {
				sm: "size-8 text-sm",
				md: "size-12 text-base",
				lg: "size-16 text-lg",
				xl: "size-20 text-xl",
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
					className="size-full object-cover"
				/>
			) : (
				<User className="size-1/2" /> // Icône utilisateur par défaut
			)}
		</div>
	);
};

export default Avatar;
