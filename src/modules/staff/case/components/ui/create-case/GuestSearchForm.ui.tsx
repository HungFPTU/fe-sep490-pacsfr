"use client";

import { Input } from "@/shared/components/ui/input.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { User, Plus } from "lucide-react";
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
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 inline mr-1" />
                    Tìm kiếm khách hàng <span className="text-red-500">*</span>
                </label>
                {onCreateNewGuest && (
                    <Button
                        type="button"
                        onClick={onCreateNewGuest}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        Tạo mới
                    </Button>
                )}
            </div>
            <div className="relative">
                <Input
                    value={searchKeyword}
                    onChange={(e) => onSearchKeywordChange(e.target.value)}
                    placeholder="Nhập tên hoặc số CMND/CCCD..."
                />
                {isSearching && (
                    <div className="absolute right-3 top-3 pointer-events-none">
                        <div className="animate-spin h-5 w-5 text-indigo-600">⟳</div>
                    </div>
                )}
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
        </div>
    );
}

