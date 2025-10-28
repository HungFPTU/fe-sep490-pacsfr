'use client';

import React, { useState, useEffect } from 'react';
import { InputField, TextareaField, SelectField } from '@/shared/components/layout/manager/form/BaseForm';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { FormApiOf } from '@/types/types';
import { SERVICE_TYPES, EXECUTION_LEVELS, SERVICE_FIELDS } from '../../../enums';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { useLegalDocuments } from '@/modules/manager/legal-document/hooks';
import { getValuesPage } from '@/types/rest';

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
    legislationDocumentIds: string[];
};

type OptionType = {
    value: string;
    label: string;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const ServiceForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Local state for toggle switches to ensure reactivity
    const [isOnlineAvailable, setIsOnlineAvailable] = useState(form.getFieldValue('isOnlineAvailable') || false);
    const [isActive, setIsActive] = useState(form.getFieldValue('isActive') || false);

    // Sync local state with form values
    useEffect(() => {
        setIsOnlineAvailable(form.getFieldValue('isOnlineAvailable') || false);
        setIsActive(form.getFieldValue('isActive') || false);
    }, [form]);

    // Handle toggle changes
    const handleOnlineAvailableChange = (checked: boolean) => {
        setIsOnlineAvailable(checked);
        form.setFieldValue('isOnlineAvailable', checked);
    };

    const handleActiveChange = (checked: boolean) => {
        setIsActive(checked);
        form.setFieldValue('isActive', checked);
    };
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as any) : null;
    const serviceGroups = pageResult?.items || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceGroupOptions = serviceGroups.map((group: any): OptionType => ({
        value: group.id,
        label: group.groupName,
    }));

    // Prepare legal document options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legalDocumentsPageResult = legalDocumentsData ? getValuesPage(legalDocumentsData as any) : null;
    const legalDocuments = legalDocumentsPageResult?.items || [];
    const legalDocumentOptions = legalDocuments.map((doc: any): OptionType => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        value: doc.id,
        label: `${doc.documentNumber} - ${doc.name}`,
    }));

    // Get selected legal document IDs
    const selectedLegislationIds = form.getFieldValue('legislationDocumentIds') || [];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
                name="serviceGroupId"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Nhóm dịch vụ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="serviceGroupId"
                        label="Nhóm dịch vụ"
                        required
                        options={serviceGroupOptions}
                        placeholder="Chọn nhóm dịch vụ"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <form.Field
                name="serviceCode"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Mã dịch vụ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="serviceCode"
                        label="Mã dịch vụ"
                        required
                        placeholder="Nhập mã dịch vụ"
                        disabled={isEdit || isLoading}
                    />
                )}
            </form.Field>

            <form.Field
                name="serviceName"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Tên dịch vụ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="serviceName"
                        label="Tên dịch vụ"
                        required
                        placeholder="Nhập tên dịch vụ"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <form.Field
                name="serviceType"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Loại dịch vụ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="serviceType"
                        label="Loại dịch vụ"
                        required
                        options={Array.from(SERVICE_TYPES)}
                        placeholder="Chọn loại dịch vụ"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <form.Field
                name="executionLevel"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Cấp thực hiện là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="executionLevel"
                        label="Cấp thực hiện"
                        required
                        options={Array.from(EXECUTION_LEVELS)}
                        placeholder="Chọn cấp thực hiện"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <form.Field
                name="field"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Lĩnh vực là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="field"
                        label="Lĩnh vực"
                        required
                        options={Array.from(SERVICE_FIELDS)}
                        placeholder="Chọn lĩnh vực"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="decisionNumber"
                label="Số quyết định"
                placeholder="Nhập số quyết định"
                disabled={isLoading}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="resultDocument"
                label="Kết quả giải quyết"
                placeholder="Nhập kết quả giải quyết"
                disabled={isLoading}
            />

            <div className="md:col-span-2">
                <TextareaField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả chi tiết về dịch vụ"
                    rows={3}
                    disabled={isLoading}
                />
            </div>

            {/* Legal Documents Selection */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Văn bản pháp luật liên quan
                </label>
                <div className="space-y-3">
                    <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            if (selectedId && !selectedLegislationIds.includes(selectedId)) {
                                form.setFieldValue('legislationDocumentIds', [...selectedLegislationIds, selectedId]);
                            }
                        }}
                        disabled={isLoading}
                    >
                        <option value="">Chọn văn bản pháp luật</option>
                        {legalDocumentOptions.map((option: OptionType) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Selected Documents */}
                    {selectedLegislationIds.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Văn bản đã chọn:</p>
                            <div className="space-y-1">
                                {selectedLegislationIds.map((id: string) => {
                                    const doc = legalDocumentOptions.find((option: OptionType) => option.value === id);
                                    return (
                                        <div key={id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                                            <span className="text-sm text-gray-700">
                                                {doc?.label || id}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newIds = selectedLegislationIds.filter((docId: string) => docId !== id);
                                                    form.setFieldValue('legislationDocumentIds', newIds);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                disabled={isLoading}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ToggleSwitch
                checked={isOnlineAvailable}
                onChange={handleOnlineAvailableChange}
                label="Hỗ trợ trực tuyến"
                description={isOnlineAvailable ? 'Có hỗ trợ trực tuyến' : 'Không hỗ trợ trực tuyến'}
                disabled={isLoading}
                aria-label="Hỗ trợ trực tuyến"
            />

            <ToggleSwitch
                checked={isActive}
                onChange={handleActiveChange}
                label="Kích hoạt dịch vụ"
                description={isActive ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                disabled={isLoading}
                aria-label="Kích hoạt dịch vụ"
            />
        </div>
    );
};

