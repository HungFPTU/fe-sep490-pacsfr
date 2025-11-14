'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Faq } from '../../types';

interface FaqListProps {
    faqs: Faq[];
    isLoading?: boolean;
    defaultExpandedId?: string | null;
}

export const FaqList: React.FC<FaqListProps> = ({
    faqs,
    isLoading = false,
    defaultExpandedId = null,
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(defaultExpandedId);

    const toggleQuestion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (faqs.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">
                    Không tìm thấy câu hỏi nào phù hợp với tiêu chí tìm kiếm.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {faqs.map((faq) => {
                const isExpanded = expandedId === faq.id;

                return (
                    <div key={faq.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <button
                            onClick={() => toggleQuestion(faq.id)}
                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                            type="button"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 font-bold text-lg">?</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {faq.question}
                                    </h3>
                                    {isExpanded && (
                                        <div className="mt-4 text-gray-600 leading-relaxed">
                                            {faq.answer.split('\n').map((line, index) => (
                                                <div key={index} className="mb-2">
                                                    {line.startsWith('•') ? (
                                                        <div className="flex items-start">
                                                            <span className="text-red-600 mr-2">•</span>
                                                            <span>{line.substring(1).trim()}</span>
                                                        </div>
                                                    ) : (
                                                        <span>{line}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-shrink-0">
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

