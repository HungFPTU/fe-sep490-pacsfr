'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { useDocsTypeGroups } from '@/modules/manager/docs-type-group/hooks';
import { getValuesPage } from '@/types/rest';
import type { DocsTypeGroup } from '@/modules/manager/docs-type-group/types';
import {
    validateDocTypeCode,
    validateDocTypeName,
    validateDescription,
    validateGroupId,
    validateFileFormat,
    validateMaxFileSize,
} from '../../../utils';
import { FILE_FORMATS } from '../../../enums';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const DocsTypeForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Fetch docs type groups for dropdown
    const { data: groupsData } = useDocsTypeGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = groupsData ? getValuesPage(groupsData) : null;
    const groups = pageResult?.items || [];

    const groupOptions = groups.map((group: DocsTypeGroup) => ({
        value: group.id,
        label: group.groupName,
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Doc Type Code */}
            <form.Field name="docTypeCode">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    return (
                        <div className="w-full">
                            <label htmlFor="docTypeCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã loại văn bản
                            </label>
                            <input
                                id="docTypeCode"
                                type="text"
                                className="w-full rounded-xl border bg-slate-100 outline-none transition h-10 px-3 text-sm border-slate-300 cursor-not-allowed"
                                value={(field.state.value as string) || ''}
                                placeholder="Mã sẽ được tự động sinh"
                                disabled={true}
                            />
                        </div>
                    );
                }}
            </form.Field>

            {/* Doc Type Name */}
            <form.Field
                name="docTypeName"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateDocTypeName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="docTypeName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên loại văn bản
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="docTypeName"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên loại văn bản"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Group Id */}
            <form.Field
                name="groupId"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateGroupId(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="groupId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Nhóm hồ sơ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="groupId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn nhóm hồ sơ</option>
                                {groupOptions.map((option) => (
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

            {/* File Format */}
            <form.Field
                name="fileFormat"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateFileFormat(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="fileFormat" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Định dạng file
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="fileFormat"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn định dạng file</option>
                                {FILE_FORMATS.map((format) => (
                                    <option key={format.value} value={format.value}>
                                        {format.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Max File Size */}
            <form.Field
                name="maxFileSize"
                validators={{
                    onBlur: ({ value }: { value: number | undefined }) => validateMaxFileSize(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="maxFileSize" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Kích thước file tối đa (MB)
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="maxFileSize"
                                type="number"
                                min="1"
                                max="100"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as number) || ''}
                                onChange={(e) => field.handleChange(Number(e.target.value) || 0 as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập kích thước tối đa (MB)"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Description */}
            <div className="md:col-span-2">
                <form.Field
                    name="description"
                    validators={{
                        onBlur: ({ value }: { value: string | undefined }) => validateDescription(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                                    placeholder="Nhập mô tả loại văn bản"
                                    rows={3}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Is Required */}
            <form.Field name="isRequired">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Bắt buộc"
                        description={field.state.value ? 'Loại văn bản bắt buộc' : 'Loại văn bản không bắt buộc'}
                        disabled={isLoading}
                        aria-label="Bắt buộc"
                    />
                )}
            </form.Field>

            {/* Is Active */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt loại văn bản"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt loại văn bản"
                    />
                )}
            </form.Field>
        </div>
    );
};

