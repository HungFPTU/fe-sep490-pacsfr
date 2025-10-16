import { Container } from "@shared/components/layout/Container";

const stats = [
    {
        value: "500+",
        label: "Đơn vị sử dụng",
        description: "UBND Xã/Phường tin tưởng"
    },
    {
        value: "1M+",
        label: "Hồ sơ xử lý",
        description: "Mỗi tháng trên toàn quốc"
    },
    {
        value: "99.9%",
        label: "Thời gian hoạt động",
        description: "Đảm bảo ổn định 24/7"
    },
    {
        value: "4.9/5",
        label: "Đánh giá từ người dùng",
        description: "Hài lòng về dịch vụ"
    }
];

export function StatsSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            </div>

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Được tin cậy bởi hàng triệu người dân
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                        PASCS đã giúp các đơn vị hành chính cải thiện đáng kể chất lượng phục vụ
                        và tối ưu hóa quy trình làm việc.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-xl font-semibold mb-2 text-red-100">
                                    {stat.label}
                                </div>
                                <div className="text-sm opacity-80 leading-relaxed">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust indicators */}
                <div className="mt-20 text-center">
                    <p className="text-lg opacity-90 mb-8">Được chứng nhận và tuân thủ các tiêu chuẩn:</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">ISO 27001</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">GDPR Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">SOC 2 Type II</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Bộ TT&TT</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
