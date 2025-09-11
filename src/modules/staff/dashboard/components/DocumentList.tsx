"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Card } from "@/shared/components/ui/card.ui";
import { staffDashboardService } from "../services/staff-dashboard.service";
import type { Document } from "../types";
import { FileText, Download, Eye, Trash2, File } from "lucide-react";

interface DocumentListProps {
    documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const handleDownload = async (document: Document) => {
        setDownloadingId(document.id);
        try {
            // In real app, this would call the API
            await staffDashboardService.downloadDocument(document.id, document.fileName);
        } catch (error) {
            console.error('Error downloading document:', error);
            alert('Có lỗi xảy ra khi tải tài liệu');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleView = (document: Document) => {
        // In real app, this would open document in new tab or modal
        window.open(document.url, '_blank');
    };

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) return;

        try {
            // In real app, this would call delete API
            alert('Tính năng xóa tài liệu sẽ được triển khai sau');
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Có lỗi xảy ra khi xóa tài liệu');
        }
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) {
            return <FileText className="w-8 h-8 text-red-500" />;
        } else if (fileType.includes('image')) {
            return <File className="w-8 h-8 text-blue-500" />;
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return <File className="w-8 h-8 text-blue-600" />;
        }
        return <File className="w-8 h-8 text-gray-500" />;
    };

    if (documents.length === 0) {
        return (
            <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có tài liệu nào
                </h3>
                <p className="text-gray-500">
                    Tài liệu của công dân sẽ hiển thị ở đây sau khi được tải lên.
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
                Danh sách tài liệu ({documents.length})
            </h3>

            <div className="space-y-3">
                {documents.map((document) => (
                    <Card key={document.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {getFileIcon(document.fileType)}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">
                                        {document.fileName}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {staffDashboardService.formatFileSize(document.fileSize)} •
                                        Tải lên: {new Date(document.uploadedAt).toLocaleDateString('vi-VN')} •
                                        Bởi: {document.uploadedBy}
                                    </p>
                                    {document.description && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            {document.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => handleView(document)}
                                    variant="outline"
                                    size="sm"
                                    title="Xem tài liệu"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => handleDownload(document)}
                                    variant="outline"
                                    size="sm"
                                    disabled={downloadingId === document.id}
                                    title="Tải xuống"
                                >
                                    <Download className="w-4 h-4" />
                                    {downloadingId === document.id && (
                                        <span className="ml-1">...</span>
                                    )}
                                </Button>
                                    <Button
                                        onClick={handleDelete}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        title="Xóa tài liệu"
                                    >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
