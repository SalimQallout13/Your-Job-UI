import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
	"overflow-hidden rounded-full",
	{
		variants: {
			size: {
				sm: "w-8 h-8",
				md: "w-12 h-12",
				lg: "w-16 h-16",
				xl: "w-20 h-20"
			}
		},
		defaultVariants: {
			size: "md"
		}
	}
);

type AvatarProps = {
	photoProfile: string;
} & VariantProps<typeof avatarVariants>;

const Avatar: React.FC<AvatarProps> = ({ photoProfile, size }) => {
	return (
		<div className={avatarVariants({ size })}>
			<img
				src={`${import.meta.env.VITE_API_URL.replace('/api', '/uploads')}/${photoProfile}`}
				alt="Photo de profil"
				className="w-full h-full object-cover"
			/>
		</div>
	);
};

export default Avatar;