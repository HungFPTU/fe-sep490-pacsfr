'use client';

import React, { useMemo } from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { useServices } from '@/modules/manager/service/hooks';
import { useFaqCategories } from '@/modules/manager/faq-category/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { FaqCategory } from '@/modules/manager/faq-category/types';
import {
    validateQuestion,
    validateAnswer,
    validateServiceId,
    validateFaqCategoryId,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const FaqForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Fetch services for dropdown
    const { data: servicesData } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    // Fetch FAQ categories for dropdown
    const { data: categoriesData } = useFaqCategories({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const categoryOptions = useMemo(() => {
        const page = categoriesData ? getValuesPage(categoriesData) : null;
        return (page?.items || []) as FaqCategory[];
    }, [categoriesData]);

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Service ID */}
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
                        <div className="w-full">
                            <label htmlFor="serviceId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="serviceId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn dịch vụ</option>
                                {serviceOptions.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.serviceName}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* FAQ Category ID */}
            <form.Field
                name="faqCategoryId"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateFaqCategoryId(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="faqCategoryId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Danh mục câu hỏi thường gặp
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="faqCategoryId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn danh mục</option>
                                {categoryOptions.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Question */}
            <div className="md:col-span-2">
                <form.Field
                    name="question"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateQuestion(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="question" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Câu hỏi
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="question"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập câu hỏi thường gặp"
                                    rows={3}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Answer */}
            <div className="md:col-span-2">
                <form.Field
                    name="answer"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateAnswer(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="answer" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Câu trả lời
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="answer"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập câu trả lời"
                                    rows={5}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Is Active */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt câu hỏi"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt câu hỏi"
                    />
                )}
            </form.Field>
        </div>
    );
};

