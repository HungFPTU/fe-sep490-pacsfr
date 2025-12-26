'use client';

import React from 'react';
import { FileX, Loader2 } from 'lucide-react';

interface CaseTableEmptyProps {
  isLoading: boolean;
}

export const CaseTableEmpty: React.FC<CaseTableEmptyProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-12 text-center">
          <Loader2 className="h-6 w-6 text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={7} className="px-4 py-12 text-center">
        <FileX className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-700">Không tìm thấy hồ sơ</p>
        <p className="text-xs text-gray-500 mt-1">Thử thay đổi bộ lọc tìm kiếm</p>
      </td>
    </tr>
  );
};
