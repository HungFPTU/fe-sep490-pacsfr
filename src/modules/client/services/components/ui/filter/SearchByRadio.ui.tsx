"use client";

import type { SearchByType } from "../../../types/filter-options";

interface SearchByRadioProps {
    value: SearchByType;
    onChange: (value: SearchByType) => void;
    className?: string;
}

export const SearchByRadio: React.FC<SearchByRadioProps> = ({
    value,
    onChange,
    className = "",
}) => {
    return (
        <div className={`mb-6 ${className}`}>
            <span className="text-sm font-semibold text-gray-800 block mb-4">Tìm theo:</span>
            <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="radio"
                        name="searchBy"
                        value="department"
                        checked={value === "department"}
                        onChange={(e) => onChange(e.target.value as SearchByType)}
                        className="w-5 h-5 text-red-600 border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        Bộ/ Ban/ Ngành
                    </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="radio"
                        name="searchBy"
                        value="province"
                        checked={value === "province"}
                        onChange={(e) => onChange(e.target.value as SearchByType)}
                        className="w-5 h-5 text-red-600 border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        Tỉnh/ Thành phố
                    </span>
                </label>
            </div>
        </div>
    );
};

