export type PaknStatus = 
  | 'CHO_TIEP_NHAN'
  | 'DA_TIEP_NHAN'
  | 'DANG_XU_LY'
  | 'DA_TRA_LOI'
  | 'HOAN_THANH'
  | 'TU_CHOI';

export interface PaknAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
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
  status: PaknStatus;
  attachments?: {
    $values: PaknAttachment[];
  };
  assignedStaffId?: string;
  createdAt: string;
}
