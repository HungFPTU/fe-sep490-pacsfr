'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';
import { useServices } from '@/modules/manager/service/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';

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
            <div className="flex items-center gap-1 flex-nowrap">
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm theo tên bước, đơn vị..."
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        className="pl-10"
                    />
                </div>

                <div className="min-w-[220px] mr-3">
                    <select
                        value={localServiceId}
                        onChange={(e) => setLocalServiceId(e.target.value)}
                        className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
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

                <div className="min-w-[170px] mr-3">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        )}
                    >
                        <option value="true">Đang kích hoạt</option>
                        <option value="false">Ngừng kích hoạt</option>
                    </select>
                </div>

                <Button onClick={handleApply} size="default" className="whitespace-nowrap mr-2 flex-shrink-0">
                    <Search className="h-4 w-4 mr-1" />
                    Tìm kiếm
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    size="default"
                    className="whitespace-nowrap flex-shrink-0"
                >
                    <X className="h-4 w-4 mr-1" />
                    Đặt lại
                </Button>
            </div>
        </div>
    );
};
