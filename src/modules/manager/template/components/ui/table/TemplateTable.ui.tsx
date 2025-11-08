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
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TemplateTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : templates.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
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
                </TableBody>
            </Table>
        </div>
    );
};

