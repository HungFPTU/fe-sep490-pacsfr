"use client";

import { useState, useEffect } from "react";
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
import { AdvancedSearchFilters } from "./AdvancedSearchFilters.ui";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";
import type { OptionItem } from "@/modules/client/services/types/filter.types";

interface ServiceFilterOptions {
    serviceTypes: OptionItem[];
    fields: OptionItem[];
    executionLevels: OptionItem[];
}

interface ServiceFiltersProps {
    filters: ServiceFiltersType; // Local filter state (not applied yet)
    activeFilters: ServiceFiltersType; // Currently active filters (applied)
    onFiltersChange: (filters: ServiceFiltersType) => void; // Update local state
    onSearch: (filters: ServiceFiltersType) => void; // Apply filters and search
    onReset: () => void; // Reset and clear filters
    options: ServiceFilterOptions;
    isLoading?: boolean;
    className?: string;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    filters,
    activeFilters,
    onFiltersChange,
    onSearch,
    onReset,
    options,
    isLoading = false,
    className = "",
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [keyword, setKeyword] = useState(filters.keyword || "");

    // Sync local keyword when filters.keyword changes (e.g., from URL params or reset)
    useEffect(() => {
        if (filters.keyword !== keyword) {
            setKeyword(filters.keyword || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.keyword]);

    const handleSearchClick = () => {
        const nextFilters = {
            ...filters,
            keyword: keyword.trim(),
            page: 1,
        };
        onSearch(nextFilters);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    const handleFilterChange = (newFilters: ServiceFiltersType) => {
        onFiltersChange(newFilters);
    };

    const handleApplyAdvanced = () => {
        setDialogOpen(false);
        const nextFilters = {
            ...filters,
            page: 1,
        };
        onSearch(nextFilters);
    };

    const handleReset = () => {
        setDialogOpen(false);
        setKeyword("");
        onReset();
    };

    return (
        <div className={`w-full space-y-4 ${className}`}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-red-300 p-2">
                <div className="flex-1 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Nhập từ khoá tìm kiếm"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            onFiltersChange({
                                ...filters,
                                keyword: e.target.value,
                            });
                        }}
                        onKeyDown={handleKeyPress}
                        className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-2 focus-visible:ring-red-600 text-base"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSearchClick}
                        variant="red"
                        size="default"
                        className="rounded-lg shrink-0"
                        aria-label="Tìm kiếm"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Đang tìm...
                            </span>
                        ) : (
                            <Search className="h-5 w-5" />
                        )}
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
                        >
                            Áp dụng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};