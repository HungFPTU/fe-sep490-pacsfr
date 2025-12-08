'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useServices } from '@/modules/manager/service/hooks';
import { useDocsTypes } from '@/modules/manager/docs-type/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { DocsType } from '@/modules/manager/docs-type/types';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    serviceId: string;
    docTypeId: string;
    isActive: boolean;
    onApply: (filters: { keyword: string; serviceId: string; docTypeId: string; isActive: boolean }) => void;
    onReset: () => void;
}

export const RequiredDocumentFilter: React.FC<Props> = ({
    keyword,
    serviceId,
    docTypeId,
    isActive,
    onApply,
    onReset,
}) => {
    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState({
        keyword: keyword || '',
        serviceId: serviceId || '',
        docTypeId: docTypeId || '',
        isActive: isActive,
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            keyword: keyword || '',
            serviceId: serviceId || '',
            docTypeId: docTypeId || '',
            isActive: isActive,
        });
    }, [keyword, serviceId, docTypeId, isActive]);

    const { data: servicesData, isLoading: isLoadingServices } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: docsTypesData, isLoading: isLoadingDocsTypes } = useDocsTypes({
        keyword: '',
        groupId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const docTypeOptions = useMemo(() => {
        const page = docsTypesData ? getValuesPage(docsTypesData) : null;
        return (page?.items || []) as DocsType[];
    }, [docsTypesData]);

    const handleApply = () => {
        // Apply filters - trigger API call
        onApply({
            keyword: localFilters.keyword.trim(),
            serviceId: localFilters.serviceId,
            docTypeId: localFilters.docTypeId,
            isActive: localFilters.isActive,
        });
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: '',
            serviceId: '',
            docTypeId: '',
            isActive: true,
        };
        setLocalFilters(resetFilters);
        onApply(resetFilters);
        onReset();
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localFilters.keyword || ''}
                onSearchChange={(value: string) => setLocalFilters((prev) => ({ ...prev, keyword: value }))}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo mô tả, tên dịch vụ..."
            >
                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.serviceId || ''}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, serviceId: e.target.value }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        disabled={isLoadingServices}
                    >
                        <option value="">Tất cả dịch vụ</option>
                        {serviceOptions.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.serviceName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.docTypeId || ''}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, docTypeId: e.target.value }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        disabled={isLoadingDocsTypes}
                    >
                        <option value="">Tất cả loại giấy tờ</option>
                        {docTypeOptions.map((docType) => (
                            <option key={docType.id} value={docType.id}>
                                {docType.docTypeName || docType.docTypeCode}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={String(localFilters.isActive)}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="true">Đang áp dụng</option>
                        <option value="false">Ngừng áp dụng</option>
                    </select>
                </div> */}
            </ManagerFilterBar>
        </div>
    );
};

