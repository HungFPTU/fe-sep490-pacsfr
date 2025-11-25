"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog.ui";
import { useServiceFilters } from "@/modules/client/services/hooks/useServices";
import { useDerivedFilterOptions } from "@/modules/client/services/hooks/useDerivedFilterOptions";
import { AdvancedSearchFilters } from "@/modules/client/services/components/ui/filter/AdvancedSearchFilters.ui";
import { hasAdvancedFilters } from "@/modules/client/services/utils/service-filtering";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";

export function HomeSearch() {
    const router = useRouter();
    const { filters, updateFilter, resetFilters } = useServiceFilters();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    // Get filter options (will use defaults since no services on home page)
    const options = useDerivedFilterOptions([]);

    // Check if there are any filters applied (keyword or advanced filters)
    const hasAnyFilter = useMemo(() => {
        const hasKeyword = Boolean(keyword?.trim() || filters.keyword?.trim());
        const hasAdvanced = hasAdvancedFilters(filters);
        return hasKeyword || hasAdvanced;
    }, [keyword, filters]);

    const listUrl = useMemo(() => {
        const targetFilters: ServiceFiltersType = {
            ...filters,
            keyword: keyword || filters.keyword,
            page: 1,
        };
        const params = new URLSearchParams();
        if (targetFilters.keyword) params.set("keyword", targetFilters.keyword);
        if (targetFilters.serviceType) params.set("serviceType", targetFilters.serviceType);
        if (targetFilters.field) params.set("field", targetFilters.field);
        if (targetFilters.executionLevel) params.set("executionLevel", targetFilters.executionLevel);
        if (typeof targetFilters.onlineAvailable === "boolean") {
            params.set("onlineAvailable", String(targetFilters.onlineAvailable));
        }
        if (typeof targetFilters.isActive === "boolean") {
            params.set("isActive", String(targetFilters.isActive));
        }
        params.set("page", "1");
        const qs = params.toString();
        return `/thu-tuc-hanh-chinh${qs ? `?${qs}` : ""}`;
    }, [filters, keyword]);

    const handleSearchClick = () => {
        // Only redirect if there's a keyword or advanced filters
        if (!hasAnyFilter) {
            return; // Don't redirect if no filters are applied
        }
        
        if (keyword.trim()) {
            updateFilter("keyword", keyword.trim());
        }
        router.push(listUrl);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    const handleFilterChange = (newFilters: ServiceFiltersType) => {
        Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as keyof ServiceFiltersType, value as string | boolean | null);
        });
    };

    const handleApplyAdvanced = () => {
        // Check if there are any filters applied
        const hasKeyword = Boolean(keyword?.trim() || filters.keyword?.trim());
        const hasAdvanced = hasAdvancedFilters(filters);
        
        if (!hasKeyword && !hasAdvanced) {
            // Don't redirect if no filters are applied
            setDialogOpen(false);
            return;
        }
        
        setDialogOpen(false);
        router.push(listUrl);
    };

    const handleReset = () => {
        resetFilters();
        setKeyword("");
        setDialogOpen(false);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-red-300 p-2">
                    <div className="flex-1 flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Nhập từ khoá tìm kiếm"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-2 focus-visible:ring-red-600 text-base"
                        />
                        <Button
                            onClick={handleSearchClick}
                            variant="red"
                            size="default"
                            className="rounded-lg shrink-0"
                            aria-label="Tìm kiếm"
                            disabled={!hasAnyFilter}
                            title={!hasAnyFilter ? "Vui lòng nhập từ khóa hoặc chọn bộ lọc nâng cao" : "Tìm kiếm"}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        onClick={() => setDialogOpen(true)}
                        variant="red"
                        size="default"
                        className="rounded-lg whitespace-nowrap w-full sm:w-auto"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>Tìm kiếm nâng cao</span>
                    </Button>
                </div>
            </div>

            {/* Advanced Search Dialog - Shadcn */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
                        <DialogDescription>
                            Sử dụng các bộ lọc bên dưới để tìm kiếm thủ tục hành chính một cách chính xác hơn
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto py-4 pr-2">
                        <AdvancedSearchFilters
                            filters={filters}
                            onFiltersChange={handleFilterChange}
                            options={options}
                        />
                    </div>
                    <DialogFooter className="flex-shrink-0">
                        <Button
                            variant="outline"
                            onClick={handleReset}
                        >
                            Đặt lại
                        </Button>
                        <Button
                            variant="red"
                            onClick={handleApplyAdvanced}
                            disabled={!hasAnyFilter}
                            title={!hasAnyFilter ? "Vui lòng nhập từ khóa hoặc chọn ít nhất một bộ lọc" : "Áp dụng bộ lọc"}
                        >
                            Áp dụng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

