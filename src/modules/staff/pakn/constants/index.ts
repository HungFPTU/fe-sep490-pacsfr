export const PAKN_STATUS_LABEL: Record<string, string> = {
  CHO_TIEP_NHAN: 'Chờ tiếp nhận',
  DA_TIEP_NHAN: 'Đã tiếp nhận',
  DANG_XU_LY: 'Đang xử lý',
  DA_TRA_LOI: 'Đã trả lời',
  HOAN_THANH: 'Hoàn thành',
  TU_CHOI: 'Từ chối',
};

export const PAKN_STATUS_COLOR: Record<string, string> = {
  CHO_TIEP_NHAN: 'bg-yellow-100 text-yellow-800',
  DA_TIEP_NHAN: 'bg-blue-100 text-blue-800',
  DANG_XU_LY: 'bg-indigo-100 text-indigo-800',
  DA_TRA_LOI: 'bg-purple-100 text-purple-800',
  HOAN_THANH: 'bg-green-100 text-green-800',
  TU_CHOI: 'bg-red-100 text-red-800',
};

/**
 * Business Rules: Staff Status Transitions
 * Staff (sau khi được assign) có thể chuyển đổi status theo các quy tắc sau:
 */
export const STAFF_STATUS_TRANSITIONS: Record<string, string[]> = {
  // Từ "Chờ tiếp nhận" -> Staff không thể xử lý (chưa được assign)
  CHO_TIEP_NHAN: [],
  
  // Từ "Đã tiếp nhận" -> Staff có thể bắt đầu xử lý
  DA_TIEP_NHAN: ['DANG_XU_LY'],
  
  // Từ "Đang xử lý" -> Staff có thể trả lời hoặc từ chối nếu không thể xử lý
  DANG_XU_LY: ['DA_TRA_LOI', 'TU_CHOI'],
  
  // Từ "Đã trả lời" -> Staff có thể hoàn thành hoặc quay lại xử lý nếu cần
  DA_TRA_LOI: ['HOAN_THANH', 'DANG_XU_LY'],
  
  // Từ "Từ chối" -> không thể chuyển đổi (final state)
  TU_CHOI: [],
  
  // Từ "Hoàn thành" -> không thể chuyển đổi (final state)
  HOAN_THANH: [],
};

/**
 * Get available status transitions for Staff
 */
export const getStaffAvailableTransitions = (currentStatus: string): string[] => {
  return STAFF_STATUS_TRANSITIONS[currentStatus] || [];
};
