"use client";

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/shared/lib/utils";
import { TableRow, TableCell } from "@/shared/components/manager/ui/table";
import { Button } from "@/shared/components/ui/button.ui";
import { Badge } from "@/shared/components/ui/badge.ui";
import type { PublicServiceNews } from "../../../types";

interface Props {
    item: PublicServiceNews;
    onView: (news: PublicServiceNews) => void;
    onEdit: (news: PublicServiceNews) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const PublicServiceNewsTableRow: React.FC<Props> = ({
    item,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (item.modifiedAt) {
            return formatDate(item.modifiedAt);
        }
        if (item.createdAt) {
            return formatDate(item.createdAt);
        }
        return "-";
    };

    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="max-w-xs truncate" title={item.title}>
                    {item.title}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Slug: {item.slug || "-"}
                </p>
            </TableCell>
            <TableCell>
                {item.newsCategoryName || item.categoryName || "-"}
            </TableCell>
            <TableCell>
                {item.serviceName || "-"}
            </TableCell>
            <TableCell>
                {item.staffName || "-"}
            </TableCell>
            <TableCell>
                <Badge variant={item.isPublished ? "outline" : "secondary"}>
                    {item.isPublished ? "Đã xuất bản" : "Nháp"}
                </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
                {renderDate()}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(item)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(item)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        disabled={isDeleting}
                        title="Xóa"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};
