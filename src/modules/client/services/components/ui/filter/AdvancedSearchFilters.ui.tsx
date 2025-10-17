"use client";

import type { ServiceFilters } from "@/modules/client/services/types/req";

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
    const handleFilterChange = (key: keyof ServiceFilters, value: string | boolean | null) => {
        onFiltersChange({
            ...filters,
            [key]: value,
            page: 1, // Reset to first page when filters change
        });
    };

    // Mock data for dropdowns
    const implementingAgencies = [
        { id: "1", name: "Bộ Tài chính" },
        { id: "2", name: "Bộ Nội vụ" },
        { id: "3", name: "Bộ Kế hoạch và Đầu tư" },
        { id: "4", name: "Ủy ban nhân dân cấp xã" },
    ];

    const fields = [
        { id: "1", name: "Thành lập và hoạt động của tổ hợp tác, hợp tác xã" },
        { id: "2", name: "Đăng ký kinh doanh" },
        { id: "3", name: "Thuế và tài chính" },
        { id: "4", name: "Xây dựng và bất động sản" },
    ];

    const implementationLevels = [
        { id: "1", name: "Cấp Xã" },
        { id: "2", name: "Cấp Huyện" },
        { id: "3", name: "Cấp Tỉnh" },
        { id: "4", name: "Cấp Trung ương" },
    ];

    const targetAudiences = [
        { id: "1", name: "Cá nhân" },
        { id: "2", name: "Tổ chức" },
        { id: "3", name: "Doanh nghiệp" },
        { id: "4", name: "Hộ gia đình" },
    ];

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
            {/* Search By Radio Buttons */}
            <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-3">Tìm theo:</span>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="searchBy"
                            value="department"
                            checked={filters.searchBy === 'department'}
                            onChange={(e) => handleFilterChange('searchBy', e.target.value)}
                            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">Bộ/ Ban/ Ngành</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="searchBy"
                            value="province"
                            checked={filters.searchBy === 'province'}
                            onChange={(e) => handleFilterChange('searchBy', e.target.value)}
                            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">Tỉnh/ Thành phố</span>
                    </label>
                </div>
            </div>

            {/* Advanced Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Row */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cơ quan thực hiện</label>
                    <select
                        value={filters.implementingAgency || ""}
                        onChange={(e) => handleFilterChange('implementingAgency', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="">-- Chọn cơ quan --</option>
                        {implementingAgencies.map((agency) => (
                            <option key={agency.id} value={agency.id}>
                                {agency.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lĩnh vực</label>
                    <select
                        value={filters.field || ""}
                        onChange={(e) => handleFilterChange('field', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="">-- Chọn lĩnh vực --</option>
                        {fields.map((field) => (
                            <option key={field.id} value={field.id}>
                                {field.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cấp thực hiện</label>
                    <select
                        value={filters.implementationLevel || ""}
                        onChange={(e) => handleFilterChange('implementationLevel', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="">-- Chọn cấp thực hiện... --</option>
                        {implementationLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Đối tượng thực hiện</label>
                    <select
                        value={filters.targetAudience || ""}
                        onChange={(e) => handleFilterChange('targetAudience', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="">-- Chọn đối tượng --</option>
                        {targetAudiences.map((audience) => (
                            <option key={audience.id} value={audience.id}>
                                {audience.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};