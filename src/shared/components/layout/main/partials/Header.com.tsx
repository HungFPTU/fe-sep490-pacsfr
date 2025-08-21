import Link from "next/link";
import Image from "next/image";
import { Container } from "../../Container";
import { Button } from "@/shared/components/ui/button.ui";

export function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <Container className="py-4">
                <div className="flex items-center justify-between">
                    {/* Logo và tên hệ thống */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    width={48}
                                    height={48}
                                    alt="Logo PASCS"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                PASCS
                            </span>
                            <span className="text-xs text-gray-500 -mt-1">
                                Dịch vụ hành chính công
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link href="/queue" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Hàng đợi
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/staff/queue" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Nhân viên
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Về chúng tôi
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Thông báo */}
                        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Đăng nhập */}
                        <Link href="/login">
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                                Đăng nhập
                            </Button>
                        </Link>

                        {/* Mobile menu button */}
                        <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    );
}