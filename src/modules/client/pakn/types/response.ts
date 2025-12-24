"use client";

export type PaknStatus = 
  | 'CHO_TIEP_NHAN'
  | 'DA_TIEP_NHAN'
  | 'DANG_XU_LY'
  | 'DA_TRA_LOI'
  | 'HOAN_THANH'
  | 'TU_CHOI';

export type PaknItem = {
    id: string;
    paknCode: string;
    title: string;
    status: PaknStatus;
    citizenName?: string;
    phone?: string;
    email?: string;
    categoryId?: string;
    categoryName?: string;
    orgUnitName?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type PaknAttachment = {
    id?: string;
    fileName: string;
    fileUrl: string;
    url?: string;
    contentType?: string;
    size?: number;
};

export type PaknStatusHistory = {
    id: string;
    oldStatus: PaknStatus;
    newStatus: PaknStatus;
    note: string;
    staffId: string;
    modifiedAt: string;
};

export type PaknResponseItem = {
    id: string;
    responseContent: string;
    attachments?: {
        $values: PaknAttachment[];
    };
    staffId: string;
    createdAt: string;
};

/**
 * Full PAKN detail response after OTP verification
 */
export type PaknDetail = {
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
        $values: PaknResponseItem[];
    };
    createdAt: string;
    modifiedAt?: string;
    modifiedBy?: string;
};

export type PaknCategoryOption = {
    id: string;
    categoryName: string;
    description?: string;
};

export type PaknOrgUnitOption = {
    id: string;
    unitName: string;
    name?: string;
};
