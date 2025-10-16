"use client";

import { useState, useMemo } from "react";
import { SearchFilters } from "@/shared/components/search/SearchFilters.com";
import { SearchResults } from "@/shared/components/search/SearchResults.com";
import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";

interface Procedure {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
    department: string;
    processingTime: string;
    fee: string;
    status: "active" | "inactive";
}

const allProcedures: Procedure[] = [
    {
        id: "birth-certificate",
        name: "Đăng ký khai sinh",
        icon: "👶",
        description: "Đăng ký khai sinh cho trẻ em mới sinh",
        category: "Hành chính",
        department: "UBND cấp xã/phường",
        processingTime: "1-3 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "marriage-registration",
        name: "Đăng ký kết hôn",
        icon: "💒",
        description: "Đăng ký kết hôn trực tuyến",
        category: "Hành chính",
        department: "UBND cấp xã/phường",
        processingTime: "3-5 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "death-certificate",
        name: "Đăng ký khai tử",
        icon: "🕊️",
        description: "Đăng ký khai tử cho người đã mất",
        category: "Hành chính",
        department: "UBND cấp xã/phường",
        processingTime: "1-2 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "household-registration",
        name: "Đăng ký hộ khẩu",
        icon: "🏠",
        description: "Quản lý hộ khẩu gia đình",
        category: "Hành chính",
        department: "UBND cấp xã/phường",
        processingTime: "3-5 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "id-card",
        name: "Cấp thẻ căn cước công dân",
        icon: "🆔",
        description: "Cấp thẻ căn cước công dân",
        category: "Hành chính",
        department: "Công an cấp huyện",
        processingTime: "7-10 ngày làm việc",
        fee: "30.000 VNĐ",
        status: "active"
    },
    {
        id: "passport",
        name: "Cấp hộ chiếu",
        icon: "📘",
        description: "Cấp hộ chiếu phổ thông",
        category: "Hành chính",
        department: "Công an cấp tỉnh",
        processingTime: "8-10 ngày làm việc",
        fee: "200.000 VNĐ",
        status: "active"
    },
    {
        id: "business-license",
        name: "Đăng ký kinh doanh",
        icon: "💼",
        description: "Đăng ký thành lập doanh nghiệp",
        category: "Kinh tế",
        department: "Sở Kế hoạch và Đầu tư",
        processingTime: "3-5 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "tax-registration",
        name: "Đăng ký thuế",
        icon: "💰",
        description: "Đăng ký mã số thuế",
        category: "Thuế",
        department: "Cục Thuế",
        processingTime: "1-2 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "social-insurance",
        name: "Bảo hiểm xã hội",
        icon: "🛡️",
        description: "Đăng ký bảo hiểm xã hội",
        category: "Bảo hiểm",
        department: "Bảo hiểm xã hội Việt Nam",
        processingTime: "1-3 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "health-insurance",
        name: "Bảo hiểm y tế",
        icon: "🏥",
        description: "Đăng ký bảo hiểm y tế",
        category: "Bảo hiểm",
        department: "Bảo hiểm xã hội Việt Nam",
        processingTime: "1-2 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "unemployment-benefit",
        name: "Trợ cấp thất nghiệp",
        icon: "💼",
        description: "Đăng ký hưởng trợ cấp thất nghiệp",
        category: "An sinh xã hội",
        department: "Trung tâm dịch vụ việc làm",
        processingTime: "5-7 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "pension",
        name: "Lương hưu",
        icon: "👴",
        description: "Đăng ký hưởng lương hưu",
        category: "An sinh xã hội",
        department: "Bảo hiểm xã hội Việt Nam",
        processingTime: "10-15 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "disability-benefit",
        name: "Trợ cấp người khuyết tật",
        icon: "♿",
        description: "Đăng ký trợ cấp người khuyết tật",
        category: "An sinh xã hội",
        department: "UBND cấp xã/phường",
        processingTime: "7-10 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "child-benefit",
        name: "Trợ cấp trẻ em",
        icon: "👶",
        description: "Đăng ký trợ cấp trẻ em",
        category: "An sinh xã hội",
        department: "UBND cấp xã/phường",
        processingTime: "5-7 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "education-support",
        name: "Hỗ trợ giáo dục",
        icon: "📚",
        description: "Đăng ký hỗ trợ học phí",
        category: "Giáo dục",
        department: "Sở Giáo dục và Đào tạo",
        processingTime: "10-15 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    },
    {
        id: "housing-support",
        name: "Hỗ trợ nhà ở",
        icon: "🏘️",
        description: "Đăng ký hỗ trợ nhà ở xã hội",
        category: "Nhà ở",
        department: "Sở Xây dựng",
        processingTime: "15-20 ngày làm việc",
        fee: "Miễn phí",
        status: "active"
    }
];

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const categories = Array.from(new Set(allProcedures.map(p => p.category)));
    const departments = Array.from(new Set(allProcedures.map(p => p.department)));

    const filteredProcedures = useMemo(() => {
        const filtered = allProcedures.filter(procedure => {
            const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                procedure.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || procedure.category === selectedCategory;
            const matchesDepartment = !selectedDepartment || procedure.department === selectedDepartment;

            return matchesSearch && matchesCategory && matchesDepartment;
        });

        // Sort
        filtered.sort((a, b) => {
            let aValue: string | number = a[sortBy as keyof Procedure];
            let bValue: string | number = b[sortBy as keyof Procedure];

            if (sortBy === "name" || sortBy === "category" || sortBy === "department") {
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
            }

            if (sortOrder === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, selectedDepartment, sortBy, sortOrder]);

    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ công" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="search"
            />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Tra cứu dịch vụ công
                    </h1>
                    <p className="text-gray-600">
                        Tìm kiếm và lọc các dịch vụ công trực tuyến quốc gia
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <SearchFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedDepartment={selectedDepartment}
                            setSelectedDepartment={setSelectedDepartment}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            categories={categories}
                            departments={departments}
                        />
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <SearchResults
                            procedures={filteredProcedures}
                            totalCount={allProcedures.length}
                            filteredCount={filteredProcedures.length}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
