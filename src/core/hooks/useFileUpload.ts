/**
 * useFileUpload Hook
 * Hook để upload files với progress tracking
 */

import { useState, useCallback } from 'react';
import { uploadImage, UploadResult, UploadOptions } from '@core/services/upload.service';

export interface UseFileUploadResult {
  upload: (file: File, options?: UploadOptions) => Promise<UploadResult>;
  uploading: boolean;
  progress: number;
  error: string | null;
  reset: () => void;
}

export function useFileUpload(): UseFileUploadResult {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const upload = useCallback(async (file: File, options?: UploadOptions): Promise<UploadResult> => {
    setUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      const result = await uploadImage(file, {
        ...options,
        onProgress: (p) => {
          setProgress(p);
          options?.onProgress?.(p);
        },
      });
      
      if (!result.success) {
        setError(result.error || 'Upload failed');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setUploading(false);
    }
  }, []);
  
  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);
  
  return {
    upload,
    uploading,
    progress,
    error,
    reset,
  };
}

