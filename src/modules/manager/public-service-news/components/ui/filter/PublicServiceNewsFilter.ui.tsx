"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { cn } from "@/shared/lib/utils";
import { useServices } from "@/modules/manager/service/hooks";
import { useNewsCategories } from "@/modules/manager/news-category/hooks";
import { useStaffs } from "@/modules/manager/staff";
import { getValues, getValuesPage } from "@/types/rest";
import type { Service } from "@/modules/manager/service/types";
import type { NewsCategory } from "@/modules/manager/news-category/types";
import type { Staff } from "@/modules/manager/staff/types";

interface Props {
    keyword: string;
    serviceId: string;
    newsCategoryId: string;
    staffId: string;
    isPublished: boolean;
    onApply: (filters: {
        keyword: string;
        serviceId: string;
        newsCategoryId: string;
        staffId: string;
        isPublished: boolean;
    }) => void;
    onReset: () => void;
}

export const PublicServiceNewsFilter: React.FC<Props> = ({
    keyword,
    serviceId,
    newsCategoryId,
    staffId,
    isPublished,
    onApply,
    onReset,
}) => {
    const [localFilters, setLocalFilters] = useState({
        keyword: keyword || "",
        serviceId: serviceId || "",
        newsCategoryId: newsCategoryId || "",
        staffId: staffId || "",
        isPublished,
    });

    useEffect(() => {
        setLocalFilters({
            keyword: keyword || "",
            serviceId: serviceId || "",
            newsCategoryId: newsCategoryId || "",
            staffId: staffId || "",
            isPublished,
        });
    }, [keyword, serviceId, newsCategoryId, staffId, isPublished]);

    const { data: servicesData } = useServices({
        keyword: "",
        serviceGroupId: "",
        legalBasisId: "",
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: categoriesData } = useNewsCategories({
        keyword: "",
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: staffsData } = useStaffs({
        IsActive: true,
        PageSize: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const categoryOptions = useMemo(() => {
        const page = categoriesData ? getValuesPage(categoriesData) : null;
        return (page?.items || []) as NewsCategory[];
    }, [categoriesData]);

    const staffOptions = useMemo(() => {
        if (!staffsData) return [] as Staff[];
        return getValues(staffsData) as Staff[];
    }, [staffsData]);

    const handleApply = () => {
        onApply({
            keyword: localFilters.keyword.trim(),
            serviceId: localFilters.serviceId,
            newsCategoryId: localFilters.newsCategoryId,
            staffId: localFilters.staffId,
            isPublished: localFilters.isPublished,
        });
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: "",
            serviceId: "",
            newsCategoryId: "",
            staffId: "",
            isPublished: true,
        };
        setLocalFilters(resetFilters);
        onApply(resetFilters);
        onReset();
    };

    return (
        <div className="mb-5 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[260px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề, slug..."
                        value={localFilters.keyword}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleApply();
                            }
                        }}
                        className="pl-10"
                    />
                </div>

                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.serviceId}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, serviceId: e.target.value }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        )}
                    >
                        <option value="">Tất cả dịch vụ</option>
                        {serviceOptions.map((serviceOption) => (
                            <option key={serviceOption.id} value={serviceOption.id}>
                                {serviceOption.serviceName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.newsCategoryId}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, newsCategoryId: e.target.value }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        )}
                    >
                        <option value="">Tất cả danh mục</option>
                        {categoryOptions.map((categoryOption) => (
                            <option key={categoryOption.id} value={categoryOption.id}>
                                {categoryOption.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.staffId}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, staffId: e.target.value }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        )}
                    >
                        <option value="">Tất cả nhân viên</option>
                        {staffOptions.map((staffOption) => (
                            <option key={staffOption.id} value={staffOption.id}>
                                {staffOption.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={String(localFilters.isPublished)}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, isPublished: e.target.value === "true" }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        )}
                    >
                        <option value="true">Đã xuất bản</option>
                        <option value="false">Nháp</option>
                    </select>

                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={handleApply} size="default" className="shrink-0">
                        <Search className="h-4 w-4 mr-1" />
                        Tìm kiếm
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="default" className="shrink-0">
                        <X className="h-4 w-4 mr-1" />
                        Đặt lại
                    </Button>
                </div>
            </div>
        </div>
    );
};
