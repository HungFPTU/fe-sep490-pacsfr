"use client";

import { ManagerLoginForm } from "@/modules/manager/login";
import { useAuth } from "@/modules/auth/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagerLoginPage() {
    const { login, isLoading, isAuthenticated, role } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && role) {
            console.log('[Manager Login Page] Redirecting based on role:', role);

            if (role === 'Admin') {
                router.push("/manager");
            } else if (role === 'Staff') {
                router.push("/staff/dashboard");
            } else {
                router.push("/manager");
            }
        }
    }, [isAuthenticated, router, role]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-50 flex items-center justify-center px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-purple-300 rounded-lg opacity-20 transform rotate-12"></div>
                <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border-2 border-indigo-300 rounded-full opacity-20"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl flex items-center gap-12">
                {/* Left side - Branding & Info */}
                <div className="hidden lg:flex flex-1 flex-col">
                    {/* Logo và brand */}
                    <Link href="/" className="inline-flex items-center space-x-3 group mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white">
                            <Image src="/logo.png" width={56} height={56} alt="Logo PASCS" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-slate-900">PASCS</h1>
                            <p className="text-sm text-slate-600">Hệ thống quản lý hành chính công</p>
                        </div>
                    </Link>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                                Khu vực<br />
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    Quản lý
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Đăng nhập để truy cập bảng điều khiển quản trị, quản lý nhân viên và giám sát hệ thống.
                            </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Quản lý hệ thống</h3>
                                    <p className="text-sm text-slate-600">Giám sát và điều hành toàn bộ hệ thống</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Quản lý nhân viên</h3>
                                    <p className="text-sm text-slate-600">Phân quyền và quản lý tài khoản nhân viên</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Báo cáo tổng hợp</h3>
                                    <p className="text-sm text-slate-600">Xem báo cáo chi tiết và thống kê hệ thống</p>
                                </div>
                            </div>
                        </div>

                        {/* Help link */}
                        <div className="pt-6 border-t border-slate-200">
                            <p className="text-sm text-slate-600 mb-3">
                                Cần hỗ trợ quản trị?
                            </p>
                            <div className="flex gap-4 text-sm">
                                <Link href="/help" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                    Trung tâm trợ giúp
                                </Link>
                                <span className="text-slate-300">•</span>
                                <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                    Liên hệ IT
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="flex-1">
                    <ManagerLoginForm onSubmit={login} isLoading={isLoading} />

                    {/* Additional links for mobile/small screens */}
                    <div className="mt-6 text-center lg:hidden">
                        <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            ← Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>

            {/* Security badge - bottom */}
            <div className="absolute bottom-8 right-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-medium shadow-lg border border-slate-200">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kết nối bảo mật SSL/TLS
                </div>
            </div>
        </div>
    );
}
