"use client";

import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { cn } from "@/shared/lib/utils";
import { useSearchableSelect } from "../../../hooks/useSearchableSelect";
import type { SearchableSelectProps } from "../../../types/filter.types";

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    label,
    placeholder,
    emptyMessage,
    options,
    value,
    onChange,
    className,
}) => {
    const {
        query,
        open,
        containerRef,
        filteredOptions,
        selectedOption,
        handleToggle,
        handleClear,
        handleSelect,
        setQuery,
    } = useSearchableSelect({
        options,
        value,
        onChange,
    });

    return (
        <div ref={containerRef} className={cn("space-y-3", className)}>
            <label className="text-sm font-semibold text-gray-800">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={handleToggle}
                    className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 shadow-inner transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-0",
                        selectedOption ? "text-gray-900" : "text-gray-400",
                    )}
                    aria-expanded={open}
                >
                    <span className="truncate">
                        {selectedOption ? selectedOption.name : placeholder}
                    </span>
                    <span className="flex items-center gap-1">
                        {selectedOption ? (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors duration-150 hover:border-gray-300 hover:text-gray-600"
                                aria-label="Xóa lựa chọn"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        ) : null}
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </span>
                </button>

                {open ? (
                    <div className="absolute left-0 right-0 z-30 mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                        <div className="relative px-4 pt-3">
                            <Search className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                                placeholder={`Tìm kiếm ${label.toLowerCase()}...`}
                                autoFocus
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-8 py-2 text-sm text-gray-700 transition-all duration-150 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto py-2">
                            {filteredOptions.length === 0 ? (
                                <p className="px-4 py-3 text-sm text-gray-500">{emptyMessage}</p>
                            ) : (
                                filteredOptions.map((option) => {
                                    const isSelected = option.id === selectedOption?.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => handleSelect(option.id)}
                                            className={cn(
                                                "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors duration-150",
                                                isSelected ? "bg-red-50 text-red-600" : "hover:bg-gray-50 text-gray-700",
                                            )}
                                        >
                                            <span className={cn("truncate", isSelected && "font-semibold")}>
                                                {option.name}
                                            </span>
                                            {isSelected ? (
                                                <Check className="h-4 w-4 shrink-0 text-red-500" />
                                            ) : null}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

