"use client";

import { useState } from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { useService } from "../../../hooks/useServices";
import { ServiceDetailPopup } from "../../ui/detail/ServiceDetailPopup.ui";
import { LoadingSpinner } from "@/shared/components/common";

interface ServiceDetailViewProps {
    serviceId: string;
    className?: string;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
    serviceId,
    className = "",
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { data: response, isLoading, error } = useService(serviceId);
    const service = response?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-red-800 mb-2">Không tìm thấy dịch vụ</h3>
                    <p className="text-red-600">
                        {error?.message || "Dịch vụ không tồn tại hoặc đã bị xóa"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Service Header */}
            <Card className="bg-white border border-gray-200">
                <CardBody className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {service.serviceName}
                                </h1>
                                <Chip
                                    className="bg-blue-100 text-blue-800 border-blue-200 text-sm font-medium"
                                    size="sm"
                                >
                                    {service.serviceType}
                                </Chip>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-lg text-red-600 font-semibold">
                                    Mã dịch vụ: {service.serviceCode}
                                </span>
                                {service.isOnlineAvailable && (
                                    <Chip
                                        color="success"
                                        variant="flat"
                                        size="sm"
                                        startContent={
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        }
                                    >
                                        Có thể làm online
                                    </Chip>
                                )}
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <Button
                                color="primary"
                                size="lg"
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardBody className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thông tin cơ bản
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Thời gian xử lý</label>
                                <p className="text-lg font-semibold text-gray-900">
                                    {service.processingTime}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Kết quả thực hiện</label>
                                <p className="text-lg font-semibold text-gray-900">
                                    {service.resultDocument}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Phí dịch vụ</label>
                                <p className="text-2xl font-bold text-green-600">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.feeAmount)}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thông tin bổ sung
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Cơ quan ban hành</label>
                                <p className="text-sm font-semibold text-gray-900">Bộ Tài chính</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Cơ quan thực hiện</label>
                                <p className="text-sm font-semibold text-gray-900">Ủy ban nhân dân cấp xã</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Lĩnh vực</label>
                                <p className="text-sm font-semibold text-gray-900">Thành lập và hoạt động của tổ hợp tác, hợp tác xã</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                <p className="text-sm font-semibold text-green-600">Đang hoạt động</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Required Documents Preview */}
            {service.requiredDocuments?.$values && service.requiredDocuments.$values.length > 0 && (
                <Card>
                    <CardBody className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Giấy tờ yêu cầu
                        </h2>

                        <div className="space-y-2">
                            {service.requiredDocuments.$values.slice(0, 3).map((doc, index) => (
                                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {doc.docTypeName}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                            {service.requiredDocuments.$values.length > 3 && (
                                <p className="text-sm text-gray-600 text-center py-2">
                                    Và {service.requiredDocuments.$values.length - 3} giấy tờ khác...
                                </p>
                            )}
                        </div>

                        <div className="mt-4 text-center">
                            <Button
                                variant="light"
                                color="primary"
                                onClick={() => setIsPopupOpen(true)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Xem tất cả giấy tờ yêu cầu
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Service Detail Popup */}
            <ServiceDetailPopup
                service={service}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
};
