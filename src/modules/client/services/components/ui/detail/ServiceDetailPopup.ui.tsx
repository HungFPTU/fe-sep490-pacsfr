"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Chip } from "@heroui/react";
import type { Service } from "../../../types";
import type { ServiceGroup } from "@/modules/client/services-group";
import {
    formatCurrency,
    formatDate,
    formatProcessingTime,
    formatServiceType,
    formatExecutionLevel,
    formatField,
} from "../../../utils";
import {
    FileText,
    Building2,
    Scale,
    ArrowRight,
    Send,
    ChevronDown,
    ChevronUp,
    Briefcase,
    Info
} from "lucide-react";

interface ServiceDetailPopupProps {
    service: Service | null;
    serviceGroup?: ServiceGroup | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ServiceDetailPopup: React.FC<ServiceDetailPopupProps> = ({
    service,
    serviceGroup,
    isOpen,
    onClose,
}) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        requiredDocuments: true,
        serviceAgencies: false,
        requirements: false,
    });

    if (!service) return null;

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
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
                <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-red-50 via-white to-blue-50 border-b-2 border-red-100">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Chi tiết thủ tục hành chính
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">{service.serviceName}</p>
                            </div>
                        </div>
                        {service.serviceType && (
                            <Chip
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 text-sm font-semibold shadow-md"
                                size="md"
                            >
                                {formatServiceType(service.serviceType)}
                            </Chip>
                        )}
                    </div>
                </ModalHeader>

                <ModalBody className="bg-white">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                Thông tin cơ bản
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Mã thủ tục</label>
                                    <p className="text-lg font-bold text-red-600">{service.serviceCode}</p>
                                </div>
                                {service.decisionNumber && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Số quyết định</label>
                                        <p className="text-lg font-semibold text-gray-900">{service.decisionNumber}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Tên thủ tục</label>
                                    <p className="text-lg font-semibold text-gray-900">{service.serviceName}</p>
                                </div>
                                {service.executionLevel && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Cấp thực hiện</label>
                                        <p className="text-lg font-semibold text-gray-900">{formatExecutionLevel(service.executionLevel)}</p>
                                    </div>
                                )}
                                {service.serviceType && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Loại thủ tục</label>
                                        <p className="text-lg font-semibold text-gray-900">{formatServiceType(service.serviceType)}</p>
                                    </div>
                                )}
                                {service.field && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Lĩnh vực</label>
                                        <p className="text-lg font-semibold text-gray-900">{formatField(service.field)}</p>
                                    </div>
                                )}
                                {serviceGroup && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Nhóm dịch vụ</label>
                                        <p className="text-lg font-semibold text-gray-900">{serviceGroup.groupName}</p>
                                    </div>
                                )}
                                {service.processingTime && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Thời gian xử lý</label>
                                        <p className="text-lg font-semibold text-gray-900">{service.processingTime}</p>
                                    </div>
                                )}
                                {service.resultDocument && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Kết quả thực hiện</label>
                                        <p className="text-lg font-semibold text-gray-900">{service.resultDocument}</p>
                                    </div>
                                )}
                                {service.feeAmount !== undefined && service.feeAmount !== null && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Phí dịch vụ</label>
                                        <p className="text-lg font-bold text-green-600">{formatCurrency(service.feeAmount)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-amber-600" />
                                Thông tin bổ sung
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Đối tượng thực hiện</label>
                                    <p className="text-sm text-gray-900">Doanh nghiệp, Tổ chức</p>
                                </div>
                                {service.serviceAgencies?.$values && service.serviceAgencies.$values.length > 0 && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Cơ quan thực hiện</label>
                                        <p className="text-sm text-gray-900">
                                            {service.serviceAgencies.$values.map(agency => agency.agencyName).join(', ')}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Cơ quan có thẩm quyền</label>
                                    <p className="text-sm text-gray-900">Không có thông tin</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Địa chỉ tiếp nhận HS</label>
                                    <p className="text-sm text-gray-900">Không có thông tin</p>
                                </div>
                            </div>
                        </div>

                        {/* Cách thức thực hiện - Table Format */}
                        {service.submissionMethods?.$values && service.submissionMethods.$values.length > 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Send className="w-5 h-5 text-purple-600" />
                                    Cách thức thực hiện
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                                                    Hình thức nộp
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                                                    Thời hạn giải quyết
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                                                    Phí, lệ phí
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Mô tả
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {service.submissionMethods.$values.map((method, index) => (
                                                <tr key={method.id || index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                                        {method.submissionMethodName}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                                                        {method.processingTime ? formatProcessingTime(method.processingTime) : service.processingTime || '-'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                                                        {method.fee !== undefined && method.fee !== null
                                                            ? `Phí: ${formatCurrency(method.fee)}`
                                                            : service.feeAmount !== undefined && service.feeAmount !== null
                                                                ? `Phí: ${formatCurrency(service.feeAmount)}`
                                                                : '-'}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-700">
                                                        {method.description || service.description || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Thành phần hồ sơ - Table Format */}
                        {service.requiredDocuments?.$values && service.requiredDocuments.$values.length > 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-orange-600" />
                                        Thành phần hồ sơ
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm font-medium text-gray-700 mb-4">Bao gồm:</p>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                                        Tên giấy tờ
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300 w-48">
                                                        Mẫu đơn, tờ khai
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-300 w-24">
                                                        Bản chính
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">
                                                        Bản sao
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {service.requiredDocuments.$values.map((doc, index) => (
                                                    <tr
                                                        key={doc.id}
                                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                                    >
                                                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">
                                                            <div>
                                                                <p className="font-medium">{doc.docTypeName}</p>
                                                                {doc.description && (
                                                                    <p className="text-xs text-gray-600 mt-1">{doc.description}</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                                                            -
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-300">
                                                            1
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                                                            0
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Trình tự thực hiện */}
                        {service.serviceProcedures?.$values && service.serviceProcedures.$values.length > 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-emerald-600" />
                                    Trình tự thực hiện
                                </h3>
                                <div className="space-y-4">
                                    {service.serviceProcedures.$values
                                        .sort((a, b) => a.stepNumber - b.stepNumber)
                                        .map((procedure) => (
                                            <div key={procedure.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                                                    {procedure.stepNumber}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-gray-900 mb-2">
                                                        <strong>{procedure.stepName}:</strong>
                                                    </h4>
                                                    {procedure.stepDescription && (
                                                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                                            {procedure.stepDescription}
                                                        </p>
                                                    )}
                                                    {(procedure.responsibleUnit || procedure.processingTime || procedure.notes) && (
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-300">
                                                            {procedure.responsibleUnit && (
                                                                <div>
                                                                    <label className="text-xs text-gray-500 block mb-1">Đơn vị phụ trách</label>
                                                                    <p className="text-sm font-semibold text-gray-900">{procedure.responsibleUnit}</p>
                                                                </div>
                                                            )}
                                                            {procedure.processingTime && (
                                                                <div>
                                                                    <label className="text-xs text-gray-500 block mb-1">Thời gian</label>
                                                                    <p className="text-sm font-semibold text-gray-900">{procedure.processingTime}</p>
                                                                </div>
                                                            )}
                                                            {procedure.notes && (
                                                                <div>
                                                                    <label className="text-xs text-gray-500 block mb-1">Ghi chú</label>
                                                                    <p className="text-sm font-semibold text-gray-900">{procedure.notes}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Cơ quan thực hiện - Collapsible */}
                        {service.serviceAgencies?.$values && service.serviceAgencies.$values.length > 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <button
                                    onClick={() => toggleSection('serviceAgencies')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Cơ quan thực hiện
                                        </h3>
                                    </div>
                                    {expandedSections.serviceAgencies ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {expandedSections.serviceAgencies && (
                                    <div className="px-6 pb-6 border-t border-gray-200">
                                        <div className="pt-4 space-y-3">
                                            {service.serviceAgencies.$values.map((agency) => (
                                                <div key={agency.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                    <h4 className="font-semibold text-gray-900 mb-1">
                                                        {agency.agencyName}
                                                    </h4>
                                                    {agency.description && (
                                                        <p className="text-sm text-gray-600">
                                                            {agency.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Yêu cầu, điều kiện - Collapsible */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('requirements')}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Info className="w-5 h-5 text-amber-600" />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Yêu cầu, điều kiện
                                    </h3>
                                </div>
                                {expandedSections.requirements ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {expandedSections.requirements && (
                                <div className="px-6 pb-6 border-t border-gray-200">
                                    <div className="pt-4">
                                        <p className="text-sm text-gray-600">
                                            {service.description || 'Không có thông tin'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Căn cứ pháp lý - Table Format */}
                        {service.legalBases?.$values && service.legalBases.$values.length > 0 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-blue-600" />
                                    Căn cứ pháp lý
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                                    Số ký hiệu
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                                    Trích yếu
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                                    Ngày ban hành
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                    Cơ quan ban hành
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {service.legalBases.$values.map((legalBasis, index) => (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                                >
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-300">
                                                        {legalBasis.documentNumber}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                                                        {legalBasis.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                                                        {formatDate(legalBasis.issueDate)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {legalBasis.issueBody || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Thủ tục hành chính liên quan */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-600" />
                                Thủ tục hành chính liên quan
                            </h3>
                            <p className="text-sm text-gray-600">Không có thông tin</p>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
