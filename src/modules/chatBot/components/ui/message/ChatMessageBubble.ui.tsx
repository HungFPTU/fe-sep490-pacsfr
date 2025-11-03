"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '../../../types';

interface ChatMessageBubbleProps {
    message: ChatMessage;
}

const UserIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const AssistantIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M19.97 10.49c.5-2.9-1.3-5.5-3.8-6.6-1.5-.6-3.1-.6-4.6 0-2.5 1.1-4.3 3.7-3.8 6.6.2 1.4.9 2.7 1.9 3.7.8.8 1.8 1.4 2.9 1.7 1 .3 2.1.3 3.1 0 1.1-.3 2.1-.9 2.9-1.7.9-1 1.6-2.3 1.9-3.7zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
    </svg>
);

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`mb-4 md:mb-6 flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                    <AssistantIcon />
                </div>
            )}
            <div
                className={`prose max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm border
                    ${isUser
                        ? 'bg-red-600 text-white border-red-600 rounded-br-none prose-strong:text-white prose-p:text-white'
                        : 'bg-white/95 text-slate-900 rounded-bl-none border-red-100'
                    }`}
            >
                {message.content ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                    <span className="w-1 h-4 bg-red-300 inline-block animate-pulse rounded-sm" />
                )}
            </div>
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm">
                    <UserIcon />
                </div>
            )}
        </div>
    );
};

