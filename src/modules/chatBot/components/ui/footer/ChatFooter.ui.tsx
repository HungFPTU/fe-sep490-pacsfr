"use client";

import React from 'react';

interface ChatFooterProps {
    hints?: string[];
    onHintClick?: (hint: string) => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ hints, onHintClick }) => {
    const defaultHints = [
        'Tổng quan hệ thống PASCS ?',
        'Hệ thống PASCS có bao nhiêu dịch vụ ?',
        'Thủ tục đăng ký giấy khai sinh ?',
        'Cho tôi thông tin về dịch vụ : Đăng kí khai tử ?',
        'Cho tôi thông tin chi tiết về dịch vụ có mã 1.014562 ?',
    ];

    const displayHints = hints || defaultHints;

    return (
        <div className="flex justify-center flex-wrap gap-2 pb-3">
            {displayHints.map((hint, index) => (
                <button
                    key={index}
                    onClick={() => onHintClick?.(hint)}
                    className="px-4 py-2 text-sm text-red-700 bg-white/80 border border-red-200 rounded-full shadow-sm hover:bg-red-50 hover:border-red-300 transition-all duration-200 cursor-pointer"
                >
                    {hint}
                </button>
            ))}
        </div>
    );
};

