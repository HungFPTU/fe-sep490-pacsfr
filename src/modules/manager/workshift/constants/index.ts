export const QUERY_KEYS = {
  WORKSHIFT_BASE: ['workshift'] as const,
  WORKSHIFT_LIST: ['workshift', 'list'] as const,
  WORKSHIFT_DETAIL: (id: string) => ['workshift', 'detail', id] as const,
};

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const DEFAULT_PAGE_SIZE = 10;

export const WORKSHIFT_TYPE_OPTIONS = [
  { value: 'Sáng', label: 'Sáng' },
  { value: 'Chiều', label: 'Chiều' },
  { value: 'Cả ngày', label: 'Cả ngày' },
];

// Color mapping for shift types
export const SHIFT_TYPE_COLORS: Record<string, { bg: string; text: string; textLight: string; hover: string }> = {
  'Sáng': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    textLight: 'text-green-600',
    hover: 'hover:bg-green-200',
  },
  'Chiều': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    textLight: 'text-yellow-600',
    hover: 'hover:bg-yellow-200',
  },
  'Cả ngày': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    textLight: 'text-blue-600',
    hover: 'hover:bg-blue-200',
  },
};

// Helper function to get color classes for shift type
export const getShiftTypeColors = (shiftType: string) => {
  return SHIFT_TYPE_COLORS[shiftType] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    textLight: 'text-gray-600',
    hover: 'hover:bg-gray-200',
  };
};
