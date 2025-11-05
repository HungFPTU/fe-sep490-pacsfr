// Case Status Constants

export interface CaseStatus {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Danh sách trạng thái hồ sơ
export const CASE_STATUSES: CaseStatus[] = [
  {
    id: '0bf01fb9-433f-466e-95bb-78cac85a607e',
    name: 'Đang xử lý',
    description: 'Hồ sơ đang được xử lý',
    color: 'amber',
  },
  {
    id: 'd05ab54e-ac46-4c77-80fd-bdd1bf042e8d',
    name: 'Mới tiếp nhận',
    description: 'Hồ sơ vừa được tiếp nhận',
    color: 'blue',
  },
  {
    id: '2864299a-0651-43cb-b18f-46dc1329eed0',
    name: 'Hoàn thành',
    description: 'Hồ sơ đã hoàn thành xử lý',
    color: 'green',
  },
];

// Helper function to get status by ID
export const getStatusById = (id: string): CaseStatus | undefined => {
  return CASE_STATUSES.find(status => status.id === id);
};

// Helper function to get status by name
export const getStatusByName = (name: string): CaseStatus | undefined => {
  return CASE_STATUSES.find(status => status.name === name);
};

