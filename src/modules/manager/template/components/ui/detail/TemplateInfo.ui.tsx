'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { Template } from '../../../types';

interface Props {
    template: Template;
}

export const TemplateInfo: React.FC<Props> = ({ template }) => {
    const formatFileSize = (bytes?: number): string => {
        if (!bytes || bytes === 0) return '-';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Template Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã template
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {template.templateCode || (template as unknown as { sampleCode?: string }).sampleCode || '-'}
                </p>
            </div>

            {/* Template Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên template
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {template.templateName || (template as unknown as { sampleName?: string }).sampleName || '-'}
                </p>
            </div>

            {/* Docs Type Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Loại văn bản
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{template.docsTypeName || '-'}</p>
            </div>

            {/* Version */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Phiên bản
                </label>
                <div className="mt-1">
                    {template.version ? (
                        <Badge variant="outline">
                            {template.version}
                        </Badge>
                    ) : (
                        <p className="text-sm text-muted-foreground">-</p>
                    )}
                </div>
            </div>

            {/* File Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên file
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{template.fileName || '-'}</p>
            </div>

            {/* File Size */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Kích thước file
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{formatFileSize(template.fileSize)}</p>
            </div>

            {/* File Path */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Đường dẫn file
                </label>
                <p className="mt-1 text-sm text-muted-foreground break-all">{template.filePath || '-'}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={template.isActive ? 'outline' : 'secondary'}>
                        {template.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {template.createdAt ? formatDate(template.createdAt) : '-'}
                </p>
            </div>

            {/* Modified At */}
            {template.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Ngày cập nhật
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(template.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{template.description || '-'}</p>
            </div>
        </div>
    );
};

