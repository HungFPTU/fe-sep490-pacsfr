// Main OrgUnit entity type
export type OrgUnit = {
    id: string;
    departmentId: string;  // FK to Department
    unitCode: string;
    unitName: string;
    unitType: string;
    address: string;
    phone: string;
    email: string;
    isActive: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;

    // Populated fields (optional)
    departmentName?: string;
};

// Request types
export type CreateOrgUnitRequest = {
    departmentId: string;
    unitCode: string;
    unitName: string;
    unitType: string;
    address: string;
    phone: string;
    email: string;
    isActive: boolean;
};

export type UpdateOrgUnitRequest = {
    id: string;
    departmentId: string;
    unitCode: string;
    unitName: string;
    unitType: string;
    address: string;
    phone: string;
    email: string;
    isActive: boolean;
};

// Filter types
export type OrgUnitFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

