'use client';

import React, { useState } from 'react';
import { FileUploadService } from '@/core/services/file-upload.service';
import { ImageUploadService } from '@/core/services/image-upload.service';
import { LegalDocumentService } from '@/modules/manager/legal-document/services/legal-document.service';
import { serviceGroupService } from '@/modules/manager/service-group/services/service-group.service';

export const UploadTest: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [testType, setTestType] = useState<'document' | 'image' | 'legal' | 'service'>('document');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
            setUploadResult(null);
        }
    };

    const handleDocumentUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            console.log('[Test] Starting document upload...');
            const result = await FileUploadService.uploadFile(selectedFile, 'test_documents');
            console.log('[Test] Document upload successful:', result);
            setUploadResult({ type: 'document', result });
        } catch (err) {
            console.error('[Test] Document upload failed:', err);
            setError(err instanceof Error ? err.message : 'Document upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            console.log('[Test] Starting image upload...');
            const result = await ImageUploadService.uploadImage(selectedFile, 'test_images');
            console.log('[Test] Image upload successful:', result);
            setUploadResult({ type: 'image', result });
        } catch (err) {
            console.error('[Test] Image upload failed:', err);
            setError(err instanceof Error ? err.message : 'Image upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleLegalDocumentUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            console.log('[Test] Starting legal document upload...');
            const result = await LegalDocumentService.createLegalDocument({
                documentNumber: 'TEST-001',
                documentType: 'DECREE',
                name: 'Test Legal Document',
                issueDate: new Date(),
                issueBody: 'Test Body',
                effectiveDate: new Date(),
                status: 'ACTIVE',
                isActive: true,
                file: selectedFile
            });
            console.log('[Test] Legal document upload successful:', result);
            setUploadResult({ type: 'legal', result });
        } catch (err) {
            console.error('[Test] Legal document upload failed:', err);
            setError(err instanceof Error ? err.message : 'Legal document upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleServiceGroupUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        try {
            console.log('[Test] Starting service group upload...');
            const result = await serviceGroupService.createServiceGroup({
                groupCode: 'TEST-GROUP',
                groupName: 'Test Service Group',
                description: 'Test Description',
                iconFile: selectedFile,
                displayOrder: 1,
                isActive: true
            });
            console.log('[Test] Service group upload successful:', result);
            setUploadResult({ type: 'service', result });
        } catch (err) {
            console.error('[Test] Service group upload failed:', err);
            setError(err instanceof Error ? err.message : 'Service group upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpload = () => {
        switch (testType) {
            case 'document':
                handleDocumentUpload();
                break;
            case 'image':
                handleImageUpload();
                break;
            case 'legal':
                handleLegalDocumentUpload();
                break;
            case 'service':
                handleServiceGroupUpload();
                break;
        }
    };

    const getFileAccept = () => {
        switch (testType) {
            case 'document':
                return '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx';
            case 'image':
                return 'image/jpeg,image/png,image/gif,image/webp';
            case 'legal':
                return '.pdf,.doc,.docx,.txt';
            case 'service':
                return 'image/jpeg,image/png,image/gif,image/webp';
            default:
                return '*';
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">File Upload Test</h2>

            <div className="space-y-4">
                {/* Test Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Test Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                value="document"
                                checked={testType === 'document'}
                                onChange={(e) => setTestType(e.target.value as any)}
                                className="mr-2"
                            />
                            <span className="text-sm">Document</span>
                        </label>
                        <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                value="image"
                                checked={testType === 'image'}
                                onChange={(e) => setTestType(e.target.value as any)}
                                className="mr-2"
                            />
                            <span className="text-sm">Image</span>
                        </label>
                        <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                value="legal"
                                checked={testType === 'legal'}
                                onChange={(e) => setTestType(e.target.value as any)}
                                className="mr-2"
                            />
                            <span className="text-sm">Legal Doc</span>
                        </label>
                        <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                value="service"
                                checked={testType === 'service'}
                                onChange={(e) => setTestType(e.target.value as any)}
                                className="mr-2"
                            />
                            <span className="text-sm">Service Group</span>
                        </label>
                    </div>
                </div>

                {/* File Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select File
                    </label>
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        accept={getFileAccept()}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* File Info */}
                {selectedFile && (
                    <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium mb-2">Selected File:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Name:</strong> {selectedFile.name}</p>
                            <p><strong>Size:</strong> {selectedFile.size} bytes</p>
                            <p><strong>Type:</strong> {selectedFile.type}</p>
                            <p><strong>Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleString()}</p>
                        </div>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : `Upload ${testType}`}
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
                        <h4 className="font-medium text-green-800 mb-2">
                            {uploadResult.type.charAt(0).toUpperCase() + uploadResult.type.slice(1)} Upload Successful!
                        </h4>
                        <div className="space-y-1 text-sm text-green-700">
                            <pre className="whitespace-pre-wrap overflow-auto max-h-60 bg-white p-2 rounded border">
                                {JSON.stringify(uploadResult.result, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-1">Instructions:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• <strong>Document:</strong> PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</li>
                        <li>• <strong>Image:</strong> JPG, PNG, GIF, WEBP</li>
                        <li>• <strong>Legal Doc:</strong> PDF, DOC, DOCX, TXT</li>
                        <li>• <strong>Service Group:</strong> JPG, PNG, GIF, WEBP</li>
                        <li>• Open browser console (F12) for detailed logs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
