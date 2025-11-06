'use client';

import React from 'react';
import { TemplateTableHeader } from './TemplateTableHeader.ui';
import { TemplateTableRow } from './TemplateTableRow.ui';
import type { Template } from '../../../types';

interface Props {
    templates: Template[];
    isLoading: boolean;
    onView: (template: Template) => void;
    onEdit: (template: Template) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const TemplateTable: React.FC<Props> = ({
    templates,
    isLoading,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <TemplateTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : templates.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        templates.map((template) => (
                            <TemplateTableRow
                                key={template.id}
                                template={template}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isDeleting={isDeleting}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

