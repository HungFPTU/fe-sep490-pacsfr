'use client';

import React from 'react';
import { InputField } from '@/shared/components/layout/manager/form/BaseForm';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { FormApiOf } from '@/types/types';
import { SERVICE_TYPES, EXECUTION_LEVELS, SERVICE_FIELDS } from '../../../enums';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { useLegalDocuments } from '@/modules/manager/legal-document/hooks';
import { getValuesPage } from '@/types/rest';
import { X } from 'lucide-react';

type FormValues = {
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
    condition: string;
    legislationDocumentIds: string[];
};

type OptionType = {
    value: string;
    label: string;
};

interface Props {

    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const ServiceForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Fetch service groups for dropdown
    const { data: serviceGroupsData } = useServiceGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    // Fetch legal documents for dropdown
    const { data: legalDocumentsData } = useLegalDocuments({
        keyword: '',
        documentType: '',
        status: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as any) : null;
    const serviceGroups = pageResult?.items || [];
    const serviceGroupOptions = serviceGroups.map((group: any): OptionType => ({
        value: group.id,
        label: group.groupName,
    }));

    // Extract legal documents
    const legalDocumentsPageResult = legalDocumentsData ? getValuesPage(legalDocumentsData as any) : null;
    const legalDocuments = legalDocumentsPageResult?.items || [];
    const legalDocumentOptions = legalDocuments.map((doc: any): OptionType => ({
        value: doc.id,
        label: `${doc.documentNumber} - ${doc.name}`,
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Service Group */}
            <form.Field
                name="serviceGroupId"
                validators={{
                    onBlur: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Nhóm dịch vụ là bắt buộc' : undefined,
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="serviceGroupId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Nhóm dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="serviceGroupId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn nhóm dịch vụ</option>
                                {serviceGroupOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Service Code */}
            <form.Field
                name="serviceCode"
                validators={{
                    onBlur: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Mã dịch vụ là bắt buộc';
                        }
                        if (value.trim().length > 50) {
                            return 'Mã dịch vụ không được vượt quá 50 ký tự';
                        }
                        return undefined;
                    },
                }}
            >
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="serviceCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="serviceCode"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isEdit || isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập mã dịch vụ"
                                disabled={isEdit || isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Service Name */}
            <form.Field
                name="serviceName"
                validators={{
                    onBlur: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Tên dịch vụ là bắt buộc';
                        }
                        if (value.trim().length < 3) {
                            return 'Tên dịch vụ phải có ít nhất 3 ký tự';
                        }
                        if (value.trim().length > 255) {
                            return 'Tên dịch vụ không được vượt quá 255 ký tự';
                        }
                        return undefined;
                    },
                }}
            >
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="serviceName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="serviceName"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên dịch vụ"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Service Type */}
            {/* Service Type */}
            <form.Field
                name="serviceType"
                validators={{
                    onBlur: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Loại dịch vụ là bắt buộc' : undefined,
                }}
            >
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="serviceType" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Loại dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="serviceType"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập loại dịch vụ"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>


            <form.Field
                name="executionLevel"
                validators={{
                    onBlur: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Cấp thực hiện là bắt buộc' : undefined,
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="executionLevel" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Cấp thực hiện
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="executionLevel"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập cấp thực hiện"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>


            <form.Field
                name="field"
                validators={{
                    onBlur: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Lĩnh vực là bắt buộc' : undefined,
                }}
            >
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="field" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Lĩnh vực
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="field"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập lĩnh vực"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Decision Number */}
            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="decisionNumber"
                label="Số quyết định"
                placeholder="Nhập số quyết định"
                disabled={isLoading}
            />

            {/* Result Document */}
            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="resultDocument"
                label="Kết quả giải quyết"
                placeholder="Nhập kết quả giải quyết"
                disabled={isLoading}
            />

            {/* Condition */}
            <div className="md:col-span-2">
                <form.Field
                    name="condition"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (value && value.trim().length > 1000) {
                                return 'Điều kiện thực hiện không được vượt quá 1000 ký tự';
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="condition" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Điều kiện thực hiện
                                </label>
                                <textarea
                                    id="condition"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập điều kiện thực hiện dịch vụ"
                                    rows={3}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
                <form.Field
                    name="description"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (value && value.trim().length > 1000) {
                                return 'Mô tả không được vượt quá 1000 ký tự';
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mô tả chi tiết về dịch vụ"
                                    rows={3}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Legal Documents Multi-Select */}
            <div className="md:col-span-2">
                <form.Field name="legislationDocumentIds">
                    {(field: any) => {
                        const selectedLegislationIds = (field.state.value as string[]) || [];
                        const availableLegalDocuments = legalDocumentOptions.filter(
                            (option) => !selectedLegislationIds.includes(option.value)
                        );

                        const handleAddLegalDocument = (documentId: string) => {
                            if (documentId && !selectedLegislationIds.includes(documentId)) {
                                field.handleChange([...selectedLegislationIds, documentId] as never);
                            }
                        };

                        const handleRemoveLegalDocument = (documentId: string) => {
                            const newIds = selectedLegislationIds.filter((id: string) => id !== documentId);
                            field.handleChange(newIds as never);
                        };

                        return (
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Văn bản pháp luật liên quan
                                </label>

                                {/* Add Document Selector */}
                                {availableLegalDocuments.length > 0 ? (
                                    <div className="mb-3">
                                        <select
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed h-10"
                                            onChange={(e) => {
                                                const selectedId = e.target.value;
                                                if (selectedId) {
                                                    handleAddLegalDocument(selectedId);
                                                    e.target.value = ''; // Reset selection
                                                }
                                            }}
                                            disabled={isLoading}
                                            value=""
                                        >
                                            <option value="">Chọn văn bản pháp luật để thêm</option>
                                            {availableLegalDocuments.map((option: OptionType) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : legalDocumentOptions.length > 0 ? (
                                    <div className="mb-3 text-sm text-gray-500 italic py-2">
                                        Đã chọn tất cả văn bản pháp luật có sẵn
                                    </div>
                                ) : (
                                    <div className="mb-3 text-sm text-gray-500 italic py-2">
                                        Không có văn bản pháp luật nào
                                    </div>
                                )}

                                {/* Selected Documents List */}
                                {selectedLegislationIds.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-700">
                                            Đã chọn ({selectedLegislationIds.length} văn bản):
                                        </p>
                                        <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                                            {selectedLegislationIds.map((id: string) => {
                                                const doc = legalDocumentOptions.find((option: OptionType) => option.value === id);
                                                return (
                                                    <div
                                                        key={id}
                                                        className="flex items-center justify-between bg-blue-50 border border-blue-200 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                                                    >
                                                        <span className="text-sm text-gray-700 flex-1">
                                                            {doc?.label || id}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveLegalDocument(id)}
                                                            className="ml-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                                            disabled={isLoading}
                                                            title="Xóa văn bản này"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 italic py-2">
                                        Chưa có văn bản pháp luật nào được chọn
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Toggle Switches */}
            <form.Field name="isOnlineAvailable">
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Hỗ trợ trực tuyến"
                        description={field.state.value ? 'Có hỗ trợ trực tuyến' : 'Không hỗ trợ trực tuyến'}
                        disabled={isLoading}
                        aria-label="Hỗ trợ trực tuyến"
                    />
                )}
            </form.Field>

            <form.Field name="isActive">
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt dịch vụ"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt dịch vụ"
                    />
                )}
            </form.Field>
        </div>
    );
};
