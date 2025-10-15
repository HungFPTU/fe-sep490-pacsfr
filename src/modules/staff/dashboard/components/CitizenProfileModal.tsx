"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Card } from "@/shared/components/ui/card.ui";
import { useStaffDashboardStore } from "../stores/useStaffDashboardStore";
import { staffDashboardService } from "../services/staff-dashboard.service";
import { getMockCitizenById, getMockDocumentsByCitizenId, SERVICE_TYPES } from "../consts";
import type { CitizenProfile, Document } from "../types";
import { DocumentList } from "./DocumentList";
import { DocumentUpload } from "./DocumentUpload";
import { FeedbackForm } from "./FeedbackForm";
import { X, User, Phone, Mail, MapPin, FileText, MessageSquare } from "lucide-react";

interface CitizenProfileModalProps {
    citizenId: string;
    onClose: () => void;
}

export function CitizenProfileModal({ citizenId, onClose }: CitizenProfileModalProps) {
    const [citizen, setCitizen] = useState<CitizenProfile | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState<CitizenProfile['status']>('waiting');
    const [statusNotes, setStatusNotes] = useState('');
    const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'feedback'>('profile');

    const { updateCitizenInList, setUpdatingStatus } = useStaffDashboardStore();

    const loadCitizenData = useCallback(async () => {
        setIsLoading(true);
        try {
            // In real app, this would be API calls
            const citizenData = getMockCitizenById(citizenId);
            const citizenDocuments = getMockDocumentsByCitizenId(citizenId);

            if (citizenData) {
                setCitizen(citizenData);
                setNewStatus(citizenData.status);
                setStatusNotes(citizenData.notes || '');
                setDocuments(citizenDocuments);
            }
        } catch (error) {
            console.error('Error loading citizen data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [citizenId]);

    useEffect(() => {
        loadCitizenData();
    }, [loadCitizenData]);


    const handleUpdateStatus = async () => {
        if (!citizen) return;

        setIsUpdatingStatus(true);
        setUpdatingStatus(true);

        try {
            // In real app, this would be an API call
            const updatedCitizen = {
                ...citizen,
                status: newStatus,
                notes: statusNotes,
            };

            // Update local state
            setCitizen(updatedCitizen);
            updateCitizenInList(updatedCitizen);

            // Show success message (you can add toast notification here)
            alert('Cập nhật trạng thái thành công!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Có lỗi xảy ra khi cập nhật trạng thái');
        } finally {
            setIsUpdatingStatus(false);
            setUpdatingStatus(false);
        }
    };

    const handleDocumentUploaded = (newDocument: Document) => {
        setDocuments(prev => [...prev, newDocument]);
    };

    const getServiceTypeName = (serviceId: string) => {
        const service = SERVICE_TYPES.find(s => s.id === serviceId);
        return service?.name || serviceId;
    };

    const getStatusBadge = (status: CitizenProfile['status']) => {
        const colorClass = staffDashboardService.getStatusColor(status);
        const text = staffDashboardService.getStatusText(status);

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                {text}
            </span>
        );
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
                            Hồ sơ công dân: {citizen.fullName}
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

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {[
                        { id: 'profile' as const, label: 'Thông tin cá nhân', icon: User },
                        { id: 'documents' as const, label: 'Tài liệu', icon: FileText },
                        { id: 'feedback' as const, label: 'Phản hồi', icon: MessageSquare },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <tab.icon className="w-4 h-4 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <Card className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Thông tin cá nhân
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
                                            Ngày sinh
                                        </label>
                                        <span className="text-sm text-gray-900">
                                            {new Date(citizen.dateOfBirth).toLocaleDateString('vi-VN')}
                                        </span>
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

                            {/* Service Information */}
                            <Card className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Thông tin dịch vụ
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Loại dịch vụ
                                        </label>
                                        <span className="text-sm text-gray-900">
                                            {getServiceTypeName(citizen.serviceId)}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Trạng thái hiện tại
                                        </label>
                                        {getStatusBadge(citizen.status)}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Thời gian yêu cầu
                                        </label>
                                        <span className="text-sm text-gray-900">
                                            {new Date(citizen.requestedAt).toLocaleString('vi-VN')}
                                        </span>
                                    </div>
                                    {citizen.startedServingAt && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Bắt đầu phục vụ
                                            </label>
                                            <span className="text-sm text-gray-900">
                                                {new Date(citizen.startedServingAt).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Status Update */}
                            <Card className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Cập nhật trạng thái
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Trạng thái mới
                                        </label>
                                        <select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value as CitizenProfile['status'])}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="waiting">Đang chờ</option>
                                            <option value="processing">Đang xử lý</option>
                                            <option value="need_supplement">Cần bổ sung</option>
                                            <option value="completed">Hoàn thành</option>
                                            <option value="cancelled">Đã hủy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ghi chú
                                        </label>
                                        <textarea
                                            value={statusNotes}
                                            onChange={(e) => setStatusNotes(e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nhập ghi chú về trạng thái..."
                                        />
                                    </div>
                                    <Button
                                        onClick={handleUpdateStatus}
                                        disabled={isUpdatingStatus}
                                        className="w-full"
                                    >
                                        {isUpdatingStatus ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            {/* <DocumentUpload
                                citizenId={citizen.id}
                                onDocumentUploaded={handleDocumentUploaded}
                            /> */}
                            <DocumentList
                                documents={documents}
                            />
                        </div>
                    )}

                    {activeTab === 'feedback' && (
                        <FeedbackForm
                            citizenId={citizen.id}
                            existingFeedback={citizen.feedback}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
