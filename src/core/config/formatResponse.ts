export interface PaginatedItems<T> {
    $id: string;
    $values: T[];
}

export interface PaginationData<T> {
    $id: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: PaginatedItems<T>;
}

export interface ApiResponse<T> {
    $id: string;
    success: boolean;
    isSuccess?: boolean;
    message: string;
    data: PaginationData<T> | T;
    timestamp: string;
}