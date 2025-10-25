"use client";

import React from "react";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import { cn } from "@shared/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export function GlobalToast() {
    const { toasts, removeToast } = useGlobalToast();

    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-2">
            {toasts.map((toast: { id: string; message: string; type: "success" | "error" | "warning" | "info" }) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

interface ToastItemProps {
    toast: {
        id: string;
        message: string;
        type: "success" | "error" | "warning" | "info";
        duration?: number;
    };
    onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        // Animate in
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleRemove = () => {
        setIsVisible(false);
        // Wait for animation to complete
        setTimeout(onRemove, 150);
    };

    const getIcon = () => {
        switch (toast.type) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "error":
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case "info":
                return <Info className="w-5 h-5 text-blue-500" />;
            default:
                return null;
        }
    };

    const getBackgroundColor = () => {
        switch (toast.type) {
            case "success":
                return "bg-green-50 border-green-200";
            case "error":
                return "bg-red-50 border-red-200";
            case "warning":
                return "bg-yellow-50 border-yellow-200";
            case "info":
                return "bg-blue-50 border-blue-200";
            default:
                return "bg-white border-gray-200";
        }
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-80 max-w-md transition-all duration-150 ease-out",
                getBackgroundColor(),
                isVisible
                    ? "transform translate-x-0 opacity-100"
                    : "transform translate-x-full opacity-0"
            )}
        >
            {getIcon()}
            <p className="flex-1 text-sm font-medium text-gray-900">{toast.message}</p>
            <button
                onClick={handleRemove}
                className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
                <X className="w-4 h-4 text-gray-500" />
            </button>
        </div>
    );
}
