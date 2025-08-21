import Link from "next/link";
import Image from "next/image";
import { Container } from "../../Container";

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            {/* Main footer */}
            <div className="border-b border-gray-700">
                <Container className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo và thông tin */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                                    <Image src="/logo.png" width={48} height={48} alt="Logo PASCS" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">PASCS</h3>
                                    <p className="text-sm text-gray-400">Hệ thống Tư vấn Dịch vụ Hành chính Công</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                                Nền tảng số hóa tiên tiến, tối ưu hóa quy trình xử lý hồ sơ và nâng cao chất lượng phục vụ người dân tại UBND Xã/Phường.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Dịch vụ */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Dịch vụ</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/queue" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Quản lý hàng đợi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/staff" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Bảng điều khiển nhân viên
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/reports" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Báo cáo thống kê
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/settings" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Cài đặt hệ thống
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Hỗ trợ */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Hỗ trợ</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Trung tâm trợ giúp
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Liên hệ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/documentation" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Tài liệu hướng dẫn
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/status" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                                        Trạng thái hệ thống
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Bottom footer */}
            <Container className="py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} PASCS. Bảo lưu mọi quyền.</p>
                        <div className="flex items-center gap-1">
                            <span>Phát triển bởi</span>
                            <span className="text-blue-400 font-medium">Nhóm Chùa Hoằng Pháp Trung Ương</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Chính sách bảo mật
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Điều khoản sử dụng
                        </Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Chính sách Cookie
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}