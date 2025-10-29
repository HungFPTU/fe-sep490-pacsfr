import { useState } from 'react';
import { FileUploadService, FileUploadResponse } from '../services/file-upload.service';

export interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  folder?: string;
}

export interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<FileUploadResponse>;
  isUploading: boolean;
  error: string | null;
  validateFile: (file: File) => { isValid: boolean; error?: string };
  formatFileSize: (bytes: number) => string;
}

export const useFileUpload = (options: UseFileUploadOptions = {}): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ],
    folder = 'general_files'
  } = options;

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    return FileUploadService.validateFile(file, maxSize, allowedTypes);
  };

  const uploadFile = async (file: File): Promise<FileUploadResponse> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid file');
      }

      // Upload file
      console.log('[useFileUpload] Calling FileUploadService.uploadFile with:', { file: file.name, folder });
      console.log('[useFileUpload] Folder parameter:', folder);
      console.log('[useFileUpload] Folder type:', typeof folder);
      const result = await FileUploadService.uploadFile(file, folder);
      console.log('[useFileUpload] Upload result:', result);
      console.log('[useFileUpload] Result type:', typeof result);
      console.log('[useFileUpload] Result structure:', JSON.stringify(result, null, 2));
      console.log('[useFileUpload] fileUrl in result:', result?.data?.fileUrl);
      console.log('[useFileUpload] data property in result:', result?.data);
      console.log('[useFileUpload] result.data.fileUrl type:', typeof result?.data?.fileUrl);
      console.log('[useFileUpload] result.data.fileUrl value:', result?.data?.fileUrl);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    return FileUploadService.formatFileSize(bytes);
  };

  return {
    uploadFile,
    isUploading,
    error,
    validateFile,
    formatFileSize,
  };
};