"use client";

import { useState } from "react";
import { Input, Select, SelectItem, Button, Card, CardBody, RadioGroup, Radio } from "@heroui/react";
import { useServiceGroups, useLegalBasis } from "../hooks/useServices";
import type { ServiceFilters as ServiceFiltersType, ServiceGroup, LegalBasis } from "@/modules/client/services/types";

interface ServiceFiltersProps {
    filters: ServiceFiltersType;
    onFiltersChange: (filters: ServiceFiltersType) => void;
    onReset: () => void;
    className?: string;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    filters,
    onFiltersChange,
    onReset,
    className = "",
}) => {
    const [searchKeyword, setSearchKeyword] = useState(filters.keyword);
    const [searchBy, setSearchBy] = useState("ministry");

    const { data: serviceGroups, isLoading: loadingGroups } = useServiceGroups();
    const { data: legalBasis, isLoading: loadingLegalBasis } = useLegalBasis();

    const agencies = [
        { key: "", label: "-- Chọn cơ quan --" },
        { key: "cong-thuong", label: "Bộ Công thương" },
        { key: "tai-chinh", label: "Bộ Tài chính" },
        { key: "xay-dung", label: "Bộ Xây dựng" },
        { key: "giao-thong", label: "Bộ Giao thông vận tải" },
        { key: "nong-nghiep", label: "Bộ Nông nghiệp và Phát triển nông thôn" },
        { key: "y-te", label: "Bộ Y tế" },
        { key: "giao-duc", label: "Bộ Giáo dục và Đào tạo" }
    ];

    const fields = [
        { key: "", label: "-- Chọn lĩnh vực --" },
        { key: "hop-tac-xa", label: "Thành lập và hoạt động của tổ hợp tác, hợp tác xã" },
        { key: "dang-ky-kinh-doanh", label: "Đăng ký kinh doanh" },
        { key: "xay-dung", label: "Xây dựng" },
        { key: "giao-thong", label: "Giao thông vận tải" },
        { key: "nong-nghiep", label: "Nông nghiệp" },
        { key: "y-te", label: "Y tế" },
        { key: "giao-duc", label: "Giáo dục" }
    ];

    const levels = [
        { key: "", label: "-- Chọn cấp thực hiện --" },
        { key: "trung-uong", label: "Cấp Trung ương" },
        { key: "tinh", label: "Cấp Tỉnh/Thành phố" },
        { key: "huyen", label: "Cấp Huyện/Quận" },
        { key: "xa", label: "Cấp Xã/Phường" }
    ];

    const targets = [
        { key: "", label: "-- Chọn đối tượng --" },
        { key: "ca-nhan", label: "Cá nhân" },
        { key: "to-chuc", label: "Tổ chức" },
        { key: "doanh-nghiep", label: "Doanh nghiệp" },
        { key: "hop-tac-xa", label: "Hợp tác xã" }
    ];

    const handleSearch = () => {
        onFiltersChange({
            ...filters,
            keyword: searchKeyword,
            page: 1,
        });
    };

    return (
        <div className={`w-full space-y-6 ${className}`}>
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex gap-3">
                    <Input
                        placeholder="Nhập từ khoá tìm kiếm"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="flex-1"
                        size="lg"
                        classNames={{
                            input: "text-base",
                            inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                        }}
                    />
                    <Button
                        variant="light"
                        color="primary"
                        size="lg"
                        onClick={handleSearch}
                        className="px-6"
                    >
                        Tìm kiếm rút gọn
                    </Button>
                    <Button
                        color="primary"
                        size="lg"
                        onClick={handleSearch}
                        startContent={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                        className="px-6"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            {/* Filter Section */}
            <Card className="shadow-sm border border-gray-200">
                <CardBody className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tìm theo:</h3>
                        <RadioGroup
                            value={searchBy}
                            onValueChange={setSearchBy}
                            orientation="horizontal"
                            classNames={{
                                wrapper: "gap-6"
                            }}
                        >
                            <Radio value="ministry" classNames={{ label: "text-gray-700" }}>
                                Bộ/ Ban/ Ngành
                            </Radio>
                            <Radio value="province" classNames={{ label: "text-gray-700" }}>
                                Tỉnh/ Thành phố
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Cơ quan thực hiện
                            </label>
                            <Select
                                placeholder="-- Chọn cơ quan --"
                                size="lg"
                                classNames={{
                                    trigger: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500",
                                    value: "text-gray-700"
                                }}
                                items={agencies}
                            >
                                {(agency) => (
                                    <SelectItem key={agency.key}>{agency.label}</SelectItem>
                                )}
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Lĩnh vực
                            </label>
                            <Select
                                placeholder="-- Chọn lĩnh vực --"
                                size="lg"
                                classNames={{
                                    trigger: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500",
                                    value: "text-gray-700"
                                }}
                                items={fields}
                            >
                                {(field) => (
                                    <SelectItem key={field.key}>{field.label}</SelectItem>
                                )}
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Cấp thực hiện
                            </label>
                            <Select
                                placeholder="-- Chọn cấp thực hiện ..."
                                size="lg"
                                classNames={{
                                    trigger: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500",
                                    value: "text-gray-700"
                                }}
                                items={levels}
                            >
                                {(level) => (
                                    <SelectItem key={level.key}>{level.label}</SelectItem>
                                )}
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Đối tượng thực hiện
                            </label>
                            <Select
                                placeholder="-- Chọn đối tượng --"
                                size="lg"
                                classNames={{
                                    trigger: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500",
                                    value: "text-gray-700"
                                }}
                                items={targets}
                            >
                                {(target) => (
                                    <SelectItem key={target.key}>{target.label}</SelectItem>
                                )}
                            </Select>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};