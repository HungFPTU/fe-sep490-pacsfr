'use client';

import { useState, useCallback } from 'react';
import { ImageUploadService } from '../services/image-upload.service';
import { useGlobalToast } from '../patterns/SingletonHook';

interface UseImageUploadOptions {
    maxSize?: number; // Max file size in bytes (default: 5MB)
    folder?: string; // Cloudinary folder (default: 'images')
}

export const useImageUpload = (options?: UseImageUploadOptions) => {
    const { maxSize = 5 * 1024 * 1024, folder = 'images' } = options || {};
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useGlobalToast();

    const uploadImage = useCallback(async (file: File) => {
        console.log('[useImageUpload] Starting upload process...');
        console.log('[useImageUpload] File details:', {
            name: file.name,
            size: file.size,
            type: file.type
        });
        console.log('[useImageUpload] Options:', { maxSize, folder });

        setError(null);
        setIsUploading(true);
        try {
            console.log('[useImageUpload] Validating image...');
            const validation = ImageUploadService.validateImage(file, maxSize);
            console.log('[useImageUpload] Validation result:', validation);

            if (!validation.isValid) {
                console.error('[useImageUpload] Validation failed:', validation.message);
                setError(validation.message || "Image validation failed.");
                addToast({ message: validation.message || "Image validation failed.", type: "error" });
                return null;
            }

            console.log('[useImageUpload] Validation passed, calling ImageUploadService...');
            const result = await ImageUploadService.uploadImage(file, folder);
            console.log('[useImageUpload] Upload successful:', result);
            addToast({ message: "Tải hình ảnh lên thành công!", type: "success" });
            return result;
        } catch (err: any) {
            console.error('[useImageUpload] Upload failed:', err);
            const errorMessage = err.message || "Lỗi khi tải hình ảnh lên.";
            setError(errorMessage);
            addToast({ message: errorMessage, type: "error" });
            return null;
        } finally {
            console.log('[useImageUpload] Upload process finished');
            setIsUploading(false);
        }
    }, [maxSize, folder, addToast]);

    const deleteImage = useCallback(async (publicId: string) => {
        setError(null);
        try {
            const result = await ImageUploadService.deleteImage(publicId);
            if (result) {
                addToast({ message: "Xóa hình ảnh thành công!", type: "success" });
            }
            return result;
        } catch (err: any) {
            const errorMessage = err.message || "Lỗi khi xóa hình ảnh.";
            setError(errorMessage);
            addToast({ message: errorMessage, type: "error" });
            return false;
        }
    }, [addToast]);

    const validateImage = useCallback((file: File) => {
        return ImageUploadService.validateImage(file, maxSize);
    }, [maxSize]);

    const formatFileSize = useCallback((bytes: number) => {
        return ImageUploadService.formatFileSize(bytes);
    }, []);

    return {
        uploadImage,
        deleteImage,
        isUploading,
        error,
        validateImage,
        formatFileSize,
    };
};
