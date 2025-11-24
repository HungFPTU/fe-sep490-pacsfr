"use client";

import Link from "next/link";
import { LoadingSpinner } from "@/shared/components/common";
import type { Service } from "../../../types";

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
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-red-800 mb-2">Có lỗi xảy ra</h3>
                    <p className="text-red-600">{error.message}</p>
                </div>
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy dịch vụ</h3>
                    <p className="text-gray-600">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã số
                            </th>
                            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên
                            </th>
                            <th className="hidden md:table-cell px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số quyết định
                            </th>
                            <th className="hidden lg:table-cell px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cấp thực hiện
                            </th>
                            <th className="hidden lg:table-cell px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lĩnh vực
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                                    <Link
                                        href={`/thu-tuc-hanh-chinh/${service.id}`}
                                        className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                                    >
                                        {service.serviceCode}
                                    </Link>
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                                    <div>
                                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                                            {service.serviceName}
                                        </div>
                                        {showDescription && (
                                            <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
                                                {service.description}
                                            </div>
                                        )}
                                        {/* Mobile: Show additional info */}
                                        <div className="md:hidden mt-2 space-y-1 text-xs text-gray-600">
                                            {service.decisionNumber && (
                                                <div><strong>Số QĐ:</strong> {service.decisionNumber}</div>
                                            )}
                                            {service.executionLevel && (
                                                <div><strong>Cấp:</strong> {service.executionLevel}</div>
                                            )}
                                            {service.field && (
                                                <div><strong>Lĩnh vực:</strong> {service.field}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {service.decisionNumber || '-'}
                                </td>
                                <td className="hidden lg:table-cell px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {service.executionLevel || '-'}
                                </td>
                                <td className="hidden lg:table-cell px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {service.field || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};