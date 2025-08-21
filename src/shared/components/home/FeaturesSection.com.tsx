import { Container } from "@shared/components/layout/Container";
import { FeatureCard } from "./FeatureCard.com";

const features = [
    {
        title: "Quản lý hàng đợi thông minh",
        description: "Hệ thống hàng đợi tự động với AI, tối ưu thời gian chờ và nâng cao trải nghiệm người dân.",
        icon: "queue",
        color: "blue",
        stats: "Giảm 60% thời gian chờ"
    },
    {
        title: "Dashboard thời gian thực",
        description: "Theo dõi KPI, hiệu suất làm việc và tiến độ xử lý hồ sơ với báo cáo trực quan.",
        icon: "analytics",
        color: "green",
        stats: "99.9% độ chính xác"
    },
    {
        title: "Phân công thông minh",
        description: "AI hỗ trợ phân bổ và điều phối hồ sơ đến nhân sự phù hợp dựa trên năng lực và khối lượng công việc.",
        icon: "assignment",
        color: "purple",
        stats: "+35% hiệu suất"
    },
    {
        title: "Báo cáo tự động",
        description: "Tạo báo cáo tổng hợp tự động, hỗ trợ ra quyết định nhanh chóng và chính xác.",
        icon: "report",
        color: "orange",
        stats: "24/7 cập nhật"
    },
    {
        title: "Bảo mật đa lớp",
        description: "Hệ thống bảo mật tiên tiến với mã hóa end-to-end, đảm bảo an toàn thông tin người dân.",
        icon: "security",
        color: "red",
        stats: "ISO 27001 certified"
    },
    {
        title: "Tích hợp đa nền tảng",
        description: "Kết nối liền mạch với các hệ thống hiện có, hỗ trợ API mở và webhook.",
        icon: "integration",
        color: "indigo",
        stats: "100+ API endpoints"
    }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IconComponent = ({ type, className }: { type: string; className?: string }) => {
    const icons = {
        queue: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        analytics: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        assignment: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        report: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        security: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        integration: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    };

    return icons[type as keyof typeof icons] || icons.queue;
};

export function FeaturesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tính năng hàng đầu
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Giải pháp toàn diện cho
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> dịch vụ công</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Nền tảng PASCS cung cấp bộ công cụ mạnh mẽ, giúp tối ưu hóa mọi quy trình
                        từ quản lý hàng đợi đến báo cáo phân tích.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            color={feature.color}
                            stats={feature.stats}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">
                            Sẵn sàng trải nghiệm PACSFR?
                        </h3>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                            Gia nhập hàng nghìn tổ chức đã tin tử và sử dụng PACSFR để cải thiện
                            chất lượng phục vụ người dân.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                                Bắt đầu dùng thử
                            </button>
                            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                                Xem demo trực tiếp
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
