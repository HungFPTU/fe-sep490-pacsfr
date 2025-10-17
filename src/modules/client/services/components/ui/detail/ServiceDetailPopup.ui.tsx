"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, Chip, Divider } from "@heroui/react";
import type { Service } from "../../../types";
import type { ServiceGroup } from "@/modules/client/services-group";
import type { LegalBasis } from "@/modules/client/legal-basis";

interface ServiceDetailPopupProps {
    service: Service | null;
    serviceGroup?: ServiceGroup | null;
    legalBasis?: LegalBasis | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ServiceDetailPopup: React.FC<ServiceDetailPopupProps> = ({
    service,
    serviceGroup,
    legalBasis,
    isOpen,
    onClose,
}) => {
    if (!service) return null;

    // Simple currency formatter
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    // Simple service type color
    const getServiceTypeColor = (type: string): string => {
        switch (type) {
            case "Trực tuyến":
                return "bg-green-100 text-green-800 border-green-200";
            case "Trực tiếp":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="5xl"
            scrollBehavior="inside"
            backdrop="blur"
            classNames={{
                base: "max-h-[90vh] bg-white",
                body: "py-6",
                header: "pb-2 bg-white",
                backdrop: "bg-black/50 backdrop-blur-sm"
            }}
        >
            <ModalContent className="bg-white shadow-2xl border border-gray-200">
                <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-900">
                            Chi tiết thủ tục hành chính
                        </h2>
                        <Chip
                            className={`${getServiceTypeColor(service.serviceType)} text-sm font-medium`}
                            size="sm"
                        >
                            {service.serviceType}
                        </Chip>
                    </div>
                </ModalHeader>

                <ModalBody className="bg-white">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Mã thủ tục</label>
                                <p className="text-lg font-semibold text-red-600">{service.serviceCode}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Số quyết định</label>
                                <p className="text-lg font-semibold text-gray-900">3457/QĐ-BTC</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">Tên thủ tục</label>
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {service.serviceName}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nhóm dịch vụ</label>
                                <p className="text-sm font-semibold text-gray-900">
                                    {serviceGroup ? `${serviceGroup.groupCode} - ${serviceGroup.groupName}` : "Đang tải..."}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Căn cứ pháp lý</label>
                                <p className="text-sm font-semibold text-gray-900">
                                    {legalBasis ? legalBasis.name : "Đang tải..."}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Mô tả nhóm dịch vụ</label>
                                <p className="text-sm font-semibold text-gray-900">
                                    {serviceGroup ? serviceGroup.description : "Đang tải..."}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        {/* Service Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Thời gian xử lý</label>
                                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2 mt-1">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {service.processingTime}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-600">Kết quả thực hiện</label>
                                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2 mt-1">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {service.resultDocument}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Phí dịch vụ</label>
                                    <p className="text-2xl font-bold text-green-600 flex items-center gap-2 mt-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        {formatCurrency(service.feeAmount)}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                    <p className="text-lg font-semibold text-green-600 flex items-center gap-2 mt-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Đang hoạt động
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Legal Basis Information */}
                        {legalBasis && (
                            <>
                                <Divider />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Căn cứ pháp lý
                                    </h3>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">{legalBasis.name}</h4>
                                        <p className="text-sm text-gray-700 mb-3">{legalBasis.description}</p>
                                        <p className="text-sm text-gray-600 mb-3">{legalBasis.content}</p>
                                        {legalBasis.link && (
                                            <a
                                                href={legalBasis.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Xem chi tiết →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Required Documents */}
                        {service.requiredDocuments?.$values && service.requiredDocuments.$values.length > 0 && (
                            <>
                                <Divider />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Giấy tờ yêu cầu
                                    </h3>

                                    <div className="space-y-3">
                                        {service.requiredDocuments.$values.map((doc, index) => (
                                            <div key={doc.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 mb-1">
                                                        {doc.docTypeName}
                                                    </h4>
                                                    {doc.description && (
                                                        <p className="text-sm text-gray-600">
                                                            {doc.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Implementation Methods */}
                        <Divider />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cách thức thực hiện</h3>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hình thức nộp
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Thời hạn giải quyết
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phí, lệ phí
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Mô tả
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Trực tiếp</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{service.processingTime}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Phí: {formatCurrency(service.feeAmount)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                Cơ quan tiếp nhận hồ sơ kiểm tra tính hợp lệ và thực hiện thủ tục theo quy định.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Trực tuyến</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{service.processingTime}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Phí: {formatCurrency(service.feeAmount)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                Nộp hồ sơ trực tuyến qua Cổng Dịch vụ công quốc gia.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Dịch vụ bưu chính</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{service.processingTime}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Phí: {formatCurrency(service.feeAmount)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                Gửi hồ sơ qua đường bưu điện đến cơ quan có thẩm quyền.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Implementation Steps */}
                        <Divider />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trình tự thực hiện</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        1
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Nộp hồ sơ:</strong> Người có yêu cầu nộp hồ sơ trực tiếp tại cơ quan có thẩm quyền hoặc gửi qua đường bưu điện hoặc nộp trực tuyến trên Cổng Dịch vụ công quốc gia.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        2
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Tiếp nhận hồ sơ:</strong> Cơ quan tiếp nhận hồ sơ kiểm tra tính hợp lệ của hồ sơ. Trường hợp hồ sơ chưa đầy đủ, cơ quan tiếp nhận hướng dẫn người có yêu cầu bổ sung, hoàn thiện hồ sơ.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        3
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Xử lý hồ sơ:</strong> Trong thời hạn {service.processingTime}, cơ quan có thẩm quyền thực hiện thủ tục và trả kết quả cho người có yêu cầu.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        4
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Trả kết quả:</strong> Cơ quan có thẩm quyền cấp {service.resultDocument} cho người có yêu cầu theo đúng thời hạn quy định.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};