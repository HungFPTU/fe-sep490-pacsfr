export interface ApiResponse<T> {
    $id: string;
    data: T;
    isSuccess?: boolean;
    success?: boolean; // Some endpoints use `success` instead of `isSuccess`
    message: string;
    timestamp?: string;
}