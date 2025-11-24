"use client";

import type { ServiceFilters } from "@/modules/client/services/types/req";
import type { OptionItem } from "@/modules/client/services/types/filter.types";
import { useAdvancedFilters } from "@/modules/client/services/hooks/useAdvancedFilters";
import { SearchableSelect } from "../select/SearchableSelect.ui";
import { SearchByRadio } from "./SearchByRadio.ui";

interface AdvancedSearchFiltersProps {
    filters: ServiceFilters;
    onFiltersChange: (filters: ServiceFilters) => void;
    options: {
        serviceTypes: OptionItem[];
        fields: OptionItem[];
        executionLevels: OptionItem[];
    };
    className?: string;
}

const ONLINE_OPTIONS: OptionItem[] = [
    { id: "true", name: "Có hỗ trợ trực tuyến" },
    { id: "false", name: "Không hỗ trợ trực tuyến" },
];

const STATUS_OPTIONS: OptionItem[] = [
    { id: "true", name: "Hoạt động" },
    { id: "false", name: "Ngừng" },
];

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
    filters,
    onFiltersChange,
    options,
    className = "",
}) => {
    const { searchBy, handleFilterChange } = useAdvancedFilters({
        filters,
        onFiltersChange,
    });

    const handleBooleanChange = (key: keyof ServiceFilters, value: string) => {
        if (!value) {
            handleFilterChange(key, null);
            return;
        }
        handleFilterChange(key, value === "true");
    };

    const onlineValue = typeof filters.onlineAvailable === "boolean" ? String(filters.onlineAvailable) : "";
    const statusValue = typeof filters.isActive === "boolean" ? String(filters.isActive) : "";

    return (
        <div className={`space-y-6 ${className}`}>
            <SearchByRadio
                value={searchBy}
                onChange={(value) => handleFilterChange("searchBy", value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SearchableSelect
                    label="Loại thủ tục"
                    placeholder="Chọn loại thủ tục..."
                    emptyMessage="Không có dữ liệu"
                    options={options.serviceTypes}
                    value={filters.serviceType ?? ""}
                    onChange={(selected) => handleFilterChange("serviceType", selected)}
                />

                <SearchableSelect
                    label="Lĩnh vực"
                    placeholder="Chọn lĩnh vực..."
                    emptyMessage="Không có dữ liệu"
                    options={options.fields}
                    value={filters.field ?? ""}
                    onChange={(selected) => handleFilterChange("field", selected)}
                />

                <SearchableSelect
                    label="Cấp thực hiện"
                    placeholder="Chọn cấp thực hiện..."
                    emptyMessage="Không có dữ liệu"
                    options={options.executionLevels}
                    value={filters.executionLevel ?? ""}
                    onChange={(selected) => handleFilterChange("executionLevel", selected)}
                />

                <SearchableSelect
                    label="Hỗ trợ trực tuyến"
                    placeholder="Chọn trạng thái hỗ trợ..."
                    emptyMessage="Không có dữ liệu"
                    options={ONLINE_OPTIONS}
                    value={onlineValue}
                    onChange={(selected) => handleBooleanChange("onlineAvailable", selected)}
                />

                <SearchableSelect
                    label="Trạng thái hoạt động"
                    placeholder="Chọn trạng thái..."
                    emptyMessage="Không có dữ liệu"
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    onChange={(selected) => handleBooleanChange("isActive", selected)}
                />
            </div>
        </div>
    );
};