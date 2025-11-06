"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Upload, Image as ImageIcon, Check, X, Loader2 } from "lucide-react";
import { useImageUpload } from "@/core/hooks/useImageUpload";
import { PaymentQRStorage } from "@/core/utils/storage";
import { useGlobalToast } from "@core/patterns/SingletonHook";
// import { paymentApi } from "../api/payment.api"; // TODO: Uncomment when API is ready

export function PaymentQRUpload() {
    const { addToast } = useGlobalToast();
    const { uploadImage, isUploading, error, validateImage } = useImageUpload({
        maxSize: 5 * 1024 * 1024, // 5MB
        folder: "payment"
    });
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedData, setUploadedData] = useState<{
        fileUrl: string;
        publicId: string;
        originalFileName: string;
        fileSize: number;
        fileType: string;
    } | null>(null);
    const [savedQRUrl, setSavedQRUrl] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Load saved QR URL on mount
    React.useEffect(() => {
        const savedUrl = PaymentQRStorage.getPaymentQRUrl();
        const savedData = PaymentQRStorage.getPaymentQRData();
        
        if (savedUrl) {
            setSavedQRUrl(savedUrl);
        }
        
        // Load full data if available
        if (savedData) {
            setUploadedData({
                fileUrl: savedData.fileUrl,
                publicId: savedData.publicId,
                originalFileName: savedData.originalFileName,
                fileSize: 0,
                fileType: ""
            });
        }
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate using the hook's validation
        const validation = validateImage(file);
        
        if (!validation.isValid) {
            addToast({
                message: validation.message || "File không hợp lệ!",
                type: "error"
            });
            return;
        }

        setSelectedFile(file);
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            addToast({
                message: "Vui lòng chọn file ảnh!",
                type: "warning"
            });
            return;
        }

        try {
            // Use the uploadImage hook
            const result = await uploadImage(selectedFile);

            if (result && result.success && result.data) {
                setUploadedData({
                    fileUrl: result.data.fileUrl,
                    publicId: result.data.publicId,
                    originalFileName: result.data.originalFileName,
                    fileSize: result.data.fileSize,
                    fileType: result.data.fileType
                });
                
                // Save to localStorage
                PaymentQRStorage.setPaymentQRUrl(result.data.fileUrl);
                PaymentQRStorage.setPaymentQRData({
                    fileUrl: result.data.fileUrl,
                    publicId: result.data.publicId,
                    originalFileName: result.data.originalFileName
                });

                setSavedQRUrl(result.data.fileUrl);

                addToast({
                    message: "Upload mã thanh toán thành công!",
                    type: "success"
                });
            } else {
                addToast({
                    message: error || result?.message || "Upload thất bại!",
                    type: "error"
                });
            }
        } catch (err) {
            console.error("[PaymentQRUpload] Upload error:", err);
            addToast({
                message: "Lỗi khi upload: " + (err instanceof Error ? err.message : "Vui lòng thử lại!"),
                type: "error"
            });
        }
    };

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadedData(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveSaved = async () => {
        setIsDeleting(true);
        
        try {
            // TODO: Uncomment this when API is ready
            // Get saved data to retrieve publicId
            // const savedData = PaymentQRStorage.getPaymentQRData();
            // if (savedData && savedData.publicId) {
            //     const result = await paymentApi.deletePaymentQRCode(savedData.publicId);
            //     if (!result || !result.success) {
            //         addToast({
            //             message: result?.message || "Xóa thất bại!",
            //             type: "error"
            //         });
            //         return;
            //     }
            // }

            // Clear localStorage only
            PaymentQRStorage.removePaymentQRUrl();
            PaymentQRStorage.removePaymentQRData();
            setSavedQRUrl(null);
            setUploadedData(null);
            
            addToast({
                message: "Đã xóa mã thanh toán đã lưu",
                type: "success"
            });
        } catch (err) {
            console.error("[PaymentQRUpload] Delete error:", err);
            addToast({
                message: "Lỗi khi xóa: " + (err instanceof Error ? err.message : "Vui lòng thử lại!"),
                type: "error"
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý mã thanh toán</h1>
                <p className="text-gray-600 mt-1">Upload mã QR thanh toán cho dịch vụ</p>
            </div>

            {/* Saved QR Code Display */}
            {savedQRUrl && !uploadedData && (
                <Card className="p-6 bg-green-50 border-green-200">
                    <div className="flex items-start gap-4">
                        <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-green-900 mb-2">
                                Mã thanh toán đã lưu
                            </h3>
                            <div className="mt-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={savedQRUrl}
                                    alt="Saved QR Code"
                                    className="w-64 h-64 object-contain border rounded-lg bg-white"
                                />
                            </div>
                            <Button
                                onClick={handleRemoveSaved}
                                disabled={isDeleting}
                                variant="outline"
                                className="mt-4 text-red-600 border-red-300 hover:bg-red-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Đang xóa...
                                    </>
                                ) : (
                                    <>
                                        <X className="w-4 h-4 mr-2" />
                                        Xóa mã đã lưu
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Upload Card */}
            <Card className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                            Upload mã QR thanh toán mới
                        </h2>
                    </div>

                    {/* File Input (Hidden) */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {/* Upload Area */}
                    {!previewUrl ? (
                        <div
                            onClick={handleClickUpload}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium mb-2">
                                Click để chọn ảnh mã QR
                            </p>
                            <p className="text-sm text-gray-500">
                                Hỗ trợ: JPG, PNG, WEBP (tối đa 5MB)
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Preview */}
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                                <div className="flex justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-md max-h-96 object-contain border rounded-lg bg-white"
                                    />
                                </div>
                            </div>

                            {/* File Info */}
                            {selectedFile && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Tên file:</span> {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        <span className="font-medium">Kích thước:</span>{" "}
                                        {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        <span className="font-medium">Loại:</span> {selectedFile.type}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Đang upload...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload và lưu
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleClear}
                                    disabled={isUploading}
                                    variant="outline"
                                    className="border-gray-300"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Upload Success */}
                    {uploadedData && (
                        <Card className="p-6 bg-green-50 border-green-200">
                            <div className="flex items-start gap-4">
                                <Check className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-green-900 mb-2">
                                        Upload thành công!
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-green-800">
                                            <span className="font-semibold">File:</span> {uploadedData.originalFileName}
                                        </p>
                                        <p className="text-green-800">
                                            <span className="font-semibold">Kích thước:</span>{" "}
                                            {(uploadedData.fileSize / 1024).toFixed(2)} KB
                                        </p>
                                        <p className="text-green-800 break-all">
                                            <span className="font-semibold">URL:</span>{" "}
                                            <a
                                                href={uploadedData.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {uploadedData.fileUrl}
                                            </a>
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleClear}
                                        variant="outline"
                                        className="mt-4 border-green-300 text-green-700 hover:bg-green-100"
                                    >
                                        Upload ảnh khác
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </Card>
        </div>
    );
}