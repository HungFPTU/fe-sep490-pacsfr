'use client';

import React from 'react';
import { Input } from '@/shared/components/manager/ui/input';
import { Switch } from '@heroui/react';
import { UploadCloud } from 'lucide-react';
import { LegalDocumentService } from '../../../services/legal-document.service';
import type { LegalDocumentFormData } from '../../../types';

interface Props {
    formData: LegalDocumentFormData;
    errors: Partial<Record<keyof LegalDocumentFormData, string>>;
    updateField: (field: keyof LegalDocumentFormData, value: string | File | boolean) => void;
    isEdit?: boolean;
}

export const LegalDocumentForm: React.FC<Props> = ({
    formData,
    errors,
    updateField,
}) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            updateField('file', file);
        }
    };

    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Number */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Số văn bản <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={formData.documentNumber}
                        onChange={(e) => updateField('documentNumber', e.target.value)}
                        placeholder="Nhập số văn bản"
                        className={errors.documentNumber ? 'border-red-500' : ''}
                    />
                    {errors.documentNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
                    )}
                </div>

                {/* Document Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Loại văn bản <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.documentType || ''}
                        onChange={(e) => updateField('documentType', e.target.value)}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors.documentType
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
                            }`}
                    >
                        <option value="">Chọn loại văn bản</option>
                        {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.documentType && (
                        <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
                    )}
                </div>
            </div>

            {/* Document Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    Tên văn bản <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Nhập tên văn bản"
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Issue Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Ngày ban hành <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => updateField('issueDate', e.target.value)}
                        className={errors.issueDate ? 'border-red-500' : ''}
                    />
                    {errors.issueDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
                    )}
                </div>

                {/* Effective Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Ngày có hiệu lực <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) => updateField('effectiveDate', e.target.value)}
                        className={errors.effectiveDate ? 'border-red-500' : ''}
                    />
                    {errors.effectiveDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.effectiveDate}</p>
                    )}
                </div>
            </div>

            {/* Issue Body */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    Cơ quan ban hành <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.issueBody}
                    onChange={(e) => updateField('issueBody', e.target.value)}
                    placeholder="Nhập cơ quan ban hành"
                    className={errors.issueBody ? 'border-red-500' : ''}
                />
                {errors.issueBody && (
                    <p className="text-red-500 text-sm mt-1">{errors.issueBody}</p>
                )}
            </div>

            {/* Status */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.status || ''}
                    onChange={(e) => updateField('status', e.target.value)}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors.status
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                >
                    <option value="">Chọn trạng thái</option>
                    {documentStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    File đính kèm
                </label>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                        <UploadCloud className="h-5 w-5 text-slate-500" />
                        <span className="text-sm text-slate-700">
                            {formData.file ? formData.file.name : 'Chọn file'}
                        </span>
                    </label>
                    {formData.file && (
                        <span className="text-xs text-slate-500">
                            {LegalDocumentService.formatFileSize(formData.file.size)}
                        </span>
                    )}
                </div>
            </div>

            {/* Active Status */}
            <div className="relative overflow-hidden bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-between p-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 via-blue-100 to-indigo-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <svg className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                                <div className={`w-full h-full rounded-full ${formData.isActive ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors duration-300">
                                Trạng thái kích hoạt văn bản
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                                Văn bản sẽ được hiển thị và có thể sử dụng trong hệ thống quản lý
                            </p>
                            <div className="flex items-center space-x-3 mt-3">
                                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${formData.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                    <div className={`w-2 h-2 rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                    <span className="text-xs font-semibold">
                                        {formData.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                                    </span>
                                </div>
                                <div className={`text-xs font-medium px-2 py-1 rounded-md ${formData.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                    {formData.isActive ? '✓ Có thể sử dụng' : '✗ Không sử dụng'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                            <Switch
                                isSelected={formData.isActive}
                                onValueChange={(value) => updateField('isActive', value)}
                                size="lg"
                                color="success"
                                classNames={{
                                    wrapper: "group-data-[selected=true]:bg-gradient-to-r group-data-[selected=true]:from-emerald-500 group-data-[selected=true]:to-green-500 shadow-xl group-data-[selected=true]:shadow-emerald-200",
                                    thumb: "group-data-[selected=true]:ml-6 shadow-lg",
                                }}
                            />
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${formData.isActive ? 'bg-emerald-300' : 'bg-slate-300'} transition-colors duration-300`}></div>
                        </div>
                        <div className="text-center">
                            <span className={`text-sm font-bold uppercase tracking-wider ${formData.isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                                {formData.isActive ? 'BẬT' : 'TẮT'}
                            </span>
                            <p className="text-xs text-slate-500 mt-1">
                                {formData.isActive ? 'Kích hoạt' : 'Vô hiệu hóa'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
