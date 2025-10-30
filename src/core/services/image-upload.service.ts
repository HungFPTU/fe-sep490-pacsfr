import { http } from '../http/client';

export interface ImageUploadResponse {
    success: boolean;
    message: string;
    data: {
        fileUrl: string;
        publicId: string;
        originalFileName: string;
        fileSize: number;
        fileType: string;
    };
    timestamp: string;
}

export interface ImageUploadRequest {
    file: File;
    folder?: string;
}

export class ImageUploadService {
    /**
     * Upload image to backend server (Cloudinary)
     * @param file - Image file to upload
     * @param folder - Optional folder name
     * @returns Promise<ImageUploadResponse>
     */
    static async uploadImage(file: File, folder: string = 'images'): Promise<ImageUploadResponse> {
        try {
            const formData = new FormData();
            formData.append('File', file);
            formData.append('Folder', folder);

            const response = await http.post<ImageUploadResponse>('/FileUpload/image', formData, {
                // Don't set Content-Type manually for FormData
                // Browser will set it automatically with boundary
            });

            return response.data;
        } catch (error) {
            throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Delete image from backend server (Cloudinary)
     * @param publicId - Public ID of the image to delete
     * @returns Promise<boolean>
     */
    static async deleteImage(publicId: string): Promise<boolean> {
        try {
            const response = await http.delete(`/FileUpload/image/${publicId}`);
            return (response.data as ImageUploadResponse).success || false;
        } catch (error) {   
            throw new Error(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Validate image file
     * @param file - File to validate
     * @param maxSize - Maximum file size in bytes
     * @returns ValidationResult
     */
    static validateImage(file: File, maxSize: number = 5 * 1024 * 1024): { isValid: boolean; message?: string } {
        if (!file) {
            return { isValid: false, message: "Vui lòng chọn một hình ảnh." };
        }

        if (file.size > maxSize) {
            return { isValid: false, message: `Kích thước hình ảnh không được vượt quá ${this.formatFileSize(maxSize)}.` };
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return { isValid: false, message: `Loại hình ảnh không hợp lệ. Chỉ chấp nhận: ${allowedTypes.join(', ')}.` };
        }

        return { isValid: true };
    }

    /**
     * Format file size in human readable format
     * @param bytes - File size in bytes
     * @returns Formatted file size string
     */
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
