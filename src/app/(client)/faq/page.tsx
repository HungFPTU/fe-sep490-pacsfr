"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useState } from "react";

export default function FAQPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ", href: "#" },
        { label: "Câu hỏi thường gặp" }
    ];

    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(2); // Default expand question 2
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const categories = [
        "Tất cả",
        "Trung tâm dữ liệu quốc gia",
        "Cục Cảnh sát Phòng cháy chữa cháy và Cứu nạn cứu hộ",
        "Thanh tra Bộ Công an",
        "Cục Quản lý xuất nhập cảnh",
        "Cục An ninh mạng và phòng chống tội phạm sử dụng công nghệ cao",
        "Cục Cảnh sát giao thông",
        "Cục Cảnh sát điều tra tội phạm về tham nhũng, kinh tế, buôn lậu"
    ];

    const faqs = [
        {
            id: 1,
            question: "Danh mục dịch vụ công trực tuyến ngành Công an?",
            answer: "Danh mục dịch vụ công trực tuyến ngành Công an bao gồm các dịch vụ như đăng ký khai sinh, kết hôn, khai tử, cấp thẻ căn cước công dân, hộ chiếu, giấy phép lái xe và nhiều dịch vụ khác."
        },
        {
            id: 2,
            question: "Các trường hợp thu hồi giấy phép, giấy xác nhận về công cụ hỗ trợ?",
            answer: "Các trường hợp thu hồi giấy phép, giấy xác nhận về công cụ hỗ trợ bao gồm: vi phạm quy định pháp luật, không đảm bảo chất lượng, hết hạn sử dụng, hoặc theo yêu cầu của cơ quan có thẩm quyền."
        },
        {
            id: 3,
            question: "Có thể đăng ký chuyển thẻ Căn cước công dân qua đường bưu điện đến địa chỉ theo yêu cầu của công dân được không?",
            answer: "Có, công dân có thể đăng ký chuyển thẻ Căn cước công dân qua đường bưu điện đến địa chỉ theo yêu cầu. Dịch vụ này được cung cấp bởi Bưu điện Việt Nam với phí dịch vụ theo quy định."
        },
        {
            id: 4,
            question: "Công dân phải đổi thẻ Căn cước công dân trong những trường hợp nào?",
            answer: "Theo quy định tại khoản 1 Điều 21 và Khoản 1 Điều 23 Luật Căn cước công dân, công dân phải đổi thẻ Căn cước công dân trong các trường hợp sau:\n• Đủ 25 tuổi, đủ 40 tuổi, đủ 60 tuổi\n• Thẻ bị hư hỏng không sử dụng được\n• Thay đổi thông tin về họ, chữ đệm, tên; đặc điểm nhận dạng\n• Xác định lại giới tính, quê quán\n• Có sai sót về thông tin trên thẻ\n• Theo yêu cầu của công dân"
        },
        {
            id: 5,
            question: "Công dân được cấp lại thẻ căn cước công dân trong những trường hợp nào?",
            answer: "Công dân được cấp lại thẻ Căn cước công dân trong các trường hợp: thẻ bị mất, thẻ bị hư hỏng không sử dụng được, hoặc theo yêu cầu của công dân khi có lý do chính đáng."
        },
        {
            id: 6,
            question: "Ai có thẩm quyền cấp, đổi, cấp lại Căn cước công dân?",
            answer: "Cơ quan Công an có thẩm quyền cấp, đổi, cấp lại thẻ Căn cước công dân bao gồm: Công an cấp huyện, Công an cấp tỉnh, và Cục Cảnh sát quản lý hành chính về trật tự xã hội."
        },
        {
            id: 7,
            question: "Các phương tiện phòng cháy chữa cháy nào phải dán tem kiểm định và dán theo mẫu nào?",
            answer: "Các phương tiện phòng cháy chữa cháy phải dán tem kiểm định bao gồm: bình chữa cháy, hệ thống báo cháy, hệ thống chữa cháy tự động, và các thiết bị PCCC khác theo quy định của pháp luật."
        },
        {
            id: 8,
            question: "Thế nào là kết quả giải quyết thủ tục hành chính?",
            answer: "Kết quả giải quyết thủ tục hành chính là văn bản, giấy tờ, hoặc thông báo do cơ quan có thẩm quyền cấp cho công dân, tổ chức sau khi hoàn thành việc giải quyết thủ tục hành chính theo quy định."
        },
        {
            id: 9,
            question: "Có mấy hình thức thực hiện thủ tục hành chính qua dịch vụ bưu chính công ích? Là những hình thức nào?",
            answer: "Có 3 hình thức thực hiện thủ tục hành chính qua dịch vụ bưu chính công ích:\n1. Nộp hồ sơ qua bưu điện\n2. Nhận kết quả qua bưu điện\n3. Nộp hồ sơ và nhận kết quả qua bưu điện (toàn trình)"
        },
        {
            id: 10,
            question: "Dịch vụ công trực tuyến là gì và có mấy mức độ?",
            answer: "Dịch vụ công trực tuyến là dịch vụ hành chính công được cung cấp trên môi trường mạng. Có 4 mức độ:\n• Mức độ 1: Công bố thông tin\n• Mức độ 2: Tải về mẫu hồ sơ\n• Mức độ 3: Nộp hồ sơ trực tuyến\n• Mức độ 4: Xử lý hồ sơ trực tuyến toàn trình"
        }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching:", { searchKeyword, selectedCategory });
    };

    const toggleQuestion = (id: number) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
    };

    const totalPages = Math.ceil(faqs.length / recordsPerPage);
    // const startRecord = (currentPage - 1) * recordsPerPage + 1;
    // const endRecord = Math.min(currentPage * recordsPerPage, faqs.length);

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="faq"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Search and Filter Section */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhập từ khóa
                                </label>
                                <input
                                    type="text"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    placeholder="Nhập từ khóa tìm kiếm"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Danh mục
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* FAQ List */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Câu hỏi thường gặp
                        </h1>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <button
                                        onClick={() => toggleQuestion(faq.id)}
                                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                    <span className="text-red-600 font-bold text-lg">③</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    {faq.question}
                                                </h3>
                                                {expandedQuestion === faq.id && (
                                                    <div className="mt-4 text-gray-600 leading-relaxed">
                                                        {faq.answer.split('\n').map((line, index) => (
                                                            <div key={index} className="mb-2">
                                                                {line.startsWith('•') ? (
                                                                    <div className="flex items-start">
                                                                        <span className="text-red-600 mr-2">•</span>
                                                                        <span>{line.substring(1).trim()}</span>
                                                                    </div>
                                                                ) : (
                                                                    <span>{line}</span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedQuestion === faq.id ? 'rotate-180' : ''
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <div className="text-sm text-gray-600">
                                Tổng số {totalPages} Trang, {faqs.length} bản ghi.
                                Chuyển tới Trang {currentPage} Hiển thị {recordsPerPage} Bản ghi/1 Trang
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-gray-600">Trang</label>
                                    <select
                                        value={currentPage}
                                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                Trang {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-gray-600">Hiển thị</label>
                                    <select
                                        value={recordsPerPage}
                                        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
