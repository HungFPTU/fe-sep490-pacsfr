export type PaknStatus = 
  | 'CHO_TIEP_NHAN'
  | 'DA_TIEP_NHAN'
  | 'DANG_XU_LY'
  | 'DA_TRA_LOI'
  | 'HOAN_THANH'
  | 'TU_CHOI';

export interface PaknAttachment {
  id?: string;
  fileName: string;
  fileUrl: string;
}

export interface PaknStatusHistory {
  id: string;
  oldStatus: PaknStatus;
  newStatus: PaknStatus;
  note: string;
  staffId: string;
  modifiedAt: string;
}

export interface PaknResponse {
  id: string;
  responseContent: string;
  attachments?: {
    $values: PaknAttachment[];
  };
  staffId: string;
  createdAt: string;
}

export interface Pakn {
  id: string;
  paknCode: string;
  title: string;
  content: string;
  citizenName: string;
  city: string;
  ward: string;
  streetAddress: string;
  phone: string;
  email: string;
  paknCategoryId: string;
  categoryName: string;
  orgUnitId: string;
  assignedStaffId?: string;
  status: PaknStatus;
  receivedAt?: string;
  processingStartedAt?: string;
  completedAt?: string;
  attachments?: {
    $values: PaknAttachment[];
  };
  statusHistories?: {
    $values: PaknStatusHistory[];
  };
  responses?: {
    $values: PaknResponse[];
  };
  createdAt: string;
  modifiedAt?: string;
  modifiedBy?: string;
}
