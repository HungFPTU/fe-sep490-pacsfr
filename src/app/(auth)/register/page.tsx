"use client";

import { RegisterForm } from "@/modules/auth/components/register/RegisterForm";
import { useAuth } from "@/modules/auth/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
    const { register, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/queue"); // Redirect to protected route
        }
    }, [isAuthenticated, router]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Logo và brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-3 group">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <Image src="/logo.png" width={48} height={48} alt="Logo PASCS" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-gray-900">PASCS</h1>
                            <p className="text-sm text-gray-500">Dịch vụ hành chính công</p>
                        </div>
                    </Link>
                </div>

                {/* Card đăng ký */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8">
                    {/* Form */}
                    <RegisterForm onSubmit={register} isLoading={isLoading} />

                    {/* Navigation to login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-4">
                                Cần hỗ trợ? Liên hệ bộ phận IT của đơn vị
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                                <Link href="/help" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                                    Trung tâm trợ giúp
                                </Link>
                                <span className="hidden sm:inline text-gray-300">•</span>
                                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                                    Liên hệ hỗ trợ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security notice */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Thông tin được bảo mật và mã hóa
                    </div>
                </div>
            </div>
        </div>
    );
}