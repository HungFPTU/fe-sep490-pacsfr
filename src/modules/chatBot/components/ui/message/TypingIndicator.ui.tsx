"use client";

import React from 'react';

interface TypingIndicatorProps {
    text?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
    text = "Đang suy nghĩ" 
}) => {
    return (
        <div className="flex items-center gap-2 text-slate-600">
            <span className="text-sm font-medium">{text}</span>
            <div className="flex items-center gap-1">
                <span 
                    className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                    style={{ 
                        animationDelay: '0ms',
                        animationDuration: '1.4s',
                        animationIterationCount: 'infinite'
                    }}
                />
                <span 
                    className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                    style={{ 
                        animationDelay: '200ms',
                        animationDuration: '1.4s',
                        animationIterationCount: 'infinite'
                    }}
                />
                <span 
                    className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                    style={{ 
                        animationDelay: '400ms',
                        animationDuration: '1.4s',
                        animationIterationCount: 'infinite'
                    }}
                />
            </div>
        </div>
    );
};

