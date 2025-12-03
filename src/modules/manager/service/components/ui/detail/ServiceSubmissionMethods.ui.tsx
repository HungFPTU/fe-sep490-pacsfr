'use client';

import React, { useState, useEffect } from 'react';
import { useSubmissionMethods } from '@/modules/manager/submission-method/hooks';
import { useAssignSubmissionMethods } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { Loader2, Search, CheckCircle2, Circle, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { getValuesPage } from '@/types/rest';
import { cn } from '@/shared/lib/utils';
import type { SubmissionMethod } from '@/modules/manager/submission-method/types';

interface Props {
    serviceId: string;
    assignedMethodIds?: string[];
}

interface SelectedMethod {
    submissionMethodId: string;
    fee: number;
    processingTime: string;
}

interface FormErrors {
    fee?: string;
    processingTime?: string;
}

export const ServiceSubmissionMethods: React.FC<Props> = ({
    serviceId,
    assignedMethodIds = [],
}) => {
    const { addToast } = useGlobalToast();
    const [selectedMethods, setSelectedMethods] = useState<SelectedMethod[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');

    // Form state
    const [selectedEditingMethod, setSelectedEditingMethod] = useState<SubmissionMethod | null>(null);
    const [tempFee, setTempFee] = useState('');
    const [tempProcessingTime, setTempProcessingTime] = useState('');
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(searchKeyword);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchKeyword]);

    // Fetch submission methods
    const { data: submissionMethodsData, isLoading: isLoadingMethods } = useSubmissionMethods({
        keyword: debouncedKeyword,
        isActive: true,
        page: 1,
        size: 1000,
    });

    const assignMutation = useAssignSubmissionMethods();
    const pageResult = submissionMethodsData ? getValuesPage(submissionMethodsData) : null;
    const submissionMethods = pageResult?.items || [];

    // Initialize selected methods
    useEffect(() => {
        if (submissionMethods.length > 0) {
            const initialMethods = assignedMethodIds
                .map((id) => {
                    const method = submissionMethods.find((m) => m.id === id);
                    return method ? {
                        submissionMethodId: id,
                        fee: method.fee || 0,
                        processingTime: (method.processingTime as string) || ''
                    } : null;
                })
                .filter((m) => m !== null) as SelectedMethod[];
            setSelectedMethods(initialMethods);
        }
        setHasChanges(false);
    }, [assignedMethodIds, submissionMethods]);

    // Select method for editing
    const handleSelectMethod = (method: SubmissionMethod) => {
        const isSelected = selectedMethods.some((m) => m.submissionMethodId === method.id);

        if (isSelected) {
            // Remove method
            setSelectedMethods((prev) => prev.filter((m) => m.submissionMethodId !== method.id));
            setSelectedEditingMethod(null);
            setHasChanges(true);
        } else {
            // Select for editing
            setSelectedEditingMethod(method);
            setTempFee(String(method.fee || 0));
            setTempProcessingTime((method.processingTime as string) || '');
            setFormErrors({});
        }
    };

    // Validate form
    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        const fee = parseInt(tempFee, 10);
        if (isNaN(fee) || fee < 0) {
            errors.fee = 'Vui lòng nhập phí hợp lệ (không âm)';
        }

        if (!tempProcessingTime.trim()) {
            errors.processingTime = 'Vui lòng nhập thời gian xử lý';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Add method to selected and call API immediately
    const handleAddMethod = async () => {
        if (!selectedEditingMethod || !validateForm()) return;

        const fee = parseInt(tempFee, 10);
        const newMethod: SelectedMethod = {
            submissionMethodId: selectedEditingMethod.id,
            fee,
            processingTime: tempProcessingTime.trim()
        };

        // Check if already selected
        const exists = selectedMethods.some((m) => m.submissionMethodId === newMethod.submissionMethodId);
        if (exists) {
            addToast({
                message: 'Phương thức này đã được thêm',
                type: 'error',
            });
            return;
        }

        try {
            // Create request with all selected methods + new method
            const allMethods = [...selectedMethods, newMethod];
            await assignMutation.mutateAsync({
                serviceId,
                methods: allMethods,
            });

            setSelectedMethods(allMethods);
            setHasChanges(false);
            addToast({
                message: `Đã thêm "${selectedEditingMethod.submissionMethodName}" thành công`,
                type: 'success',
            });

            // Reset form
            setSelectedEditingMethod(null);
            setTempFee('');
            setTempProcessingTime('');
            setFormErrors({});
        } catch (error) {
            addToast({
                message: error instanceof Error ? error.message : 'Thêm phương thức thất bại',
                type: 'error',
            });
        }
    };

    // Remove method
    const handleRemoveMethod = (submissionMethodId: string) => {
        setSelectedMethods((prev) => prev.filter((m) => m.submissionMethodId !== submissionMethodId));
        setHasChanges(true);
    };


    if (isLoadingMethods) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const isMethodSelected = selectedMethods.some((m) => m.submissionMethodId === selectedEditingMethod?.id);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="rounded-lg bg-linear-to-r from-indigo-600 to-indigo-700 text-white px-6 py-5 shadow-sm">
                <div>
                    <h3 className="text-lg font-bold">Gán Phương Thức Nộp Hồ Sơ</h3>
                    <p className="text-indigo-100 text-sm mt-1">
                        Chọn phương thức, nhập phí và thời gian xử lý rồi nhấn "Thêm Phương Thức"
                    </p>
                </div>
            </div>

            {/* Main Content - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Methods List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        {/* Search */}
                        <div className="p-4 border-b border-slate-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Methods List */}
                        <div className="overflow-y-auto max-h-96 divide-y divide-slate-200">
                            {submissionMethods.length === 0 ? (
                                <div className="p-6 text-center text-slate-500">
                                    <Circle className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm font-medium">Không có phương thức</p>
                                </div>
                            ) : (
                                submissionMethods.map((method: SubmissionMethod) => {
                                    const isSelected = selectedMethods.some((m) => m.submissionMethodId === method.id);
                                    const isEditing = selectedEditingMethod?.id === method.id;

                                    return (
                                        <button
                                            key={method.id}
                                            onClick={() => handleSelectMethod(method)}
                                            className={cn(
                                                "w-full text-left p-4 transition-all duration-200 hover:bg-indigo-50",
                                                isEditing && "bg-indigo-50 border-l-4 border-indigo-600",
                                                isSelected && !isEditing && "bg-green-50"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5">
                                                    {isSelected ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                    ) : isEditing ? (
                                                        <div className="h-5 w-5 rounded-full border-2 border-indigo-600" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-slate-300" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                                                        {method.submissionMethodName}
                                                    </h4>
                                                    {method.description && (
                                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                                            {method.description}
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

                {/* Right Column - Form & Selected List */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Form Input */}
                    {selectedEditingMethod && (
                        <div className="bg-white rounded-lg border-2 border-indigo-200 p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                        <span className="text-indigo-600 font-bold">
                                            {selectedEditingMethod.submissionMethodName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900">
                                            {selectedEditingMethod.submissionMethodName}
                                        </h4>
                                        {selectedEditingMethod.description && (
                                            <p className="text-sm text-slate-600 mt-1">
                                                {selectedEditingMethod.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Inputs */}
                            <div className="space-y-4">
                                {/* Fee */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        <DollarSign className="h-4 w-4 inline mr-2 text-indigo-600" />
                                        Phí Nộp Hồ Sơ (VND)
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            min="0"
                                            value={tempFee}
                                            onChange={(e) => {
                                                setTempFee(e.target.value);
                                                if (formErrors.fee) setFormErrors((prev) => ({ ...prev, fee: undefined }));
                                            }}
                                            placeholder="0"
                                            className={cn(
                                                "w-full text-lg font-semibold border-2 transition-all",
                                                formErrors.fee
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                    : "border-indigo-200 focus:border-indigo-500 focus:ring-indigo-100"
                                            )}
                                        />
                                    </div>
                                    {formErrors.fee && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {formErrors.fee}
                                        </div>
                                    )}
                                </div>

                                {/* Processing Time */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        <Clock className="h-4 w-4 inline mr-2 text-indigo-600" />
                                        Thời Gian Xử Lý (Số Ngày)
                                    </label>
                                    <Input
                                        type="text"
                                        value={tempProcessingTime}
                                        onChange={(e) => {
                                            setTempProcessingTime(e.target.value);
                                            if (formErrors.processingTime) setFormErrors((prev) => ({ ...prev, processingTime: undefined }));
                                        }}
                                        placeholder="Ví dụ: 02 ngày"
                                        className={cn(
                                            "w-full text-lg font-semibold border-2 transition-all",
                                            formErrors.processingTime
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                : "border-indigo-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        )}
                                    />
                                    {formErrors.processingTime && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {formErrors.processingTime}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={() => {
                                        setSelectedEditingMethod(null);
                                        setFormErrors({});
                                    }}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleAddMethod}
                                    disabled={isMethodSelected || assignMutation.isPending}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                                >
                                    {assignMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                                            Đang thêm...
                                        </>
                                    ) : isMethodSelected ? (
                                        '✓ Đã Thêm'
                                    ) : (
                                        '+ Thêm Phương Thức'
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Selected Methods Summary */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Phương Thức Đã Chọn ({selectedMethods.length})
                        </h3>

                        {selectedMethods.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                <Circle className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                <p className="text-sm">Chưa chọn phương thức nào</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {selectedMethods.map((method) => {
                                    const methodInfo = submissionMethods.find((m) => m.id === method.submissionMethodId);
                                    return (
                                        <div
                                            key={method.submissionMethodId}
                                            className="flex items-center justify-between bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 group hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">
                                                    {methodInfo?.submissionMethodName}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                                                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md">
                                                        <DollarSign className="h-3 w-3 text-indigo-600" />
                                                        <strong className="text-slate-900">
                                                            {method.fee === 0 ? 'Miễn phí' : formatCurrency(method.fee)}
                                                        </strong>
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md">
                                                        <Clock className="h-3 w-3 text-indigo-600" />
                                                        <strong className="text-slate-900">{method.processingTime} ngày</strong>
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveMethod(method.submissionMethodId)}
                                                className="ml-3 p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                title="Xóa"
                                            >
                                                <Circle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
