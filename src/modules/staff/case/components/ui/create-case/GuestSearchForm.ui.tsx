"use client";

import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Search, User, Check } from "lucide-react";
import type { Guest } from "../../../../dashboard/types";

interface GuestSearchFormProps {
    searchKeyword: string;
    isSearching: boolean;
    searchResults: Guest[];
    selectedGuest: Guest | null;
    showDropdown: boolean;
    onSearchKeywordChange: (keyword: string) => void;
    onSearch: () => void;
    onSelectGuest: (guest: Guest) => void;
    onToggleDropdown?: () => void;
}

export function GuestSearchForm({
    searchKeyword,
    isSearching,
    searchResults,
    selectedGuest,
    showDropdown,
    onSearchKeywordChange,
    onSearch,
    onSelectGuest,
}: GuestSearchFormProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Tìm kiếm khách hàng <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                        value={searchKeyword}
                        onChange={(e) => onSearchKeywordChange(e.target.value)}
                        placeholder="Nhập tên hoặc số CMND/CCCD (để trống để xem tất cả)..."
                        disabled={isSearching}
                        onKeyDown={(e) => { 
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onSearch();
                            }
                        }}
                    />
                </div>
                <Button
                    type="button"
                    onClick={onSearch}
                    disabled={isSearching}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? "Đang tìm..." : "Tìm kiếm"}
                </Button>
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
                <div className="mt-2 border border-gray-300 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((guest) => (
                        <button
                            key={guest.id}
                            type="button"
                            onClick={() => onSelectGuest(guest)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors"
                        >
                            <div className="font-medium text-gray-900">{guest.fullName}</div>
                            <div className="text-sm text-gray-600">CMND/CCCD: {guest.idNumber}</div>
                            <div className="text-xs text-gray-500 mt-1">
                                Mã: {guest.guestCode} • SĐT: {guest.phone}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Selected Guest Display */}
            {selectedGuest && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">
                                Đã chọn: {selectedGuest.fullName}
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                                CMND/CCCD: {selectedGuest.idNumber} • Guest ID: {selectedGuest.id}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

