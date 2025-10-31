"use client";

import React from 'react';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    disabled?: boolean;
    loading?: boolean;
    onStop?: () => void;
    placeholder?: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

const SendIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const StopIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M6 6h12v12H6z" />
    </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSubmit,
    disabled = false,
    loading = false,
    onStop,
    placeholder = 'Hỏi chatbot bất cứ điều gì...',
    inputRef,
}) => {
    return (
        <form onSubmit={onSubmit} className="flex items-center gap-2 md:gap-3">
            <input
                ref={inputRef}
                className="flex-1 rounded-2xl border border-red-300 bg-white/95 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-slate-400 shadow-sm"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || loading}
            />
            {loading && onStop ? (
                <button
                    type="button"
                    onClick={onStop}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition shadow-sm"
                >
                    <StopIcon />
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={!value.trim() || disabled}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-red-700 transition shadow-sm"
                >
                    <SendIcon />
                </button>
            )}
        </form>
    );
};

