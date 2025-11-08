'use client';

import React, { useMemo } from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { useServices } from '@/modules/manager/service/hooks';
import { useDocsTypes } from '@/modules/manager/docs-type/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { DocsType } from '@/modules/manager/docs-type/types';
import {
    validateServiceId,
    validateDocTypeId,
    validateDescription,
    validateQuantityOriginal,
    validateQuantityCopy,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit?: boolean;
}

export const RequiredDocumentForm: React.FC<Props> = ({ form, isLoading, isEdit = false }) => {
    const { data: servicesData } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: docsTypesData } = useDocsTypes({
        keyword: '',
        groupId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const docTypeOptions = useMemo(() => {
        const page = docsTypesData ? getValuesPage(docsTypesData) : null;
        return (page?.items || []) as DocsType[];
    }, [docsTypesData]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.Field
                    name="serviceId"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateServiceId(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0];
                        return (
                            <div className="w-full">
                                <label htmlFor="serviceId" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Dịch vụ áp dụng<span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="serviceId"
                                    className={`h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                >
                                    <option value="">-- Chọn dịch vụ --</option>
                                    {serviceOptions.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </select>
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="docTypeId"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateDocTypeId(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0];
                        return (
                            <div className="w-full">
                                <label htmlFor="docTypeId" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Loại giấy tờ<span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="docTypeId"
                                    className={`h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                >
                                    <option value="">-- Chọn loại giấy tờ --</option>
                                    {docTypeOptions.map((docType) => (
                                        <option key={docType.id} value={docType.id}>
                                            {docType.docTypeName || docType.docTypeCode}
                                        </option>
                                    ))}
                                </select>
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="quantityOriginal"
                    validators={{
                        onBlur: ({ value }: { value: number }) => validateQuantityOriginal(Number(value)),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0];
                        return (
                            <div className="w-full">
                                <label htmlFor="quantityOriginal" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Số bản gốc<span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="quantityOriginal"
                                    type="number"
                                    min={0}
                                    className={`h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value ?? 0}
                                    onChange={(e) => field.handleChange(Number(e.target.value) as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="quantityCopy"
                    validators={{
                        onBlur: ({ value }: { value: number }) => validateQuantityCopy(Number(value)),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0];
                        return (
                            <div className="w-full">
                                <label htmlFor="quantityCopy" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Số bản sao<span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="quantityCopy"
                                    type="number"
                                    min={0}
                                    className={`h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value ?? 0}
                                    onChange={(e) => field.handleChange(Number(e.target.value) as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="description"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateDescription(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0];
                        return (
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Mô tả chi tiết<span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Mô tả chi tiết tài liệu cần nộp"
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? true}
                        onChange={(checked: boolean) => field.handleChange(checked as never)}
                        label="Trạng thái áp dụng"
                        description={field.state.value ? 'Tài liệu đang được yêu cầu khi tiếp nhận hồ sơ.' : 'Tài liệu tạm thời không yêu cầu.'}
                        disabled={isLoading}
                        className="border border-slate-200"
                    />
                )}
            </form.Field>

            {isEdit && (
                <p className="text-xs text-muted-foreground">
                    * Lưu ý: Việc cập nhật sẽ áp dụng cho tất cả hồ sơ yêu cầu tài liệu này trong tương lai.
                </p>
            )}
        </div>
    );
};

