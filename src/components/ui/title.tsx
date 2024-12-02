import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const titleVariants = cva(
	"font-inter text-[26px] font-normal leading-[31.47px] tracking-[-0.06em] text-left underline-offset-auto decoration-skip-ink-none",
	{
		variants: {
			variant: {
				default: "text-black"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

type TitleProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof titleVariants>;

const Title: React.FC<TitleProps> = ({ children, className, variant, ...props }) => {
	return (
		<p className={titleVariants({ variant, className })} {...props}>
			{children}
		</p>
	);
};

export default Title;
