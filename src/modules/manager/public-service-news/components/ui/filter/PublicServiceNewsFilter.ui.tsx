"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useServices } from "@/modules/manager/service/hooks";
import { useNewsCategories } from "@/modules/manager/news-category/hooks";
import { useStaffs } from "@/modules/manager/staff";
import { getValues, getValuesPage } from "@/types/rest";
import type { Service } from "@/modules/manager/service/types";
import type { NewsCategory } from "@/modules/manager/news-category/types";
import type { Staff } from "@/modules/manager/staff/types";
import { ManagerFilterBar } from "@/shared/components/manager/ui";

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
        <div className="mb-5">
            <ManagerFilterBar
                searchValue={localFilters.keyword}
                onSearchChange={(value) => setLocalFilters((prev) => ({ ...prev, keyword: value }))}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tiêu đề hoặc mã bài viết..."
                className="flex-nowrap overflow-x-auto"
            >
                <div className="shrink-0 w-[190px]">
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

                <div className="shrink-0 w-[190px]">
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

                <div className="shrink-0 w-[190px]">
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

                <div className="shrink-0 w-[170px]">
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
            </ManagerFilterBar>
        </div>
    );
};
