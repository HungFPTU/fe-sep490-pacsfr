'use client';

import React, { useState } from 'react';
import { FileUploadService } from '@/core/services/file-upload.service';

export const FileUploadDebug: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
            setUploadResult(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            console.log('[FileUploadDebug] Starting upload...');
            console.log('[FileUploadDebug] File details:', {
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type
            });

            const result = await FileUploadService.uploadFile(selectedFile, 'test_files');
            console.log('[FileUploadDebug] Upload successful:', result);
            setUploadResult(result);
        } catch (err) {
            console.error('[FileUploadDebug] Upload failed:', err);
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const testApiEndpoint = async () => {
        try {
            console.log('[FileUploadDebug] Testing API endpoint...');
            const response = await fetch('/api/FileUpload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ test: 'ping' })
            });

            console.log('[FileUploadDebug] API response status:', response.status);
            const text = await response.text();
            console.log('[FileUploadDebug] API response text:', text);
        } catch (err) {
            console.error('[FileUploadDebug] API test failed:', err);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">File Upload Debug</h3>

            <div className="space-y-4">
                {/* API Test */}
                <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">API Endpoint Test</h4>
                    <button
                        onClick={testApiEndpoint}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Test API Endpoint
                    </button>
                </div>

                {/* File Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select File
                    </label>
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* File Info */}
                {selectedFile && (
                    <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium mb-2">Selected File:</h4>
                        <p><strong>Name:</strong> {selectedFile.name}</p>
                        <p><strong>Size:</strong> {selectedFile.size} bytes</p>
                        <p><strong>Type:</strong> {selectedFile.type}</p>
                        <p><strong>Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleString()}</p>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : 'Upload File'}
                </button>

                {/* Error Display */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <h4 className="font-medium text-red-800 mb-1">Upload Error:</h4>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Success Display */}
                {uploadResult && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <h4 className="font-medium text-green-800 mb-2">Upload Successful!</h4>
                        <div className="space-y-1 text-sm text-green-700">
                            <p><strong>Success:</strong> {uploadResult.success ? 'Yes' : 'No'}</p>
                            <p><strong>Message:</strong> {uploadResult.message}</p>
                            <p><strong>File URL:</strong> {uploadResult.data?.fileUrl}</p>
                            <p><strong>Public ID:</strong> {uploadResult.data?.publicId}</p>
                            <p><strong>Original Name:</strong> {uploadResult.data?.originalFileName}</p>
                            <p><strong>File Size:</strong> {uploadResult.data?.fileSize} bytes</p>
                            <p><strong>File Type:</strong> {uploadResult.data?.fileType}</p>
                            <p><strong>Timestamp:</strong> {uploadResult.timestamp}</p>
                        </div>
                    </div>
                )}

                {/* Console Instructions */}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-1">Debug Instructions:</h4>
                    <p className="text-sm text-yellow-700">
                        Open browser console (F12) to see detailed logs of the upload process.
                        Check Network tab to see the actual HTTP requests being made.
                    </p>
                </div>
            </div>
        </div>
    );
};
