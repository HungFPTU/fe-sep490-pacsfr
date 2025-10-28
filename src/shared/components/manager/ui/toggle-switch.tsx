'use client';

import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    label,
    description,
    disabled = false,
    className = '',
    'aria-label': ariaLabel,
}) => {
    const handleToggle = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="text-sm font-medium text-gray-900">
                Trạng thái hiển thị
            </label>
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleToggle}
                        disabled={disabled}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${checked ? 'bg-gray-600' : 'bg-gray-200'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label={ariaLabel || label}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                    <div>
                        <span className="text-sm font-medium text-gray-900">
                            {label}
                        </span>
                        {description && (
                            <p className="text-xs text-gray-500 mt-0.5">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${checked
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-gray-100 text-gray-500'
                    }`}>
                    {checked ? 'BẬT' : 'TẮT'}
                </div>
            </div>
        </div>
    );
};
