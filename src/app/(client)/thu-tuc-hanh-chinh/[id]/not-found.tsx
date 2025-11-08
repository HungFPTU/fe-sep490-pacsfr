import Link from 'next/link';
import { Button } from '@/shared/components/ui/button.ui';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Không tìm thấy thủ tục
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Thủ tục hành chính bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/thu-tuc-hanh-chinh">
            <Button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
              Về danh sách thủ tục
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

