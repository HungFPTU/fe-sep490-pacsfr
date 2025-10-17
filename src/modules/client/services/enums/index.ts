// Service Type Enums
export enum ServiceType {
    DIRECT = "Trực tiếp",
    ONLINE = "Trực tuyến",
}

// Service Status Enums
export enum ServiceStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

// Service Filter Enums
export enum FilterType {
    ALL = "all",
    ACTIVE = "active",
    INACTIVE = "inactive",
}

// Pagination Enums
export enum PageSize {
    SMALL = 10,
    MEDIUM = 20,
    LARGE = 50,
}

// Sort Order Enums
export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}

// Sort Field Enums
export enum SortField {
    NAME = "serviceName",
    CODE = "serviceCode",
    FEE = "feeAmount",
    PROCESSING_TIME = "processingTime",
    CREATED_AT = "createdAt",
}
