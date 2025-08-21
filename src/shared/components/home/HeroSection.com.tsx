import Link from "next/link";
import { Container } from "@shared/components/layout/Container";
import { Button } from "@/shared/components/ui/button.ui";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            </div>

            <Container className="relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Hệ thống được tin cậy
                        </div>

                        {/* Main heading */}
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                                Cổng Quản Trị
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Dịch Vụ Công
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                            Nền tảng số hóa tiên tiến, tối ưu hóa quy trình xử lý hồ sơ và
                            <span className="text-blue-600 font-semibold"> nâng cao chất lượng phục vụ</span> người dân.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-10">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-blue-600">99.9%</div>
                                <div className="text-sm text-gray-500">Thời gian hoạt động</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-green-600">24/7</div>
                                <div className="text-sm text-gray-500">Hỗ trợ liên tục</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-purple-600">100+</div>
                                <div className="text-sm text-gray-500">Tính năng</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/login">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Truy cập hệ thống
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="relative">
                            {/* Main dashboard mockup */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="text-xs text-gray-400">PASCS Dashboard</div>
                                </div>

                                {/* Dashboard content */}
                                <div className="space-y-4">
                                    <div className="h-4 bg-gradient-to-r from-blue-300 to-blue-400 rounded w-3/4"></div>
                                    <div className="h-4 bg-gradient-to-r from-green-300 to-green-400 rounded w-1/2"></div>
                                    <div className="h-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded w-2/3"></div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                                        <div className="h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating stats */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                                <div className="text-2xl font-bold text-green-600">+15%</div>
                                <div className="text-xs text-gray-500">Hiệu suất tăng</div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                                <div className="text-2xl font-bold text-blue-600">24/7</div>
                                <div className="text-xs text-gray-500">Hoạt động</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
