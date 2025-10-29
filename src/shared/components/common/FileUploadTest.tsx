'use client';

import React, { useState } from 'react';
import { useFileUpload } from '@/core/hooks/useFileUpload';
import { FileUploadResponse, FileUploadService } from '@/core/services/file-upload.service';

interface FileUploadTestProps {
    onUploadSuccess?: (fileUrl: string) => void;
    folder?: string;
    maxSize?: number;
    allowedTypes?: string[];
}

export const FileUploadTest: React.FC<FileUploadTestProps> = ({
    onUploadSuccess,
    folder = 'test_files',
    maxSize = 10 * 1024 * 1024,
    allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState<FileUploadResponse | null>(null);

    const { uploadFile, isUploading, error, validateFile, formatFileSize } = useFileUpload({
        maxSize,
        allowedTypes,
        folder
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validation = validateFile(file);
            if (validation.isValid) {
                setSelectedFile(file);
                setUploadResult(null);
            } else {
                alert(validation.error);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            const result = await uploadFile(selectedFile);
            setUploadResult(result);
            onUploadSuccess?.(result.data.fileUrl);
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const handleDelete = async (publicId: string) => {
        try {
            await FileUploadService.deleteFile(publicId);
            setUploadResult(null);
            alert('File deleted successfully');
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">File Upload Test</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select File
                    </label>
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        accept={allowedTypes.join(',')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {selectedFile && (
                    <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600">
                            <strong>File:</strong> {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Size:</strong> {formatFileSize(selectedFile.size)}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Type:</strong> {selectedFile.type}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : 'Upload File'}
                </button>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {uploadResult && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <h4 className="text-sm font-medium text-green-800 mb-2">Upload Successful!</h4>
                        <div className="space-y-1 text-xs text-green-700">
                            <p><strong>File URL:</strong> {uploadResult.data.fileUrl}</p>
                            <p><strong>Public ID:</strong> {uploadResult.data.publicId}</p>
                            <p><strong>Original Name:</strong> {uploadResult.data.originalFileName}</p>
                            <p><strong>File Size:</strong> {formatFileSize(uploadResult.data.fileSize)}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(uploadResult.data.publicId)}
                            className="mt-2 text-xs bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        >
                            Delete File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
