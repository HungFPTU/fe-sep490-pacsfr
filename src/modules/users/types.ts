export type UserRole = "admin" | "staff" | "citizen";

export interface UserSummary {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: "active" | "inactive" | "locked";
    createdAt: string;
    updatedAt: string;
}

export interface UsersQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: UserRole | "all";
    status?: "all" | "active" | "inactive" | "locked";
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface UpsertUserPayload {
    fullName: string;
    email: string;
    phone?: string;
    role: UserRole;
    status?: "active" | "inactive" | "locked";
}


