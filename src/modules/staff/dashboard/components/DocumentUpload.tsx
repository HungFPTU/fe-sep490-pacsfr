"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Card } from "@/shared/components/ui/card.ui";
import { staffDashboardService } from "../services/staff-dashboard.service";
import { Upload, X, FileText, AlertCircle } from "lucide-react";

import type { Document } from "../types";

interface DocumentUploadProps {
    onDocumentUploaded: (document: Document) => void;
}

export function DocumentUpload({ onDocumentUploaded }: DocumentUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Vui lòng chọn file để tải lên');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // In real app, this would call the upload API
            // For now, simulate upload with mock data
            const mockDocument = {
                id: `doc_${Date.now()}`,
                fileName: selectedFile.name,
                fileType: selectedFile.type,
                fileSize: selectedFile.size,
                uploadedAt: new Date().toISOString(),
                uploadedBy: 'Staff Counter 1', // In real app, get from current user
                description: description || undefined,
                url: `/mock/${selectedFile.name}`
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            onDocumentUploaded(mockDocument);

            // Reset form
            setSelectedFile(null);
            setDescription('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            alert('Tải lên tài liệu thành công!');
        } catch (error) {
            console.error('Error uploading document:', error);
            setError('Có lỗi xảy ra khi tải lên tài liệu');
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) {
            return <FileText className="w-8 h-8 text-red-500" />;
        } else if (fileType.includes('image')) {
            return <FileText className="w-8 h-8 text-blue-500" />;
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return <FileText className="w-8 h-8 text-blue-600" />;
        }
        return <FileText className="w-8 h-8 text-gray-500" />;
    };

    return (
        <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tải lên tài liệu mới
            </h3>

            {/* File Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    selectedFile
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />

                {selectedFile ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            {getFileIcon(selectedFile.type)}
                            <div className="text-left">
                                <p className="text-sm font-medium text-gray-900">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {staffDashboardService.formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                            <Button
                                onClick={removeFile}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                            <p className="text-sm text-gray-600">
                                Kéo và thả file vào đây, hoặc{' '}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                >
                                    chọn file
                                </button>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Hỗ trợ: PDF, JPG, PNG, DOC, DOCX (tối đa 10MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả tài liệu (không bắt buộc)
                </label>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả về tài liệu..."
                    maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                    {description.length}/200 ký tự
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Upload Button */}
            <div className="mt-6">
                <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full"
                >
                    {isUploading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Đang tải lên...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            Tải lên tài liệu
                        </>
                    )}
                </Button>
            </div>
        </Card>
    );
}
