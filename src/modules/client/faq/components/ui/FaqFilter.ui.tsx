'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/forms/Input.com';
import { Search } from 'lucide-react';
import type { FaqCategory } from '../../types';

interface FaqFilterProps {
    keyword: string;
    onKeywordChange: (value: string) => void;
    selectedCategoryId: string;
    onCategoryChange: (categoryId: string) => void;
    categories: FaqCategory[];
    isLoading?: boolean;
    onSearch: () => void;
    onReset: () => void;
}

export const FaqFilter: React.FC<FaqFilterProps> = ({
    keyword,
    onKeywordChange,
    selectedCategoryId,
    onCategoryChange,
    categories,
    isLoading = false,
    onSearch,
    onReset,
}) => {
    // Unified height for all input/button/select
    // Input height: typically h-10 or 40px (Tailwind's h-10), adjust as needed
    // Apply same height/classes to select and buttons
    const inputClassName = "w-full h-10"; // 40px height
    const selectClassName =
        "w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const buttonClassName = "h-10 px-4 flex items-center gap-2";

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch();
                }}
                className="flex flex-col md:flex-row gap-4"
            >
                <div className="flex-1 flex flex-col justify-end">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập từ khóa
                    </label>
                    <Input
                        type="text"
                        value={keyword}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        placeholder="Nhập từ khóa tìm kiếm"
                        disabled={isLoading}
                        className={inputClassName}
                    />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục
                    </label>
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        disabled={isLoading}
                        className={selectClassName}
                    >
                        <option value="">Tất cả</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end gap-2 md:pt-6 pt-0">
                    <Button
                        type="submit"
                        variant="red"
                        disabled={isLoading}
                        className={buttonClassName}
                    >
                        <Search className="w-4 h-4" />
                        Tìm kiếm
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onReset}
                        disabled={isLoading}
                        className={buttonClassName}
                    >
                        Đặt lại
                    </Button>
                </div>
            </form>
        </div>
    );
};
