export const QUERY_KEYS = {
  WORKSHIFT_BASE: ['workshift'] as const,
  WORKSHIFT_LIST: (filters: unknown) => ['workshift', 'list', filters] as const,
  WORKSHIFT_DETAIL: (id: string) => ['workshift', 'detail', id] as const,
};

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const DEFAULT_PAGE_SIZE = 10;

export const WORKSHIFT_TYPE_OPTIONS = [
  { value: 'Sáng', label: 'Sáng' },
  { value: 'Chiều', label: 'Chiều' },
  { value: 'Cả ngày', label: 'Cả ngày' },
];
