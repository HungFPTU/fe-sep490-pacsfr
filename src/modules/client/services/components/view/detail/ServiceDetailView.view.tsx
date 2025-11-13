"use client";

import { useState } from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { useService } from "../../../hooks/useServices";
import { useServiceGroup } from "@/modules/client/services-group";
import { LoadingSpinner } from "@/shared/components/common";
import { ServiceDetailPopup } from "../../ui/detail/ServiceDetailPopup.ui";
import {
    formatCurrency,
    formatDate,
    formatProcessingTime,
    formatServiceType,
    formatDocumentType,
    formatStatus,
    formatExecutionLevel,
    formatField,
} from "../../../utils";
import {
    FileText,
    Clock,
    DollarSign,
    CheckCircle2,
    Building2,
    Scale,
    FileCheck,
    ArrowRight,
    ExternalLink,
    Send,
    ChevronDown,
    ChevronUp,
    Briefcase,
    Info,
    Download,
    Calendar,
    MapPin,
    AlertCircle,
    BookOpen,
    User,
    Eye
} from "lucide-react";

interface ServiceDetailViewProps {
    serviceId: string;
    className?: string;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
    serviceId,
    className = "",
}) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        requiredDocuments: false,
        serviceAgencies: false,
        requirements: false,
    });
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const { data: response, isLoading, error } = useService(serviceId);
    const service = response?.data;

    // Fetch service group data
    const { data: serviceGroupResponse, isLoading: isLoadingServiceGroup } = useServiceGroup(service?.serviceGroupId || "");

    const serviceGroup = serviceGroupResponse?.data;

    if (isLoading || isLoadingServiceGroup) {
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

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {service.serviceName}
                            </h1>
                            {service.serviceType && (
                                <Chip
                                    className="bg-blue-100 text-blue-800 border-blue-200 text-sm font-medium"
                                    size="sm"
                                >
                                    {formatServiceType(service.serviceType)}
                                </Chip>
                            )}
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-lg text-red-600 font-semibold">
                                Mã dịch vụ: {service.serviceCode}
                            </span>
                            {service.isOnlineAvailable && (
                                <Chip
                                    className="bg-green-100 text-green-800 border-green-300"
                                    size="sm"
                                    startContent={
                                        <CheckCircle2 className="w-4 h-4" />
                                    }
                                >
                                    Có thể làm online
                                </Chip>
                            )}
                        </div>
                    </div>
                    <Button
                        color="primary"
                        variant="solid"
                        startContent={<Eye className="w-4 h-4" />}
                        onPress={() => setIsDetailModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Xem chi tiết đầy đủ
                    </Button>
                </div>
                {service.description && (
                    <p className="text-gray-700 leading-relaxed">
                        {service.description}
                    </p>
                )}
            </div>

            {/* Cách thức thực hiện - Table Format */}
            {service.submissionMethods?.$values && service.submissionMethods.$values.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Cách thức thực hiện
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                        Hình thức nộp
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                        Thời hạn giải quyết
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                        Phí, lệ phí
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Mô tả
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {service.submissionMethods.$values.map((method, index) => (
                                    <tr key={method.id || index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-300">
                                            {method.submissionMethodName}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                                            {method.processingTime ? formatProcessingTime(method.processingTime) : service.processingTime || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                                            {method.fee !== undefined && method.fee !== null
                                                ? `Phí: ${formatCurrency(method.fee)}`
                                                : service.feeAmount !== undefined && service.feeAmount !== null
                                                    ? `Phí: ${formatCurrency(service.feeAmount)}`
                                                    : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
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
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <button
                        onClick={() => toggleSection('requiredDocuments')}
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="text-xl font-bold text-gray-900">
                            Thành phần hồ sơ
                        </h2>
                        {expandedSections.requiredDocuments ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </button>
                    {expandedSections.requiredDocuments && (
                        <div className="px-6 pb-6 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-4 pt-4">Bao gồm:</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                                                Loại giấy tờ
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-300 w-24">
                                                Bản chính
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-300 w-24">
                                                Bản sao
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-48">
                                                Mẫu đơn, tờ khai
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
                                                <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-300">
                                                    1
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-300">
                                                    0
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    -
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Trình tự thực hiện */}
            {service.serviceProcedures?.$values && service.serviceProcedures.$values.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Trình tự thực hiện
                    </h2>
                    <div className="space-y-4">
                        {service.serviceProcedures.$values
                            .sort((a, b) => a.stepNumber - b.stepNumber)
                            .map((procedure) => (
                                <div key={procedure.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        {procedure.stepNumber}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            <strong>Bước {procedure.stepNumber}: {procedure.stepName}</strong>
                                            {procedure.stepDescription && (
                                                <>: {procedure.stepDescription}</>
                                            )}
                                        </p>
                                        {(procedure.responsibleUnit || procedure.processingTime || procedure.notes) && (
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                                                {procedure.responsibleUnit && (
                                                    <span>Đơn vị: {procedure.responsibleUnit}</span>
                                                )}
                                                {procedure.processingTime && (
                                                    <span>Thời gian: {procedure.processingTime}</span>
                                                )}
                                                {procedure.notes && (
                                                    <span>Ghi chú: {procedure.notes}</span>
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
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <button
                        onClick={() => toggleSection('serviceAgencies')}
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="text-xl font-bold text-gray-900">
                            Cơ quan thực hiện
                        </h2>
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
                                    <div key={agency.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-1">
                                            {agency.agencyName}
                                        </h3>
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
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                    onClick={() => toggleSection('requirements')}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-gray-900">
                        Yêu cầu, điều kiện
                    </h2>
                    {expandedSections.requirements ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>
                {expandedSections.requirements && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                        <div className="pt-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {service.description || 'Không có thông tin'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Căn cứ pháp lý */}
            {service.legalBases?.$values && service.legalBases.$values.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-blue-600" />
                        Căn cứ pháp lý
                    </h2>
                    <div className="space-y-4">
                        {service.legalBases.$values.map((legalBasis, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-gray-900 mb-3">{legalBasis.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-600">Số văn bản:</span>
                                        <span className="font-semibold text-gray-900 ml-2">{legalBasis.documentNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Loại văn bản:</span>
                                        <span className="font-semibold text-gray-900 ml-2">{formatDocumentType(legalBasis.documentType)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Ngày ban hành:</span>
                                        <span className="font-semibold text-gray-900 ml-2">{formatDate(legalBasis.issueDate)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Cơ quan ban hành:</span>
                                        <span className="font-semibold text-gray-900 ml-2">{legalBasis.issueBody}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Ngày hiệu lực:</span>
                                        <span className="font-semibold text-gray-900 ml-2">{formatDate(legalBasis.effectiveDate)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Trạng thái:</span>
                                        <Chip size="sm" className="bg-green-100 text-green-800 ml-2">
                                            {formatStatus(legalBasis.status)}
                                        </Chip>
                                    </div>
                                </div>
                                {legalBasis.fileUrl && (
                                    <a
                                        href={legalBasis.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        <Download className="w-4 h-4" />
                                        Tải tài liệu
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Thủ tục hành chính liên quan */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Thủ tục hành chính liên quan
                </h2>
                <p className="text-sm text-gray-600">Không có thông tin</p>
            </div>

            {/* Detail Modal */}
            <ServiceDetailPopup
                service={service}
                serviceGroup={serviceGroup}
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            />
        </div>
    );
};
