"use client";

import React from "react";
import { PublicServiceNewsTableHeader } from "./PublicServiceNewsTableHeader.ui";
import { PublicServiceNewsTableRow } from "./PublicServiceNewsTableRow.ui";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/shared/components/manager/ui/table";
import type { PublicServiceNews } from "../../../types";

interface Props {
    items: PublicServiceNews[];
    isLoading: boolean;
    onView: (item: PublicServiceNews) => void;
    onEdit: (item: PublicServiceNews) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const PublicServiceNewsTable: React.FC<Props> = ({
    items,
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
                    <PublicServiceNewsTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((item) => (
                            <PublicServiceNewsTableRow
                                key={item.id}
                                item={item}
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
