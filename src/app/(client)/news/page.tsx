import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";

export default function NewsPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Tin tức" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="news"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Tin tức dịch vụ công
                    </h1>

                    <div className="space-y-6">
                        <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Cổng Dịch vụ công quốc gia nâng cấp hệ thống
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Hệ thống PASCS đã được nâng cấp với nhiều tính năng mới, giúp người dân dễ dàng tiếp cận các dịch vụ công trực tuyến.
                            </p>
                            <div className="text-sm text-gray-500">
                                Ngày đăng: 15/10/2025
                            </div>
                        </article>

                        <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Thêm 5 dịch vụ công mới được số hóa
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Bộ Thông tin và Truyền thông vừa công bố thêm 5 dịch vụ công mới được số hóa hoàn toàn, bao gồm đăng ký khai sinh, kết hôn, và các thủ tục hành chính khác.
                            </p>
                            <div className="text-sm text-gray-500">
                                Ngày đăng: 10/10/2025
                            </div>
                        </article>

                        <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Hướng dẫn sử dụng dịch vụ công trực tuyến
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Video hướng dẫn chi tiết cách sử dụng các dịch vụ công trực tuyến trên Cổng Dịch vụ công quốc gia PASCS.
                            </p>
                            <div className="text-sm text-gray-500">
                                Ngày đăng: 05/10/2025
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </div>
    );
}
