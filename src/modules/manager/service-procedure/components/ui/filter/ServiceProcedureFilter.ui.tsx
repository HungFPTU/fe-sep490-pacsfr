'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useServices } from '@/modules/manager/service/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    serviceId: string;
    onServiceIdChange: (serviceId: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
    onRefresh?: () => void;
}

export const ServiceProcedureFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    serviceId,
    onServiceIdChange,
    isActive,
    onStatusChange,
    onRefresh,
}) => {
    const [localKeyword, setLocalKeyword] = useState(keyword);
    const [localServiceId, setLocalServiceId] = useState(serviceId);
    const [localIsActive, setLocalIsActive] = useState(isActive);

    useEffect(() => {
        setLocalKeyword(keyword || '');
    }, [keyword]);

    useEffect(() => {
        setLocalServiceId(serviceId || '');
    }, [serviceId]);

    useEffect(() => {
        setLocalIsActive(isActive);
    }, [isActive]);

    const { data: serviceData } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = serviceData ? getValuesPage(serviceData) : null;
        return (page?.items || []) as Service[];
    }, [serviceData]);

    const handleApply = () => {
        onKeywordChange(localKeyword);
        onServiceIdChange(localServiceId);
        onStatusChange(localIsActive);
        onRefresh?.();
    };

    const handleReset = () => {
        setLocalKeyword('');
        setLocalServiceId('');
        setLocalIsActive(true);
        onKeywordChange('');
        onServiceIdChange('');
        onStatusChange(true);
        onRefresh?.();
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên bước, đơn vị..."
            >
                <div className="w-full shrink-0 sm:w-[220px]">
                    <select
                        value={localServiceId}
                        onChange={(e) => setLocalServiceId(e.target.value)}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        )}
                    >
                        <option value="">Tất cả dịch vụ</option>
                        {serviceOptions.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.serviceName}
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
