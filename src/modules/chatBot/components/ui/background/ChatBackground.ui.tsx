"use client";

import React from 'react';
import Image from 'next/image';

interface ChatBackgroundProps {
    imageSrc?: string;
    imageAlt?: string;
}

export const ChatBackground: React.FC<ChatBackgroundProps> = ({
    imageSrc = '/assets/image/background/trong-dong.jpg',
    imageAlt = 'Hình nền trống đồng',
}) => {
    return (
        <div className="pointer-events-none select-none absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-10">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-yellow-50/70" />
        </div>
    );
};

