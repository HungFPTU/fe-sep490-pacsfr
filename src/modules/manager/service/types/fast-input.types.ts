
export type FastInputCheckResponse = {
    extractedData: ExtractedData;
    missingEntities: MissingEntities;
};

type ValuesWrapper<T> = {
    $id?: string;
    $values: T[];
};

export type ExtractedData = {
    tenThuTuc: string;
    maThuTuc: string;
    soQuyetDinh: string;
    trinhTuThucHien: string;
    thanhPhanHoSo: ValuesWrapper<ExtractedDocument> | ExtractedDocument[]; // Handle both just in case
    cachThucThucHien: ValuesWrapper<ExtractedSubmissionMethod> | ExtractedSubmissionMethod[];
    canCuPhapLy: ValuesWrapper<ExtractedLegalBase> | ExtractedLegalBase[];
    coQuan: string;

    // Mapped fields
    linhVuc?: string;
    capThucHien?: string;
    loaiThuTuc?: string; // Was loaiDichVu

    // New fields
    moTa?: string;
    ketQua?: string; // Result Document
    yeuCauDieuKien?: string; // Condition
    doiTuong?: string;
};

export type ExtractedDocument = {
    id?: string; // ID if found in DB
    tenGiayTo: string;
    banChinh: number;
    banSao: number;
    mauDon: string;
    quantityOriginal?: number;
    quantityCopy?: number;
};

export type ExtractedSubmissionMethod = {
    hinhThuc: string;
    thoiHan: string;
    phiLePhi: string;
    moTa?: string;
};

export type ExtractedLegalBase = {
    soKyHieu: string;
    trichYeu: string;
    ngayBanHanh: string;
    coQuanBanHanh?: string;
};

export type MissingEntities = {
    legislationDocuments: ValuesWrapper<MissingItem> | MissingItem[];
    docsTypes: ValuesWrapper<MissingItem> | MissingItem[];
    submissionMethods: ValuesWrapper<MissingItem> | MissingItem[];
    serviceAgencies: ValuesWrapper<MissingItem> | MissingItem[];
};

export type MissingItem = {
    name: string; // Generic name property for display
    originalData: any; // Store original object to pass back to create API
    type: 'legislationDocument' | 'docsType' | 'submissionMethod' | 'serviceAgency';
    $ref?: string; // For references if used
};

// ... keep existing smaller create requests ...
export type CreateLegislationDocumentRequest = {
    documentNumber: string;
    name: string;
    documentType?: string; // e.g., "Luật", "Nghị định"
    issueDate?: string;
    issueBody?: string;
    effectiveDate?: string;
    status?: string;
};

export type CreateDocsTypeRequest = {
    docTypeName: string;
    description: string;
    isRequired: boolean;
};

export type CreateSubmissionMethodRequest = {
    submissionMethodName: string;
    description: string;
};

export type CreateServiceAgencyRequest = {
    agencyName: string;
    description?: string;
};

// Main Create Service Request for Fast Input
export type FastInputCreateServiceRequest = {
    serviceName: string;
    serviceCode: string;
    serviceGroupId: string;
    description: string;
    condition: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;

    // Nested entities
    legislationDocumentIds: string[];
    requiredDocuments: ServiceRequiredDocumentInput[];
    submissionMethods: ServiceSubmissionMethodInput[];
    serviceAgencyIds: string[];
    processingProcedure: string; // Changed from serviceProcedures array
};

export type ServiceRequiredDocumentInput = {
    docTypeId?: string;
    docTypeName?: string;
    description?: string;
    note?: string;
    quantityOriginal: number;
    quantityCopy: number;
};

export type ServiceSubmissionMethodInput = {
    submissionMethodId: string;
    submissionMethodName?: string;
    processingTime: string;
    fee?: number; 
    description?: string;
};

export type ServiceProcedureInput = {
    stepName: string;
    stepDescription: string;
};
