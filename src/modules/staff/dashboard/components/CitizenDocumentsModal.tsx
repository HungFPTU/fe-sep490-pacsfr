"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Card } from "@/shared/components/ui/card.ui";
import { staffDashboardService } from "../services/staff-dashboard.service";
import { getMockCitizenById, getMockDocumentsByCitizenId } from "../consts";
import type { CitizenProfile, Document } from "../types";
import { X, Download, FileText, AlertCircle, User, Phone, Mail, MapPin } from "lucide-react";

interface CitizenDocumentsModalProps {
    citizenId: string;
    onClose: () => void;
}

export function CitizenDocumentsModal({ citizenId, onClose }: CitizenDocumentsModalProps) {
    const [citizen, setCitizen] = useState<CitizenProfile | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());

    const loadCitizenDocuments = useCallback(async () => {
        setIsLoading(true);
        try {
            // In real app, this would be API calls
            const citizenData = getMockCitizenById(citizenId);
            const citizenDocuments = getMockDocumentsByCitizenId(citizenId);

            if (citizenData) {
                setCitizen(citizenData);
                setDocuments(citizenDocuments);
            }
        } catch (error) {
            console.error('Error loading citizen documents:', error);
        } finally {
            setIsLoading(false);
        }
    }, [citizenId]);

    useEffect(() => {
        loadCitizenDocuments();
    }, [citizenId, loadCitizenDocuments]);

    const handleDownloadDocument = async (document: Document) => {
        setDownloadingIds(prev => new Set([...prev, document.id]));

        try {
            // In real app, this would call the download API
            // For now, show a message since data is not available
            alert(`Tính năng tải hồ sơ "${document.fileName}" sẽ được triển khai sau khi có dữ liệu thực tế.`);

            // Simulate download delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error downloading document:', error);
            alert('Có lỗi xảy ra khi tải hồ sơ');
        } finally {
            setDownloadingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(document.id);
                return newSet;
            });
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

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!citizen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                    <div className="text-center">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy công dân
                        </h2>
                        <Button onClick={onClose}>Đóng</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Hồ sơ của công dân: {citizen.fullName}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Số thứ tự: {citizen.queueNumber}
                        </p>
                    </div>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Citizen Information */}
                    <Card className="p-4 mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Thông tin công dân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ và tên
                                </label>
                                <div className="flex items-center">
                                    <User className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">{citizen.fullName}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">{citizen.phoneNumber}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">
                                        {citizen.email || 'Chưa cập nhật'}
                                    </span>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa chỉ
                                </label>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">{citizen.address}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Documents List */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Danh sách hồ sơ ({documents.length})
                        </h3>

                        {documents.length === 0 ? (
                            <Card className="p-8 text-center">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h4 className="text-lg font-medium text-gray-900 mb-2">
                                    Chưa có hồ sơ nào
                                </h4>
                                <p className="text-gray-500">
                                    Công dân chưa tải lên hồ sơ nào.
                                </p>
                            </Card>
                        ) : (
                            <div className="space-y-4">
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
                                                        Tải lên: {new Date(document.uploadedAt).toLocaleDateString('vi-VN')}
                                                    </p>
                                                    {document.description && (
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {document.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-2 text-xs text-orange-600">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span>Chưa có dữ liệu</span>
                                                </div>
                                                <Button
                                                    onClick={() => handleDownloadDocument(document)}
                                                    disabled={downloadingIds.has(document.id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-gray-400 cursor-not-allowed"
                                                    title="Tính năng tải hồ sơ sẽ được kích hoạt khi có dữ liệu thực tế"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    {downloadingIds.has(document.id) ? 'Đang tải...' : 'Tải về'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <Button onClick={onClose} variant="outline">
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    );
}
