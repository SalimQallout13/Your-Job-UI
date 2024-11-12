import * as React from "react";
import {cn} from "@/lib/utils/utils.ts";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: number; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({className, options, ...props}, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                    className
                )}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = "Select";

export {Select};