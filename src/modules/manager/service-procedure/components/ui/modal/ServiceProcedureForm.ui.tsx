'use client';

import React, { useMemo } from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { useServices } from '@/modules/manager/service/hooks';
import { useTemplates } from '@/modules/manager/template/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { Template } from '@/modules/manager/template/types/response';
import {
    validateTemplateId,
    validateServiceId,
    validateStepNumber,
    validateStepName,
    validateResponsibleUnit,
    validateProcessingTime,
    validateStepDescription,
    validateNotes,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
}

export const ServiceProcedureForm: React.FC<Props> = ({ form, isLoading }) => {
    const { data: servicesData } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: templatesData } = useTemplates({
        keyword: '',
        docsTypeId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const templateOptions = useMemo(() => {
        const page = templatesData ? getValuesPage(templatesData) : null;
        return (page?.items || []) as Template[];
    }, [templatesData]);

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
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full md:col-span-2">
                                <label htmlFor="serviceId" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Dịch vụ áp dụng
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="serviceId"
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
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
                    name="templateId"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateTemplateId(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full md:col-span-2">
                                <label htmlFor="templateId" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Mẫu biểu cần nộp
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="templateId"
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                >
                                    <option value="">-- Chọn mẫu biểu --</option>
                                    {templateOptions.map((template) => (
                                        <option key={template.id} value={template.id}>
                                            {template.templateName || template.sampleName || template.templateCode}
                                        </option>
                                    ))}
                                </select>
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="stepNumber"
                    validators={{
                        onBlur: ({ value }: { value: number }) => validateStepNumber(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="stepNumber" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Thứ tự bước
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="stepNumber"
                                    type="number"
                                    min={1}
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value ?? 1}
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
                    name="stepName"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateStepName(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="stepName" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Tên bước thực hiện
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="stepName"
                                    type="text"
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Ví dụ: Tiếp nhận hồ sơ"
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="responsibleUnit"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateResponsibleUnit(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="responsibleUnit" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Đơn vị chịu trách nhiệm
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="responsibleUnit"
                                    type="text"
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Ví dụ: Bộ phận Một cửa"
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="processingTime"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateProcessingTime(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="processingTime" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Thời gian xử lý
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="processingTime"
                                    type="text"
                                    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Ví dụ: 02 ngày làm việc"
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Nhập rõ thời gian xử lý (ví dụ: 02 ngày làm việc)
                                </p>
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="stepDescription"
                    validators={{
                        onBlur: ({ value }: { value?: string }) => validateStepDescription(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="md:col-span-2">
                                <label htmlFor="stepDescription" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Mô tả chi tiết
                                </label>
                                <textarea
                                    id="stepDescription"
                                    rows={3}
                                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Mô tả chi tiết các bước thực hiện"
                                    disabled={isLoading}
                                />
                                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="notes"
                    validators={{
                        onBlur: ({ value }: { value?: string }) => validateNotes(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="md:col-span-2">
                                <label htmlFor="notes" className="mb-1 inline-block text-sm font-medium text-foreground">
                                    Ghi chú (nếu có)
                                </label>
                                <textarea
                                    id="notes"
                                    rows={3}
                                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} ${isLoading ? 'cursor-not-allowed bg-muted' : ''}`}
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Các lưu ý bổ sung cho bước này"
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
                        label="Trạng thái hoạt động"
                        description={field.state.value ? 'Quy trình đang được áp dụng' : 'Quy trình tạm ngừng áp dụng'}
                        disabled={isLoading}
                    />
                )}
            </form.Field>
        </div>
    );
};
