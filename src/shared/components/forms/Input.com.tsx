/**
 * Enhanced input component with better styling and functionality
 */

import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantClasses = {
    default: 'border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    filled: 'bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    outlined: 'border-2 border-gray-300 focus:border-blue-500',
};

const sizeClasses = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    variant = 'default',
    size = 'md',
    error = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}, ref) => {
    const baseClasses = 'w-full rounded-md outline-none transition-colors text-gray-900 placeholder:text-gray-400';
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';
    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${errorClasses}
    ${disabledClasses}
    ${iconPadding}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    if (leftIcon || rightIcon) {
        return (
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="text-gray-400">
                            {leftIcon}
                        </div>
                    </div>
                )}

                <input
                    ref={ref}
                    className={inputClasses}
                    disabled={disabled}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="text-gray-400">
                            {rightIcon}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            {...props}
        />
    );
});

Input.displayName = 'Input';