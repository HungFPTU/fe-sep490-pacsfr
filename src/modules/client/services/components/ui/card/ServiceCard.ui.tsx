"use client";

import Link from "next/link";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { formatCurrency, getServiceTypeColor, generateServiceUrl } from "../../../utils";
import type { Service } from "../../../types";

interface ServiceCardProps {
    service: Service;
    showDescription?: boolean;
    className?: string;
    variant?: "default" | "compact" | "featured";
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    showDescription = true,
    className = "",
    variant = "default",
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case "compact":
                return "hover:shadow-md transition-all duration-200 hover:-translate-y-1";
            case "featured":
                return "hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-100";
            default:
                return "hover:shadow-lg transition-shadow duration-300";
        }
    };

    const getCardSize = () => {
        switch (variant) {
            case "compact":
                return "p-3";
            case "featured":
                return "p-6";
            default:
                return "p-4";
        }
    };

    return (
        <Card className={`h-full ${getVariantClasses()} ${className}`}>
            <CardBody className={getCardSize()}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className={`font-semibold text-gray-900 line-clamp-2 mb-1 ${variant === "featured" ? "text-xl" : "text-lg"
                            }`}>
                            {service.serviceName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Mã dịch vụ: <span className="font-medium text-blue-600">{service.serviceCode}</span>
                        </p>
                    </div>
                    <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${variant === "featured" ? "px-4 py-2 text-sm" : ""
                            } ${getServiceTypeColor(service.serviceType)}`}
                    >
                        {service.serviceType}
                    </span>
                </div>

                {showDescription && (
                    <p className={`text-gray-700 line-clamp-3 mb-4 ${variant === "compact" ? "text-sm mb-3" : "text-sm"
                        }`}>
                        {service.description}
                    </p>
                )}

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Thời gian xử lý
                        </span>
                        <span className="font-medium text-gray-900">
                            {service.processingTime}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Phí dịch vụ
                        </span>
                        <span className="font-medium text-green-600">
                            {formatCurrency(service.feeAmount)}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Kết quả
                        </span>
                        <span className="font-medium text-gray-900">
                            {service.resultDocument}
                        </span>
                    </div>

                    {service.isOnlineAvailable && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
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

            <CardFooter className={`${getCardSize()} pt-0`}>
                <Link
                    href={generateServiceUrl(service.id)}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 text-center ${variant === "featured"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                            : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
                        }`}
                >
                    {variant === "featured" ? "Xem chi tiết ngay" : "Xem chi tiết"}
                </Link>
            </CardFooter>
        </Card>
    );
};
