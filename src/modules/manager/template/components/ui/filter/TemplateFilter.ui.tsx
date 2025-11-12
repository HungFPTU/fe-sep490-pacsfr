'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useDocsTypes } from '@/modules/manager/docs-type/hooks';
import { getValuesPage } from '@/types/rest';
import type { DocsType } from '@/modules/manager/docs-type/types';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    docsTypeId: string;
    onDocsTypeIdChange: (docsTypeId: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
    onRefresh?: () => void;
}

export const TemplateFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    docsTypeId,
    onDocsTypeIdChange,
    isActive,
    onStatusChange,
    onRefresh,
}) => {
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localDocsTypeId, setLocalDocsTypeId] = useState<string>(docsTypeId || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalDocsTypeId(docsTypeId || '');
        setLocalIsActive(isActive);
    }, [keyword, docsTypeId, isActive]);

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
        onKeywordChange(localKeyword);
        onDocsTypeIdChange(localDocsTypeId);
        onStatusChange(localIsActive);
        if (onRefresh) {
            onRefresh();
        }
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
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên hoặc mã..."
            >
                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localDocsTypeId}
                        onChange={(e) => setLocalDocsTypeId(e.target.value)}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        )}
                    >
                        <option value="">Tất cả loại văn bản</option>
                        {docsTypes.map((docsType: DocsType) => (
                            <option key={docsType.id} value={docsType.id}>
                                {docsType.docTypeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        )}
                    >
                        <option value="true">Đang kích hoạt</option>
                        <option value="false">Ngừng kích hoạt</option>
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
};

