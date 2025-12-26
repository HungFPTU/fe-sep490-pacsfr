"use client";

import React from "react";
import { User, Plus, Search, Loader2, Phone, CreditCard } from "lucide-react";
import type { Guest } from "../../../../dashboard/types";

interface GuestSearchFormProps {
    searchKeyword: string;
    isSearching: boolean;
    searchResults: Guest[];
    selectedGuest: Guest | null;
    showDropdown: boolean;
    onSearchKeywordChange: (keyword: string) => void;
    onSelectGuest: (guest: Guest) => void;
    onCreateNewGuest?: () => void;
    onToggleDropdown?: () => void;
}

export function GuestSearchForm({
    searchKeyword,
    isSearching,
    searchResults,
    selectedGuest,
    showDropdown,
    onSearchKeywordChange,
    onSelectGuest,
    onCreateNewGuest,
}: GuestSearchFormProps) {
    const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";
    const inputClass = "w-full h-10 px-3 pl-10 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <label className={labelClass}>
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Tìm kiếm khách hàng <span className="text-red-500">*</span>
                </label>
                {onCreateNewGuest && (
                    <button
                        type="button"
                        onClick={onCreateNewGuest}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Tạo mới
                    </button>
                )}
            </div>

            {/* Search Input */}
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                </div>
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => onSearchKeywordChange(e.target.value)}
                    placeholder="Nhập tên hoặc số CMND/CCCD..."
                    className={inputClass}
                />
                {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                    </div>
                )}
            </div>

            {/* Selected Guest Display */}
            {selectedGuest && (
                <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-indigo-600">
                            {selectedGuest.fullName?.charAt(0)?.toUpperCase() || 'K'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-indigo-900">{selectedGuest.fullName}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-indigo-700">
                            <span className="flex items-center gap-1">
                                <CreditCard className="w-3 h-3" />
                                {selectedGuest.idNumber}
                            </span>
                            <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {selectedGuest.phone}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((guest) => (
                        <button
                            key={guest.id}
                            type="button"
                            onClick={() => onSelectGuest(guest)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-semibold text-gray-600">
                                        {guest.fullName?.charAt(0)?.toUpperCase() || 'K'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{guest.fullName}</p>
                                    <p className="text-xs text-gray-500">
                                        CCCD: {guest.idNumber} • SĐT: {guest.phone}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
