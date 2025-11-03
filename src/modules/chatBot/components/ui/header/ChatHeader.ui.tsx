"use client";

import React from 'react';
import { SidebarTrigger } from '@/shared/components/layout/manager/ui/sidebar';

interface ChatHeaderProps {
    title?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title = 'PASCS Chatbot' }) => {
    return (
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-red-200 flex-shrink-0">
            <SidebarTrigger />
            <div className="mx-auto w-full max-w-4xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg md:text-xl font-semibold text-red-700">{title}</h1>
                </div>
            </div>
        </header>
    );
};

