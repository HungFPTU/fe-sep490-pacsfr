'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { cn } from '@/shared/lib/utils';

interface ManagerFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSubmit: () => void;
    onReset: () => void;
    searchPlaceholder?: string;
    isSubmitting?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const ManagerFilterBar: React.FC<ManagerFilterBarProps> = ({
    searchValue,
    onSearchChange,
    onSubmit,
    onReset,
    searchPlaceholder = 'Tìm kiếm...',
    isSubmitting = false,
    children,
    className,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={cn('flex flex-wrap items-center gap-3', className)}>
            <div className="relative flex-1 min-w-[260px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-10"
                />
            </div>

            {children}

            <Button
                onClick={onSubmit}
                size="default"
                className="whitespace-nowrap"
                disabled={isSubmitting}
            >
                <Search className="mr-1 h-4 w-4" />
                Tìm kiếm
            </Button>
            <Button
                onClick={onReset}
                variant="outline"
                size="default"
                className="whitespace-nowrap"
                disabled={isSubmitting}
            >
                <X className="mr-1 h-4 w-4" />
                Đặt lại
            </Button>
        </div>
    );
};
