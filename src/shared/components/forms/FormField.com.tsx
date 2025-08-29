/**
 * Reusable form field component
 */

import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function FormField({
    label,
    name,
    error,
    required = false,
    children,
    className = ''
}: FormFieldProps) {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="block text-sm font-medium mb-1 text-gray-700"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {children}

            {error && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}