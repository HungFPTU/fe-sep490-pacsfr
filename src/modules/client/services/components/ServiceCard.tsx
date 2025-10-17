"use client";

import Link from "next/link";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { formatCurrency, getServiceTypeColor, generateServiceUrl } from "../utils";
import type { Service } from "../types";

interface ServiceCardProps {
    service: Service;
    showDescription?: boolean;
    className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    showDescription = true,
    className = "",
}) => {

    return (
        <Card className={`h-full hover:shadow-lg transition-shadow duration-300 ${className}`}>
            <CardBody className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                            {service.serviceName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Mã dịch vụ: <span className="font-medium">{service.serviceCode}</span>
                        </p>
                    </div>
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getServiceTypeColor(
                            service.serviceType
                        )}`}
                    >
                        {service.serviceType}
                    </span>
                </div>

                {showDescription && (
                    <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                        {service.description}
                    </p>
                )}

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian xử lý:</span>
                        <span className="font-medium text-gray-900">
                            {service.processingTime}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ:</span>
                        <span className="font-medium text-green-600">
                            {formatCurrency(service.feeAmount)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Kết quả:</span>
                        <span className="font-medium text-gray-900">
                            {service.resultDocument}
                        </span>
                    </div>

                    {service.isOnlineAvailable && (
                        <div className="flex items-center gap-1 text-green-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-xs font-medium">Có thể làm online</span>
                        </div>
                    )}
                </div>
            </CardBody>

            <CardFooter className="p-4 pt-0">
                <Link
                    href={generateServiceUrl(service.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                    Xem chi tiết
                </Link>
            </CardFooter>
        </Card>
    );
};
