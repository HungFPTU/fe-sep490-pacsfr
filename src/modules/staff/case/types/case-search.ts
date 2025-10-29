// Case search types
export interface CaseData {
  $id: string;
  id: string;
  caseCode: string;
  guestId: string;
  guestName: string;
  serviceId: string;
  serviceName: string;
  priorityLevel: number;
  submissionMethod: string;
  isPayment: boolean;
  notes: string;
  receivedBy: {
    $id: string;
    $values: Array<{
      id: string;
      name: string;
      role: string;
    }>;
  };
  currentStatus: string;
}

export interface CaseLookupResponse {
  $id: string;
  success: boolean;
  message: string;
  data: CaseData;
  timestamp: string;
}

export interface CaseListResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    success: boolean;
    message: string;
    data: {
      $id: string;
      size: number;
      page: number;
      total: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      items: {
        $id: string;
        $values: CaseData[];
      };
    };
    timestamp: string;
  };
}

export interface CaseSearchFilters {
  caseCode?: string;
  guestId?: string;
  serviceId?: string;
  staffId?: string;
  priorityLevel?: number;
  caseStatus?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  size?: number;
}

// Case Detail Response (GET by ID)
export interface CaseDetailResponse {
  id: string;
  caseCode: string;
  guestId: string;
  guestName: string;
  serviceId: string;
  serviceName: string;
  priorityLevel: number;
  submissionMethod: string;
  estimatedCompletionDate: string;
  totalFee: number;
  isPayment: boolean;
  receivedBy: {
    $values: Array<{
      id: string;
      name: string;
      role: string;
    }>;
  };
  staffName: string;
  currentStatus: string;
  notes?: string;
}

export interface CaseLookupRequest {
  caseId: string;
}

// Update Case Request
export interface UpdateCaseRequest {
  priorityLevel: number;
  submissionMethod: string;
  estimatedCompletionDate: string;
  actualCompletionDate: string;
  resultDescription: string;
  totalFee: number;
  isPayment: boolean;
  notes: string;
}

// Update Case Response
export interface UpdateCaseResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    id: string;
    caseCode: string;
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethod: string;
    estimatedCompletionDate: string;
    actualCompletionDate: string;
    resultDescription: string;
    totalFee: number;
    isPayment: boolean;
    notes: string;
    receivedBy: {
      $id: string;
      $values: Array<{
        id: string;
        name: string;
        role: string;
      }>;
    };
  };
  timestamp: string;
}

// Update Case Status Request
export interface UpdateCaseStatusRequest {
  newStatusId: string;
  reason: string;
  note: string;
}

// Update Case Status Response
export interface UpdateCaseStatusResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    id: string;
    caseCode: string;
    currentStatus: string;
    statusId: string;
    updatedAt: string;
  };
  timestamp: string;
}