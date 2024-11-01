import * as React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: React.FC<ParagraphProps> = ({ children, className, ...props }) => {
    return (
        <p
            className={`font-inter text-[16px] font-medium leading-[19.36px] tracking-[-0.06em] ${className}`}
            {...props}
        >
            {children}
        </p>
    );
};

export default Paragraph;
