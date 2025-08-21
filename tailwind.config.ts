import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // PACSFR Brand Colors
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6", // Main brand blue
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554",
                },
                secondary: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                    950: "#020617",
                },
                success: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                    950: "#052e16",
                },
                warning: {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                    950: "#451a03",
                },
                danger: {
                    50: "#fef2f2",
                    100: "#fee2e2",
                    200: "#fecaca",
                    300: "#fca5a5",
                    400: "#f87171",
                    500: "#ef4444",
                    600: "#dc2626",
                    700: "#b91c1c",
                    800: "#991b1b",
                    900: "#7f1d1d",
                    950: "#450a0a",
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            spacing: {
                18: "4.5rem",
                88: "22rem",
                112: "28rem",
                128: "32rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    darkMode: "class",
    plugins: [heroui({
        themes: {
            light: {
                colors: {
                    primary: {
                        DEFAULT: "#3b82f6",
                        foreground: "#ffffff",
                    },
                    secondary: {
                        DEFAULT: "#64748b",
                        foreground: "#ffffff",
                    },
                    success: {
                        DEFAULT: "#22c55e",
                        foreground: "#ffffff",
                    },
                    warning: {
                        DEFAULT: "#f59e0b",
                        foreground: "#ffffff",
                    },
                    danger: {
                        DEFAULT: "#ef4444",
                        foreground: "#ffffff",
                    },
                },
            },
            dark: {
                colors: {
                    primary: {
                        DEFAULT: "#60a5fa",
                        foreground: "#000000",
                    },
                    secondary: {
                        DEFAULT: "#94a3b8",
                        foreground: "#000000",
                    },
                    success: {
                        DEFAULT: "#4ade80",
                        foreground: "#000000",
                    },
                    warning: {
                        DEFAULT: "#fbbf24",
                        foreground: "#000000",
                    },
                    danger: {
                        DEFAULT: "#f87171",
                        foreground: "#000000",
                    },
                },
            },
        },
    })],
};

export default config;
