export const QUERY_KEYS = {
    LEAVE_REQUEST_BASE: ['leave-requests'],
    LEAVE_REQUEST_LIST: (filters: unknown) => ['leave-requests', 'list', filters],
    LEAVE_REQUEST_DETAIL: (id: string) => ['leave-requests', 'detail', id],
    MY_LEAVE_REQUESTS: (filters: unknown) => ['leave-requests', 'my', filters],
    AVAILABLE_REPLACEMENTS: (leaveRequestId: string) => ['leave-requests', 'replacements', leaveRequestId],
} as const;

export const CACHE_TIME = {
    SHORT: 1 * 60 * 1000, // 1 minute
    MEDIUM: 5 * 60 * 1000, // 5 minutes
    LONG: 10 * 60 * 1000, // 10 minutes
} as const;

export const STALE_TIME = {
    SHORT: 30 * 1000, // 30 seconds
    MEDIUM: 1 * 60 * 1000, // 1 minute
    LONG: 5 * 60 * 1000, // 5 minutes
} as const;

export const LEAVE_REQUEST_STATUS = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
} as const;

export const LEAVE_REQUEST_STATUS_LABELS = {
    Pending: 'Chờ duyệt',
    Approved: 'Đã duyệt',
    Rejected: 'Từ chối',
} as const;

export const LEAVE_REQUEST_STATUS_COLORS = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Approved: 'bg-green-100 text-green-800 border-green-200',
    Rejected: 'bg-red-100 text-red-800 border-red-200',
} as const;

export const MAX_LEAVE_DAYS_PER_YEAR = 48;

export const LEAVE_TYPES = ['Annual', 'Sick', 'Personal'] as const;

export const LEAVE_TYPE_LABELS: Record<'Annual' | 'Sick' | 'Personal', string> = {
    Annual: 'Nghỉ phép năm',
    Sick: 'Nghỉ ốm',
    Personal: 'Nghỉ cá nhân',
};

