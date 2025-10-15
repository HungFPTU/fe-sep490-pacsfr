export interface ApiResponse<T> {
    $id: string;
    data: T;
    isSuccess: boolean;
    message: string;
}