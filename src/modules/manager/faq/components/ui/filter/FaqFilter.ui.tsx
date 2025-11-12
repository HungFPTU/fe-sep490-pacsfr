'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';
import { useServices } from '@/modules/manager/service/hooks';
import { useFaqCategories } from '@/modules/manager/faq-category/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { FaqCategory } from '@/modules/manager/faq-category/types';

interface Props {
    keyword: string;
    serviceId: string;
    faqCategoryId: string;
    isActive: boolean;
    onApply: (filters: { keyword: string; serviceId: string; faqCategoryId: string; isActive: boolean }) => void;
    onReset: () => void;
}

export const FaqFilter: React.FC<Props> = ({
    keyword,
    serviceId,
    faqCategoryId,
    isActive,
    onApply,
    onReset,
}) => {
    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState({
        keyword: keyword || '',
        serviceId: serviceId || '',
        faqCategoryId: faqCategoryId || '',
        isActive: isActive,
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            keyword: keyword || '',
            serviceId: serviceId || '',
            faqCategoryId: faqCategoryId || '',
            isActive: isActive,
        });
    }, [keyword, serviceId, faqCategoryId, isActive]);

    const { data: servicesData, isLoading: isLoadingServices } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: faqCategoriesData, isLoading: isLoadingCategories } = useFaqCategories({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const categoryOptions = useMemo(() => {
        const page = faqCategoriesData ? getValuesPage(faqCategoriesData) : null;
        return (page?.items || []) as FaqCategory[];
    }, [faqCategoriesData]);

    const handleApply = () => {
        // Apply filters - trigger API call
        onApply({
            keyword: localFilters.keyword.trim(),
            serviceId: localFilters.serviceId,
            faqCategoryId: localFilters.faqCategoryId,
            isActive: localFilters.isActive,
        });
        onReset();
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: '',
            serviceId: '',
            faqCategoryId: '',
            isActive: true,
        };
        setLocalFilters(resetFilters);
        onApply(resetFilters);
        onReset();
    };

    return (
        <div className="mb-4">
            <div className="flex items-center gap-1 flex-nowrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm theo câu hỏi hoặc câu trả lời..."
                        value={localFilters.keyword || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, keyword: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        className="pl-10"
                    />
                </div>

                {/* Service Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.serviceId || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, serviceId: e.target.value })}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
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

                {/* FAQ Category Filter */}
                <div className="min-w-[180px] mr-3">
                    <select
                        value={localFilters.faqCategoryId || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, faqCategoryId: e.target.value })}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        disabled={isLoadingCategories}
                    >
                        <option value="">Tất cả danh mục</option>
                        {categoryOptions.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="min-w-[160px] mr-3">
                    <select
                        value={String(localFilters.isActive)}
                        onChange={(e) => setLocalFilters({ ...localFilters, isActive: e.target.value === 'true' })}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="true">Đang kích hoạt</option>
                        <option value="false">Ngừng kích hoạt</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <Button
                    onClick={handleApply}
                    size="default"
                    className="whitespace-nowrap mr-2 flex-shrink-0"
                >
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

