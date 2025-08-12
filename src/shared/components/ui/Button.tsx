"use client";

import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
};

const base = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
    secondary: "border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10",
    ghost: "hover:bg-black/5 dark:hover:bg-white/10",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
    return (
        <button className={[base, variants[variant], "h-10 px-4", className].join(" ")} {...props} />
    );
} 