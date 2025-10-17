"use client";

import { Card, CardBody, Button } from "@heroui/react";
import Link from "next/link";
import type { Service } from "../types";

interface ServiceListProps {
    services: Service[];
    loading?: boolean;
    error?: Error | null;
    showDescription?: boolean;
    className?: string;
}

export const ServiceList: React.FC<ServiceListProps> = ({
    services,
    loading = false,
    error = null,
    showDescription = true,
    className = "",
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-red-800 mb-2">Có lỗi xảy ra</h3>
                    <p className="text-red-600 mb-4">
                        Không thể tải danh sách dịch vụ: {error.message}
                    </p>
                    <Button
                        color="danger"
                        variant="flat"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy dịch vụ</h3>
                    <p className="text-gray-500 mb-4">
                        Không có dịch vụ nào phù hợp với tiêu chí tìm kiếm của bạn
                    </p>
                    <p className="text-sm text-gray-400">
                        Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Dịch vụ hành chính</h2>
                <Button
                    variant="light"
                    color="success"
                    size="sm"
                    startContent={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    }
                >
                    Xuất Excel
                </Button>
            </div>

            <Card className="shadow-sm border border-gray-200">
                <CardBody className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Mã số
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tên
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Cơ quan ban hành
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Cơ quan thực hiện
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Lĩnh vực
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {services.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/thu-tuc-hanh-chinh/${service.id}`}
                                        passHref
                                    >
                                        <tr
                                            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                            tabIndex={0}
                                            style={{ outline: 'none' }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                    {service.serviceCode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                                <div className="line-clamp-2 leading-relaxed">
                                                    {service.serviceName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                Bộ Tài chính
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                Ủy ban nhân dân cấp xã
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                                <div className="line-clamp-1">
                                                    Thành lập và hoạt động của tổ hợp tác, hợp tác xã, liên hiệp...
                                                </div>
                                            </td>
                                        </tr>
                                    </Link>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};