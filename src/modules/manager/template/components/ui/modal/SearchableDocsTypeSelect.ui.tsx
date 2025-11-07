'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useInfiniteDocsTypes } from '@/modules/manager/docs-type/hooks';
import { getValuesPage } from '@/types/rest';
import type { DocsType } from '@/modules/manager/docs-type/types/response';

interface SearchableDocsTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
    error?: string | null;
    isLoading?: boolean;
}

export const SearchableDocsTypeSelect: React.FC<SearchableDocsTypeSelectProps> = ({
    value,
    onChange,
    disabled = false,
    error = null,
    isLoading: externalLoading = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Debounce search keyword
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(searchKeyword);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchKeyword]);

    // Fetch docs types with infinite scroll
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteDocsTypes(debouncedKeyword, '', true, 20);

    // Flatten all pages into a single array
    const allDocsTypes = useMemo(() => {
        if (!data?.pages) return [];
        const allItems: DocsType[] = [];
        data.pages.forEach((page) => {
            const pageResult = getValuesPage(page);
            if (pageResult?.items) {
                allItems.push(...pageResult.items);
            }
        });
        return allItems;
    }, [data]);

    // Find selected docs type
    const selectedDocsType = useMemo(() => {
        return allDocsTypes.find((dt) => dt.id === value);
    }, [allDocsTypes, value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchKeyword('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Infinite scroll observer
    useEffect(() => {
        if (!observerTarget.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(observerTarget.current);

        return () => {
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Focus input when dropdown opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSelect = (docsType: DocsType) => {
        onChange(docsType.id);
        setIsOpen(false);
        setSearchKeyword('');
    };

    const handleToggle = () => {
        if (!disabled && !externalLoading) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchKeyword('');
            }
        }
    };

    const displayValue = selectedDocsType?.docTypeName || 'Chọn loại văn bản';

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={handleToggle}
                disabled={disabled || externalLoading}
                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm text-left flex items-center justify-between ${
                    error
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-slate-300 focus:border-slate-500'
                } ${disabled || externalLoading ? 'bg-slate-100 cursor-not-allowed' : 'cursor-pointer hover:border-slate-400'}`}
            >
                <span className={selectedDocsType ? 'text-slate-900' : 'text-slate-500'}>
                    {displayValue}
                </span>
                <svg
                    className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-xl shadow-lg max-h-80 overflow-hidden flex flex-col">
                    {/* Search Input */}
                    <div className="p-2 border-b border-slate-200">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Tìm kiếm loại văn bản..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                        />
                    </div>

                    {/* Options List */}
                    <div
                        ref={listRef}
                        className="flex-1 overflow-y-auto"
                        style={{ maxHeight: '300px' }}
                    >
                        {isLoading && allDocsTypes.length === 0 ? (
                            <div className="p-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </div>
                        ) : allDocsTypes.length === 0 ? (
                            <div className="p-4 text-center text-sm text-slate-500">
                                Không tìm thấy loại văn bản
                            </div>
                        ) : (
                            <>
                                {allDocsTypes.map((docsType) => (
                                    <button
                                        key={docsType.id}
                                        type="button"
                                        onClick={() => handleSelect(docsType)}
                                        className={`w-full px-3 py-2 text-sm text-left hover:bg-slate-100 transition-colors ${
                                            value === docsType.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-900'
                                        }`}
                                    >
                                        {docsType.docTypeName}
                                    </button>
                                ))}
                                {/* Infinite scroll trigger */}
                                <div ref={observerTarget} className="h-4" />
                                {isFetchingNextPage && (
                                    <div className="p-2 text-center text-xs text-slate-500">
                                        Đang tải thêm...
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-1 text-xs text-red-600">{error}</div>
            )}
        </div>
    );
};

