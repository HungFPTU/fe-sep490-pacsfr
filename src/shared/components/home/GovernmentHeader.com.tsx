import { APP_CONFIG } from "@/core/config/constants";
import Link from "next/link";
import Image from "next/image";

interface GovernmentHeaderProps {
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  currentPage?: string;
}

export function GovernmentHeader({
  showBreadcrumb = false,
  breadcrumbItems = [],
  currentPage = "home"
}: GovernmentHeaderProps) {
  return (
    <>
      {/* Header với background pattern */}
      <header className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23dc2626&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo và Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <Image
                      src={APP_CONFIG.LOGO}
                      width={48}
                      height={48}
                      alt={`Logo ${APP_CONFIG.NAME}`}
                      priority
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-red-600">
                    CỔNG DỊCH VỤ CÔNG QUỐC GIA
                  </h1>
                  <p className="text-lg font-semibold text-gray-800">
                    PASCS
                  </p>
                </div>
              </div>
            </div>

            {/* Language và Auth */}
            <div className="flex items-center space-x-4">
              <select className="bg-transparent border border-gray-300 rounded px-3 py-1 text-sm">
                <option>Tiếng Việt</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`flex items-center space-x-2 py-4 px-2 transition-colors ${currentPage === "home"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="font-medium">Giới thiệu</span>
            </Link>
            <Link
              href="/search"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "search"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Thủ tục hành chính
            </Link>
            <Link
              href="/submit"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "submit"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Nộp hồ sơ trực tuyến
            </Link>
            <Link
              href="/lookup"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "lookup"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Tra cứu hồ sơ
            </Link>
            <Link
              href="/feedback"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "feedback"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Phản ánh - Kiến nghị
            </Link>
            <Link
              href="/evaluation"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "evaluation"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Đánh giá
            </Link>
            <Link
              href="/statistics"
              className={`py-4 px-2 transition-colors font-medium ${currentPage === "statistics"
                ? "bg-red-700"
                : "hover:bg-red-700"
                }`}
            >
              Thống kê
            </Link>
            <div className="relative group">
              <button className="py-4 px-2 hover:bg-red-700 transition-colors font-medium flex items-center">
                Hỗ trợ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/payment"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Thanh toán trực tuyến
                  </Link>
                  <Link
                    href="/guide"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Hướng dẫn sử dụng
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Câu hỏi thường gặp
                  </Link>
                  <Link
                    href="/qa"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Hỏi đáp
                  </Link>
                  <Link
                    href="/survey"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Khảo sát ý kiến
                  </Link>
                  <Link
                    href="/search-questions"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Tra cứu câu hỏi
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Số điện thoại hướng dẫn giải quyết TTHC
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      {showBreadcrumb && breadcrumbItems.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && (
                    <span className="text-gray-400">&gt;</span>
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
