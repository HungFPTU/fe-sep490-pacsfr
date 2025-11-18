"use client";

import type { ServiceFilters } from "@/modules/client/services/types/req";
import {
    useImplementingAgencies,
    useFields,
    useImplementationLevels,
    useTargetAudiences,
} from "@/modules/client/services/hooks/useFilterOptions";
import { useAdvancedFilters } from "@/modules/client/services/hooks/useAdvancedFilters";
import { SearchableSelect } from "../select/SearchableSelect.ui";
import { SearchByRadio } from "./SearchByRadio.ui";

interface AdvancedSearchFiltersProps {
    filters: ServiceFilters;
    onFiltersChange: (filters: ServiceFilters) => void;
    className?: string;
}

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
    filters,
    onFiltersChange,
    className = "",
}) => {
    const { searchBy, handleFilterChange } = useAdvancedFilters({
        filters,
        onFiltersChange,
    });

    // Get filter options based on searchBy type
    const implementingAgencies = useImplementingAgencies(searchBy);
    const fields = useFields(searchBy);
    const implementationLevels = useImplementationLevels(searchBy);
    const targetAudiences = useTargetAudiences(searchBy);

    return (
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
            {/* Search By Radio Buttons */}
            <SearchByRadio
                value={searchBy}
                onChange={(value) => handleFilterChange("searchBy", value)}
            />

            {/* Advanced Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Row */}
                <SearchableSelect
                    label="Cơ quan thực hiện"
                    placeholder="Chọn cơ quan thực hiện..."
                    emptyMessage="Không tìm thấy cơ quan phù hợp"
                    options={implementingAgencies}
                    value={filters.implementingAgency ?? ""}
                    onChange={(selected) => handleFilterChange("implementingAgency", selected)}
                />

                <SearchableSelect
                    label="Lĩnh vực"
                    placeholder="Chọn lĩnh vực..."
                    emptyMessage="Không tìm thấy lĩnh vực phù hợp"
                    options={fields}
                    value={filters.field ?? ""}
                    onChange={(selected) => handleFilterChange("field", selected)}
                />

                {/* Second Row */}
                <SearchableSelect
                    label="Cấp thực hiện"
                    placeholder="Chọn cấp thực hiện..."
                    emptyMessage="Không tìm thấy cấp thực hiện phù hợp"
                    options={implementationLevels}
                    value={filters.implementationLevel ?? ""}
                    onChange={(selected) => handleFilterChange("implementationLevel", selected)}
                />

                <SearchableSelect
                    label="Đối tượng thực hiện"
                    placeholder="Chọn đối tượng thực hiện..."
                    emptyMessage="Không tìm thấy đối tượng phù hợp"
                    options={targetAudiences}
                    value={filters.targetAudience ?? ""}
                    onChange={(selected) => handleFilterChange("targetAudience", selected)}
                />
            </div>
        </div>
    );
};