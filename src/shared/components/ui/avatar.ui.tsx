'use client';

import React from 'react';
import { Avatar as BaseAvatar, AvatarImage as BaseAvatarImage, AvatarFallback as BaseAvatarFallback } from '@/shared/components/manager/ui/avatar';
import { cn } from '@/shared/lib/utils';

// Re-export base Avatar components for direct use
export const Avatar = BaseAvatar;
export const AvatarImage = BaseAvatarImage;
export const AvatarFallback = BaseAvatarFallback;

type ProfessionalAvatarProps = {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    className?: string;
    rounded?: boolean;
};

const sizeClasses: Record<NonNullable<ProfessionalAvatarProps['size']>, string> = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
};

export const ProfessionalAvatar: React.FC<ProfessionalAvatarProps> = ({
    src,
    alt,
    size = 'md',
    fallback,
    className = '',
    rounded = true,
}) => {
    return (
        <BaseAvatar className={cn(
            sizeClasses[size],
            rounded ? 'rounded-full' : 'rounded-md',
            'shadow-sm border border-gray-200 bg-white',
            className
        )}>
            {src ? (
                <BaseAvatarImage
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                />
            ) : null}
            <BaseAvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-500 font-semibold">
                {fallback ||
                    (alt
                        ? alt
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : 'N/A')}
            </BaseAvatarFallback>
        </BaseAvatar>
    );
};
