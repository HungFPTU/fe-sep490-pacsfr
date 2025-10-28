'use client';

import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

interface SelectTriggerProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface SelectContentProps {
    children: React.ReactNode;
    className?: string;
}

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    onSelect?: () => void;
    className?: string;
}

interface SelectValueProps {
    placeholder?: string;
    children?: React.ReactNode;
}

const SelectContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}>({
    isOpen: false,
    setIsOpen: () => { },
});

export function Select({ value, onValueChange, disabled, className, children }: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
            <div className={cn('relative', className)}>
                {children}
            </div>
        </SelectContext.Provider>
    );
}

export function SelectTrigger({ children, className, onClick }: SelectTriggerProps) {
    const { isOpen, setIsOpen } = React.useContext(SelectContext);

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cn(
                'flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                isOpen && 'ring-2 ring-slate-950 ring-offset-2',
                className
            )}
        >
            {children}
            <ChevronDown className={cn('h-4 w-4 opacity-50 transition-transform', isOpen && 'rotate-180')} />
        </button>
    );
}

export function SelectContent({ children, className }: SelectContentProps) {
    const { isOpen, setIsOpen } = React.useContext(SelectContext);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('[data-select-content]')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div
            data-select-content
            className={cn(
                'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95',
                className
            )}
        >
            <div className="max-h-60 overflow-auto">
                {children}
            </div>
        </div>
    );
}

export function SelectItem({ value, children, disabled, onSelect, className }: SelectItemProps) {
    const { value: selectedValue, onValueChange, setIsOpen } = React.useContext(SelectContext);
    const isSelected = selectedValue === value;

    const handleClick = () => {
        if (disabled) return;

        if (onSelect) {
            onSelect();
        } else if (onValueChange) {
            onValueChange(value);
            setIsOpen(false);
        }
    };

    return (
        <div
            className={cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                isSelected && 'bg-slate-100',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={handleClick}
        >
            {isSelected && (
                <Check className="absolute left-2 h-4 w-4" />
            )}
            {children}
        </div>
    );
}

export function SelectValue({ placeholder, children }: SelectValueProps) {
    const { value } = React.useContext(SelectContext);

    if (children) {
        return <>{children}</>;
    }

    return (
        <span className={cn(!value && 'text-slate-500')}>
            {value || placeholder}
        </span>
    );
}
