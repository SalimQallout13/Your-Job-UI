import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
	"overflow-hidden rounded-full",
	{
		variants: {
			size: {
				sm: "size-8",
				md: "size-12",
				lg: "size-16",
				xl: "size-20"
			}
		},
		defaultVariants: {
			size: "md"
		}
	}
);

type AvatarProps = {
	photoProfile: string | undefined;
} & VariantProps<typeof avatarVariants>;

const Avatar: React.FC<AvatarProps> = ({ photoProfile, size }) => {
	return (
		<div className={avatarVariants({ size })}>
			<img
				src={`${import.meta.env.VITE_API_URL.replace('/api', '/uploads')}/${photoProfile}`}
				alt="Photo de profil"
				className="size-full object-cover"
			/>
		</div>
	);
};

export default Avatar;