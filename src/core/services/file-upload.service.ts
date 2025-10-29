import { http } from '../http/client';

export interface FileUploadResponse {
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

export interface FileUploadRequest {
    file: File;
    folder?: string;
}

export class FileUploadService {
    /**
     * Upload document file to backend server (Cloudinary)
     * @param file - Document file to upload (PDF, DOC, TXT, etc.)
     * @param folder - Optional folder name
     * @returns Promise<FileUploadResponse>
     */
    static async uploadFile(file: File, folder: string = 'documents'): Promise<FileUploadResponse> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            console.log('[FileUploadService] Uploading file:', {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                folder
            });

            const response = await http.post<FileUploadResponse>('/api/FileUpload', formData, {
                // Don't set Content-Type manually for FormData
                // Browser will set it automatically with boundary
            });

            console.log('[FileUploadService] Upload response:', response.data);
            return response.data;
        } catch (error) {
            console.error('[FileUploadService] Upload error:', error);
            throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Delete file from backend server (Cloudinary)
     * @param publicId - Public ID of the file to delete
     * @returns Promise<boolean>
     */
    static async deleteFile(publicId: string): Promise<boolean> {
        try {
            const response = await http.delete(`/api/FileUpload/${publicId}`);
            return (response.data as FileUploadResponse).success || false;
        } catch (error) {
            console.error('File delete error:', error);
            throw new Error('Failed to delete file');
        }
    }

    /**
     * Validate file before upload
     * @param file - File to validate
     * @param maxSize - Maximum file size in bytes (default: 10MB)
     * @param allowedTypes - Allowed MIME types
     * @returns boolean
     */
    static validateFile(
        file: File,
        maxSize: number = 10 * 1024 * 1024, // 10MB
        allowedTypes: string[] = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ]
    ): { isValid: boolean; error?: string } {
        if (!file) {
            return { isValid: false, error: 'No file selected' };
        }

        if (file.size > maxSize) {
            return {
                isValid: false,
                error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
            };
        }

        if (!allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: 'File type not supported. Allowed: PDF, DOC, DOCX, TXT'
            };
        }

        return { isValid: true };
    }

    /**
     * Format file size for display
     * @param bytes - File size in bytes
     * @returns Formatted string
     */
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

export const fileUploadService = new FileUploadService();
