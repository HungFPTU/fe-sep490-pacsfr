'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDocsTypes } from '@/modules/manager/docs-type/hooks';
import { getValuesPage } from '@/types/rest';
import type { DocsType } from '@/modules/manager/docs-type/types';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    docsTypeId: string;
    onDocsTypeIdChange: (docsTypeId: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
}

export const TemplateFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    docsTypeId,
    onDocsTypeIdChange,
    isActive,
    onStatusChange,
}) => {
    // Local state để tránh gọi API liên tục khi gõ
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localDocsTypeId, setLocalDocsTypeId] = useState<string>(docsTypeId || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    // Đồng bộ khi props thay đổi từ phía ngoài
    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalDocsTypeId(docsTypeId || '');
        setLocalIsActive(isActive);
    }, [keyword, docsTypeId, isActive]);

    // Fetch docs types for dropdown
    const { data: docsTypesData } = useDocsTypes({
        keyword: '',
        groupId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = docsTypesData ? getValuesPage(docsTypesData) : null;
    const docsTypes = pageResult?.items || [];

    const handleApply = () => {
        // Gọi các setter của parent trong cùng một tick → React sẽ batch lại
        onKeywordChange(localKeyword);
        onDocsTypeIdChange(localDocsTypeId);
        onStatusChange(localIsActive);
    };

    const handleReset = () => {
        setLocalKeyword('');
        setLocalDocsTypeId('');
        setLocalIsActive(true);
        onKeywordChange('');
        onDocsTypeIdChange('');
        onStatusChange(true);
    };

    return (
        <div className="mb-4">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc mã..."
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Docs Type */}
                <select
                    value={localDocsTypeId}
                    onChange={(e) => setLocalDocsTypeId(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm focus:border-indigo-500 focus:outline-none min-w-[180px]"
                >
                    <option value="">Tất cả loại văn bản</option>
                    {docsTypes.map((docsType: DocsType) => (
                        <option key={docsType.id} value={docsType.id}>
                            {docsType.docTypeName}
                        </option>
                    ))}
                </select>

                {/* Status */}
                <select
                    value={String(localIsActive)}
                    onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm focus:border-indigo-500 focus:outline-none min-w-[160px]"
                >
                    <option value="true">Đang kích hoạt</option>
                    <option value="false">Ngừng kích hoạt</option>
                </select>

                {/* Actions */}
                <button
                    onClick={handleApply}
                    className="px-4 h-10 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <Search className="w-4 h-4" />
                    Tìm kiếm
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 h-10 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <X className="w-4 h-4" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

