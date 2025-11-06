/**
 * Staff Constants
 * Query keys, cache times, and other constants
 */

import { StaffFilters } from '../types';

// Cache time constants (in milliseconds)
export const CACHE_TIME = {
  SHORT: 1000 * 60 * 5, // 5 minutes
  MEDIUM: 1000 * 60 * 10, // 10 minutes
  LONG: 1000 * 60 * 30, // 30 minutes
  VERY_LONG: 1000 * 60 * 60, // 1 hour
} as const;

// Stale time constants (in milliseconds)
export const STALE_TIME = {
  SHORT: 1000 * 30, // 30 seconds
  MEDIUM: 1000 * 60, // 1 minute
  LONG: 1000 * 60 * 5, // 5 minutes
  VERY_LONG: 1000 * 60 * 10, // 10 minutes
} as const;

// React Query keys for staff
export const QUERY_KEYS = {
  STAFF_LIST: (filters?: StaffFilters) => ['staffs', 'list', filters] as const,
  STAFF_DETAIL: (id: string) => ['staffs', 'detail', id] as const,
  STAFF_ALL: () => ['staffs', 'all'] as const,
  COUNTER_LIST_ACTIVE: () => ['counters', 'list', 'active'] as const,
} as const;

// UI Options
export const STAFF_STATUS_OPTIONS = [
  { label: 'Hoạt động', value: 'ACTIVE' },
  { label: 'Ngừng hoạt động', value: 'INACTIVE' },
];

export const ROLE_TYPE_OPTIONS = [
  { label: 'Nhân viên', value: 'Staff' },
  { label: 'Quản lý', value: 'Manager' },
];

export const STAFF_POSITION_OPTIONS = [
  { label: 'Lễ tân', value: 'RECEPTIONIST' },
  { label: 'Công chức', value: 'OFFICER' },
  { label: 'Chuyên viên', value: 'SPECIALIST' },
  { label: 'Trưởng phòng', value: 'HEAD_OF_DEPARTMENT' },
  { label: 'Phó phòng', value: 'DEPUTY_HEAD' },
];

export const BOOLEAN_OPTIONS = [
  { label: 'Tất cả', value: '' },
  { label: 'Hoạt động', value: 'true' },
  { label: 'Ngừng hoạt động', value: 'false' },
];

// Default values
export const DEFAULT_STAFF_FILTERS: StaffFilters = {
  SearchTerm: '',
  IsActive: undefined,
  RoleType: '',
};

// Table configuration
export const STAFF_TABLE_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const STAFF_TABLE_DEFAULT_PAGE_SIZE = 20;
