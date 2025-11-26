'use client';

import * as React from "react";
import { cn } from "@shared/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, placeholder, disabled, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <select
                    ref={ref}
                    disabled={disabled}
                    className={cn(
                        "flex h-9 w-full appearance-none rounded-md border border-input bg-white px-3 py-1 pr-8 text-sm shadow-sm transition-all",
                        "placeholder:text-muted-foreground",
                        "hover:border-input/80 hover:bg-slate-50 hover:shadow-md",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-sm",
                        "cursor-pointer",
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-opacity",
                    disabled ? "opacity-30" : "opacity-50"
                )} />
            </div>
        );
    }
);
Select.displayName = "Select";

export { Select };
