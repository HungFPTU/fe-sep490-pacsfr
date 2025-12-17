'use client';

import React, { useState, useEffect } from 'react';
import { useTargetAudiences } from '@/modules/manager/target-audience/hooks';
import { useAssignAudience } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { Loader2, Search, CheckCircle2, Circle, Users, X } from 'lucide-react';
import { getValuesPage } from '@/types/rest';
import { cn } from '@/shared/lib/utils';
import type { TargetAudience } from '@/modules/manager/target-audience/types';

interface Props {
    serviceId: string;
    assignedAudienceIds?: string[];
}

export const ServiceAudiences: React.FC<Props> = ({
    serviceId,
    assignedAudienceIds = [],
}) => {
    const { addToast } = useGlobalToast();
    const [selectedAudienceIds, setSelectedAudienceIds] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(searchKeyword);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchKeyword]);

    // Fetch target audiences
    const { data: audiencesData, isLoading: isLoadingAudiences } = useTargetAudiences({
        keyword: debouncedKeyword,
        isActive: true,
        page: 1,
        size: 1000,
    });

    const assignMutation = useAssignAudience();
    const pageResult = audiencesData ? getValuesPage(audiencesData) : null;
    const audiences = pageResult?.items || [];

    // Initialize selected audiences
    useEffect(() => {
        setSelectedAudienceIds(assignedAudienceIds);
        setHasChanges(false);
    }, [assignedAudienceIds]);

    // Toggle audience selection
    const handleToggleAudience = (audienceId: string) => {
        const isSelected = selectedAudienceIds.includes(audienceId);
        const newSelectedIds = isSelected
            ? selectedAudienceIds.filter((id) => id !== audienceId)
            : [...selectedAudienceIds, audienceId];
        
        setSelectedAudienceIds(newSelectedIds);
        setHasChanges(true);
    };

    // Save changes
    const handleSave = async () => {
        try {
            await assignMutation.mutateAsync({
                serviceId,
                audienceIds: selectedAudienceIds,
            });

            setHasChanges(false);
            addToast({
                message: 'Gán đối tượng thành công',
                type: 'success',
            });
        } catch (error) {
            addToast({
                message: error instanceof Error ? error.message : 'Gán đối tượng thất bại',
                type: 'error',
            });
        }
    };

    if (isLoadingAudiences) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-5 shadow-sm">
                <div>
                    <h3 className="text-lg font-bold">Gán Đối Tượng</h3>
                    <p className="text-indigo-100 text-sm mt-1">
                        Chọn các đối tượng áp dụng cho dịch vụ này
                    </p>
                </div>
            </div>

            {/* Main Content - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Audiences List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        {/* Search */}
                        <div className="p-4 border-b border-slate-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm đối tượng..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Audiences List */}
                        <div className="overflow-y-auto max-h-96 divide-y divide-slate-200">
                            {audiences.length === 0 ? (
                                <div className="p-6 text-center text-slate-500">
                                    <Circle className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm font-medium">Không có đối tượng</p>
                                </div>
                            ) : (
                                audiences.map((audience: TargetAudience) => {
                                    const isSelected = selectedAudienceIds.includes(audience.id);

                                    return (
                                        <button
                                            key={audience.id}
                                            onClick={() => handleToggleAudience(audience.id)}
                                            className={cn(
                                                "w-full text-left p-4 transition-all duration-200 hover:bg-indigo-50",
                                                isSelected && "bg-green-50"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5">
                                                    {isSelected ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-slate-300" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                                                        {audience.name}
                                                    </h4>
                                                    {audience.description && (
                                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                                            {audience.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Selected Summary & Save Button */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Selected Audiences Summary */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Đối Tượng Đã Chọn ({selectedAudienceIds.length})
                        </h3>

                        {selectedAudienceIds.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                <Users className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                <p className="text-sm">Chưa chọn đối tượng nào</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {selectedAudienceIds.map((audienceId) => {
                                    const audience = audiences.find((a) => a.id === audienceId);
                                    if (!audience) return null;

                                    return (
                                        <div
                                            key={audienceId}
                                            className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 group hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">
                                                    {audience.name}
                                                </p>
                                                {audience.description && (
                                                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                                                        {audience.description}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleToggleAudience(audienceId)}
                                                className="ml-3 p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                title="Bỏ chọn"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    {hasChanges && (
                        <Button
                            onClick={handleSave}
                            disabled={assignMutation.isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                        >
                            {assignMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                                    Đang lưu...
                                </>
                            ) : (
                                'Lưu thay đổi'
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

