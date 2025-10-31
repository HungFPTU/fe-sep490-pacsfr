"use client";

import React from 'react';

interface ChatFooterProps {
    hints?: string[];
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ hints }) => {
    const defaultHints = [
        'Các giấy tờ cần thiết để làm thủ tục công chứng',
        'Thủ tục đăng ký giấy kết hôn',
    ];

    const displayHints = hints || defaultHints;

    return (
        <div className="mt-2 text-center text-xs text-red-800/70">
            Gợi ý: {displayHints.join(', ')}
        </div>
    );
};

