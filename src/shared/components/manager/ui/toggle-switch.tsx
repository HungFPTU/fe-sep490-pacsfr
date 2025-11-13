'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/shared/lib/utils';

type SwitchElement = React.ElementRef<typeof SwitchPrimitives.Root>;
type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const Switch = React.forwardRef<SwitchElement, SwitchProps>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        ref={ref}
        className={cn(
            'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200',
            className,
        )}
        {...props}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                'pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform',
                'data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1',
            )}
        />
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

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
    className,
    'aria-label': ariaLabel,
}) => {
    const controlId = React.useId();
    const statusLabel = checked ? 'BẬT' : 'TẮT';

    return (
        <div className={cn('space-y-2', className)}>
            <label htmlFor={controlId} className="text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-3">
                    <Switch
                        id={controlId}
                        checked={checked}
                        onCheckedChange={(next: boolean) => {
                            if (!disabled) {
                                onChange(next);
                            }
                        }}
                        disabled={disabled}
                        aria-label={ariaLabel || label}
                    />
                    <div>
                        <span className="text-sm font-medium text-gray-900">{label}</span>
                        {description ? (
                            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
                        ) : null}
                    </div>
                </div>
                <div
                    className={cn(
                        'rounded px-2 py-1 text-xs font-medium transition-colors',
                        checked ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-500',
                    )}
                >
                    {statusLabel}
                </div>
            </div>
        </div>
    );
};
