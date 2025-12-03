"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

export const FloatingChatButton: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Hide button on manager and staff routes
    const shouldHide = pathname?.startsWith('/manager') || pathname?.startsWith('/staff') || pathname?.startsWith('/chatBot');

    if (shouldHide) {
        return null;
    }

    const handleClick = () => {
        router.push('/chatBot');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 group"
            aria-label="Chat với AI ngay"
        >
            {/* Icon */}
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                <MessageCircle className="w-5 h-5" />
            </div>

            {/* Text */}
            <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                Chat với AI ngay
            </span>

            {/* Avatar */}
            {/* <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                <Image
                    src="/assets/image/background/trong-dong-1.jpg"
                    alt="AI Assistant"
                    fill
                    className="object-cover"
                />
            </div> */}
        </button>
    );
};
