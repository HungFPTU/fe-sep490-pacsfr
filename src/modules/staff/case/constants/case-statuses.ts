// Case Status Constants

export interface CaseStatus {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
}

export interface CaseStatusResponse {
  $id?: string;
  success: boolean;
  message: string;
  data: {
    $id?: string;
    $values: CaseStatus[];
  };
  timestamp: string;
}

// Color mapping based on status code
export const getStatusColor = (code: string): string => {
  const colorMap: Record<string, string> = {
    'CHO_TIEP_NHAN': 'blue',
    'DANG_XU_LY': 'amber',
    'COMPLETED': 'green',
  };
  return colorMap[code] || 'gray';
};

// Helper function to get status by ID
export const getStatusById = (statuses: CaseStatus[], id: string): CaseStatus | undefined => {
  return statuses.find(status => status.id === id);
};

// Helper function to get status by name
export const getStatusByName = (statuses: CaseStatus[], name: string): CaseStatus | undefined => {
  return statuses.find(status => status.name === name);
};

// Helper function to get status by code
export const getStatusByCode = (statuses: CaseStatus[], code: string): CaseStatus | undefined => {
  return statuses.find(status => status.code === code);
};
