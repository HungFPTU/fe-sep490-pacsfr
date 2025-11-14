'use client';

import Link from "next/link";
import Image from "next/image";
import { UserInfo } from "./UserInfo.com";
import { useAuth } from "@/modules/auth/hooks";
import { usePathname } from "next/navigation";
import {
  HOME_NAVIGATION_ITEMS,
  HOME_BREADCRUMB_MAP,
  getHomeBreadcrumbsByPath,
  getHomeNavigationKeyByPath,
  type HomeBreadcrumbItem,
  type HomeNavigationItem,
} from "./constants/navigation";

interface GovernmentHeaderProps {
  showBreadcrumb?: boolean;
  breadcrumbItems?: HomeBreadcrumbItem[];
  currentPage?: string;
}

export function GovernmentHeader({
  showBreadcrumb = false,
  breadcrumbItems = [],
  currentPage,
}: GovernmentHeaderProps) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const derivedPageKey = getHomeNavigationKeyByPath(pathname || '/');
  const activePageKey = currentPage ?? derivedPageKey;

  const resolvedBreadcrumbs =
    breadcrumbItems.length > 0
      ? breadcrumbItems
      : getHomeBreadcrumbsByPath(pathname || '/');

  const renderNavigationItem = (item: HomeNavigationItem) => {
    const isActive = activePageKey === item.key;

    if (item.type === "home" && item.href) {
      return (
        <Link
          key={item.key}
          href={item.href}
          className={`flex items-center justify-center w-12 h-12 transition-colors ${isActive ? "bg-red-700" : "hover:bg-red-700"
            }`}
          title={item.label}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
      );
    }

    if (item.subItems && item.subItems.length > 0) {
      return (
        <div key={item.key} className="relative group">
          <button className="py-4 px-2 hover:bg-red-700 transition-colors font-medium flex items-center">
            {item.label}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.key}
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (item.href) {
      return (
        <Link
          key={item.key}
          href={item.href}
          className={`py-4 px-2 transition-colors font-medium ${isActive ? "bg-red-700" : "hover:bg-red-700"
            }`}
        >
          {item.label}
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      {/* Header với background trong-dong */}
      <header className="relative border-b border-yellow-100 min-h-[120px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/image/background/trong-dong-1.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay để đảm bảo text dễ đọc */}
        <div className="absolute inset-0 bg-yellow-100 bg-opacity-60"></div>

        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo và Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      width={48}
                      height={48}
                      alt="Logo Cổng Dịch vụ công quốc gia"
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

              {/* User Info - Hiển thị khi đã đăng nhập */}
              {isAuthenticated && <UserInfo />}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center overflow-hidden">
          <div className="relative w-[2000px] h-[2000px] mx-auto">
            <Image
              src="/assets/image/background/trong-dong-1.jpg"
              alt="Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {HOME_NAVIGATION_ITEMS.map(renderNavigationItem)}
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      {showBreadcrumb && resolvedBreadcrumbs.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              {resolvedBreadcrumbs.map((item, index) => (
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
