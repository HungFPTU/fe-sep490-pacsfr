/**
 * Upload Service - AWS S3 Integration
 * Service để upload files lên AWS S3
 */

import { AWS_CONFIG } from '@core/config/aws.config';

export interface UploadOptions {
    folder?: string;
    fileName?: string;
    onProgress?: (progress: number) => void;
}

export interface UploadResult {
    success: boolean;
    url?: string;
    key?: string;
    error?: string;
}

/**
 * Validate file trước khi upload
 */
function validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > AWS_CONFIG.MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `Kích thước file không được vượt quá ${AWS_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`,
        };
    }

    // Check file type (for images)
    if (!AWS_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type as typeof AWS_CONFIG.ALLOWED_IMAGE_TYPES[number])) {
        return {
            valid: false,
            error: 'Định dạng file không được hỗ trợ. Chỉ chấp nhận: JPG, PNG, GIF, WEBP',
        };
    }

    return { valid: true };
}

/**
 * Generate unique file name
 * @internal - Helper function for future use
 */
export function generateFileName(originalName: string, folder?: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.').slice(0, -1).join('.');
    const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();

    const fileName = `${sanitizedName}-${timestamp}-${random}.${extension}`;

    if (folder) {
        return `${folder}/${fileName}`;
    }

    return fileName;
}

/**
 * Upload file to S3 using presigned URL
 * Note: Backend sẽ generate presigned URL để upload
 */
export async function uploadToS3Direct(
    file: File,
    presignedUrl: string,
    options?: UploadOptions
): Promise<UploadResult> {
    try {
        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error,
            };
        }

        // Upload using XMLHttpRequest for progress tracking
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && options?.onProgress) {
                    const progress = (e.loaded / e.total) * 100;
                    options.onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200 || xhr.status === 204) {
                    // Extract URL from presigned URL (remove query params)
                    const url = presignedUrl.split('?')[0];
                    resolve({
                        success: true,
                        url,
                        key: extractKeyFromUrl(url),
                    });
                } else {
                    resolve({
                        success: false,
                        error: `Upload failed with status ${xhr.status}`,
                    });
                }
            });

            xhr.addEventListener('error', () => {
                resolve({
                    success: false,
                    error: 'Network error occurred during upload',
                });
            });

            xhr.open('PUT', presignedUrl);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
        });
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

/**
 * Upload file through backend API
 * Backend sẽ handle việc upload lên S3
 */
export async function uploadThroughBackend(
    file: File,
    options?: UploadOptions
): Promise<UploadResult> {
    try {
        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error,
            };
        }

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);

        if (options?.folder) {
            formData.append('folder', options.folder);
        }

        if (options?.fileName) {
            formData.append('fileName', options.fileName);
        }

        // Upload to backend
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.text();
            return {
                success: false,
                error: error || 'Upload failed',
            };
        }

        const data = await response.json();

        return {
            success: true,
            url: data.url,
            key: data.key,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

/**
 * Upload image với preview
 */
export async function uploadImage(
    file: File,
    options?: UploadOptions
): Promise<UploadResult> {
    // Sử dụng backend upload method
    return uploadThroughBackend(file, {
        ...options,
        folder: options?.folder || AWS_CONFIG.FOLDERS.TEMP,
    });
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(key: string): Promise<boolean> {
    try {
        const response = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key }),
        });

        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Extract key from S3 URL
 */
function extractKeyFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.pathname.substring(1); // Remove leading slash
    } catch {
        return url;
    }
}

/**
 * Get presigned URL for viewing (if needed)
 */
export async function getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string | null> {
    try {
        const response = await fetch(`/api/upload/presigned?key=${encodeURIComponent(key)}&expiresIn=${expiresIn}`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.url;
    } catch {
        return null;
    }
}

