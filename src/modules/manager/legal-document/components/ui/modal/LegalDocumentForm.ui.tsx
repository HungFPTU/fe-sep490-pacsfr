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

            {/* Active Status (Simple Switch) */}
            <div className="flex items-center space-x-3 mt-2">
                <label className="text-sm font-medium text-slate-700">
                    Kích hoạt văn bản
                </label>
                <Switch
                    isSelected={formData.isActive}
                    onValueChange={(value) => updateField('isActive', value)}
                    size="md"
                    color="success"
                />
            </div>
        </div>
    );
};
