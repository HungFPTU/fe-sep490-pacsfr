// Payment QR Code Upload Types

export interface ImageUploadResponse {
    $id?: string;
    success: boolean;
    message: string;
    data: ImageUploadData;
    timestamp: string;
}

export interface ImageUploadData {
    $id?: string;
    fileUrl: string;
    publicId: string;
    originalFileName: string;
    fileSize: number;
    fileType: string;
}
