// Case Status Color Mapping
// Maps status names/codes to badge colors and icons

export interface StatusColorConfig {
  bg: string;
  text: string;
  border: string;
  icon: string;
}

const statusColorMap: Record<string, StatusColorConfig> = {
  // By name
  'Mới tiếp nhận': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  'Đã tiếp nhận': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  'Đang xử lý': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  'Đã kiểm tra': {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Hoàn thành': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Đã hoàn thành': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Hủy': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Đã hủy': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Hủy hồ sơ': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Tạm dừng': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  // Default fallback
  'default': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
};

export function getStatusColorConfig(statusName: string): StatusColorConfig {
  return statusColorMap[statusName] || statusColorMap['default'];
}

export function getAllStatusColors(): Record<string, StatusColorConfig> {
  return statusColorMap;
}
