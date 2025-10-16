import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";

export default function QAPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ", href: "#" },
        { label: "Hỏi đáp" }
    ];

    const qaItems = [
        {
            question: "Làm thế nào để đăng ký tài khoản trên Cổng Dịch vụ công quốc gia?",
            answer: "Bạn có thể đăng ký tài khoản bằng cách truy cập trang đăng ký, nhập thông tin cá nhân, xác thực email và hoàn tất quá trình đăng ký. Tài khoản sẽ được kích hoạt sau khi xác thực thành công."
        },
        {
            question: "Tôi có thể nộp hồ sơ trực tuyến 24/7 không?",
            answer: "Có, bạn có thể nộp hồ sơ trực tuyến bất cứ lúc nào trong ngày. Hệ thống hoạt động 24/7 để phục vụ người dân. Tuy nhiên, thời gian xử lý hồ sơ chỉ trong giờ hành chính."
        },
        {
            question: "Làm sao để tra cứu trạng thái hồ sơ đã nộp?",
            answer: "Bạn có thể tra cứu trạng thái hồ sơ bằng cách sử dụng mã hồ sơ hoặc số CMND/CCCD trong mục 'Tra cứu hồ sơ'. Hệ thống sẽ hiển thị chi tiết tiến độ xử lý."
        },
        {
            question: "Thời gian xử lý hồ sơ là bao lâu?",
            answer: "Thời gian xử lý hồ sơ tùy thuộc vào loại dịch vụ. Thông thường từ 1-15 ngày làm việc. Bạn có thể xem thời gian cụ thể cho từng dịch vụ trong danh mục dịch vụ."
        },
        {
            question: "Tôi có thể hủy hồ sơ đã nộp không?",
            answer: "Bạn có thể hủy hồ sơ trong vòng 24 giờ sau khi nộp. Sau thời gian này, hồ sơ sẽ được chuyển đến cơ quan xử lý và không thể hủy."
        },
        {
            question: "Làm thế nào để nhận kết quả hồ sơ?",
            answer: "Kết quả hồ sơ sẽ được gửi qua email hoặc SMS theo thông tin bạn đã đăng ký. Bạn cũng có thể tải về trực tiếp từ trang tra cứu hồ sơ."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="qa"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-blue-800">
                                Hỏi đáp
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Tìm câu trả lời cho các câu hỏi thường gặp về dịch vụ công trực tuyến
                        </p>
                    </div>

                    <div className="space-y-6">
                        {qaItems.map((item, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-sm">?</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            {item.question}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">
                            Không tìm thấy câu trả lời?
                        </h3>
                        <p className="text-blue-700 mb-4">
                            Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, hãy liên hệ với chúng tôi:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-blue-700">Hotline: 1900-xxxx</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-blue-700">Email: support@pascs.gov.vn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
