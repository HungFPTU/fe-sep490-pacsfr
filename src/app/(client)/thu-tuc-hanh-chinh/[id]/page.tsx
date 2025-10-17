"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useService } from "@/modules/client/services/hooks/useServices";
import { Card, CardBody, Button, Accordion, AccordionItem } from "@heroui/react";
import { ServiceService } from "@/modules/client/services/services/service.service";

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { data: response, isLoading, error } = useService(params.id);
    const service = response;

    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ hành chính", href: "/services" },
        { label: "Chi tiết dịch vụ" }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <GovernmentHeader breadcrumbItems={breadcrumbItems} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-gray-50">
                <GovernmentHeader breadcrumbItems={breadcrumbItems} />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-16">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Không tìm thấy dịch vụ
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.
                        </p>
                        <Button
                            color="primary"
                            onClick={() => window.history.back()}
                        >
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader breadcrumbItems={breadcrumbItems} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                    {service.serviceName}
                                </h1>
                                <Button
                                    variant="light"
                                    color="primary"
                                    size="sm"
                                >
                                    Xem chi tiết
                                </Button>
                            </div>

                            {/* Cách thức thực hiện */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Cách thức thực hiện
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hình thức nộp</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Thời hạn giải quyết</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phí/lệ phí</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Mô tả</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-100">
                                                    <td className="py-4 px-4 font-medium text-gray-900">Trực tiếp</td>
                                                    <td className="py-4 px-4 text-gray-700">{service.processingTime}</td>
                                                    <td className="py-4 px-4 text-gray-700">Phí: {ServiceService.formatFeeAmount(service.feeAmount)}</td>
                                                    <td className="py-4 px-4 text-sm text-gray-600">
                                                        Cơ quan đăng ký kinh doanh tiếp nhận hồ sơ, kiểm tra tính hợp lệ và cấp Giấy chứng nhận đăng ký Quỹ hợp tác xã địa phương hoạt động theo mô hình hợp tác xã.
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-gray-100">
                                                    <td className="py-4 px-4 font-medium text-gray-900">Trực tuyến</td>
                                                    <td className="py-4 px-4 text-gray-700">{service.processingTime}</td>
                                                    <td className="py-4 px-4 text-gray-700">Phí: {ServiceService.formatFeeAmount(service.feeAmount)}</td>
                                                    <td className="py-4 px-4 text-sm text-gray-600">
                                                        Đăng ký trực tuyến trên hệ thống thông tin đăng ký kinh doanh quốc gia.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-4 font-medium text-gray-900">Dịch vụ bưu chính</td>
                                                    <td className="py-4 px-4 text-gray-700">{service.processingTime}</td>
                                                    <td className="py-4 px-4 text-gray-700">Phí: {ServiceService.formatFeeAmount(service.feeAmount)}</td>
                                                    <td className="py-4 px-4 text-sm text-gray-600">
                                                        Gửi hồ sơ qua dịch vụ bưu chính đến cơ quan đăng ký kinh doanh.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Thành phần hồ sơ */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Thành phần hồ sơ
                                    </h2>
                                    <Accordion>
                                        <AccordionItem
                                            key="new"
                                            aria-label="Trường hợp cấp mới"
                                            title="Trường hợp cấp mới Giấy chứng nhận đăng ký"
                                            classNames={{
                                                title: "text-gray-900 font-medium",
                                                content: "pt-4"
                                            }}
                                        >
                                            <div className="space-y-4">
                                                {service.requiredDocuments?.$values?.map((doc, index) => (
                                                    <div key={doc.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                        <p className="font-medium text-gray-900 mb-2">{index + 1}. {doc.docTypeName}</p>
                                                        {doc.description && (
                                                            <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionItem>
                                        <AccordionItem
                                            key="change"
                                            aria-label="Trường hợp thay đổi"
                                            title="Trường hợp thay đổi nội dung Giấy chứng nhận đăng ký"
                                            classNames={{
                                                title: "text-gray-900 font-medium",
                                                content: "pt-4"
                                            }}
                                        >
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                    <p className="font-medium text-gray-900 mb-2">1. Đơn đề nghị thay đổi nội dung</p>
                                                    <p className="text-sm text-gray-600">Theo mẫu quy định</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                    <p className="font-medium text-gray-900 mb-2">2. Giấy chứng nhận đăng ký cũ</p>
                                                    <p className="text-sm text-gray-600">Bản gốc</p>
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </CardBody>
                            </Card>

                            {/* Trình tự thực hiện */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Trình tự thực hiện
                                    </h2>
                                    <div className="space-y-6 text-sm text-gray-700">
                                        <div className="space-y-3">
                                            <p className="font-semibold text-gray-900">Bước 1: Nộp hồ sơ</p>
                                            <div className="ml-4 space-y-2">
                                                <p>• Trực tiếp: Nộp tại cơ quan đăng ký kinh doanh cấp huyện</p>
                                                <p>• Bưu điện: Gửi qua dịch vụ bưu chính</p>
                                                <p>• Trực tuyến: Đăng ký trên hệ thống thông tin</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-semibold text-gray-900">Bước 2: Tiếp nhận và xử lý hồ sơ</p>
                                            <div className="ml-4 space-y-2">
                                                <p>• Cơ quan tiếp nhận hồ sơ và kiểm tra tính hợp lệ</p>
                                                <p>• Thời gian xử lý: {service.processingTime}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-semibold text-gray-900">Bước 3: Cấp kết quả</p>
                                            <div className="ml-4 space-y-2">
                                                <p>• Cấp Giấy chứng nhận đăng ký nếu hồ sơ hợp lệ</p>
                                                <p>• Thông báo bổ sung hồ sơ nếu thiếu hoặc không hợp lệ</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Cơ quan thực hiện */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <Accordion>
                                        <AccordionItem
                                            key="agency"
                                            aria-label="Cơ quan thực hiện"
                                            title="Cơ quan thực hiện"
                                            classNames={{
                                                title: "text-gray-900 font-medium",
                                                content: "pt-4"
                                            }}
                                        >
                                            <div className="space-y-4">
                                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                    <p className="font-medium text-blue-900 mb-2">Cơ quan có thẩm quyền quyết định:</p>
                                                    <p className="text-blue-800">Ủy ban nhân dân cấp huyện</p>
                                                </div>
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                    <p className="font-medium text-green-900 mb-2">Cơ quan trực tiếp thực hiện:</p>
                                                    <p className="text-green-800">Phòng Tài chính - Kế hoạch cấp huyện</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                    <p className="font-medium text-gray-900 mb-2">Địa chỉ:</p>
                                                    <p className="text-gray-700">Trụ sở Ủy ban nhân dân cấp huyện</p>
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </CardBody>
                            </Card>

                            {/* Yêu cầu, điều kiện */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <Accordion>
                                        <AccordionItem
                                            key="requirements"
                                            aria-label="Yêu cầu, điều kiện"
                                            title="Yêu cầu, điều kiện"
                                            classNames={{
                                                title: "text-gray-900 font-medium",
                                                content: "pt-4"
                                            }}
                                        >
                                            <div className="space-y-3 text-sm text-gray-700">
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p>Tổ chức, cá nhân có đủ điều kiện theo quy định của pháp luật</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p>Hồ sơ đầy đủ, hợp lệ theo quy định</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p>Đã nộp đủ lệ phí theo quy định</p>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p>Đáp ứng các điều kiện về vốn, nhân sự theo quy định</p>
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="shadow-sm border border-gray-200">
                                <CardBody className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Tìm kiếm
                                    </h3>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Nhập từ khóa..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                        <Button
                                            color="primary"
                                            className="w-full"
                                        >
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
