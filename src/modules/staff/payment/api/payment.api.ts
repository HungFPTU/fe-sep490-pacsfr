import { http } from "@core/http/client";
import { API_PATH } from "@core/config/api.path";
import type { ImageUploadResponse } from "../types";

export const paymentApi = {
    /**
     * Upload payment QR code image
     * @param file - Image file to upload
     * @param folder - Folder name for organizing uploads (default: "payment")
     */
    async uploadPaymentQRCode(file: File, folder: string = "payment"): Promise<ImageUploadResponse> {
        const formData = new FormData();
        formData.append("File", file);
        formData.append("Folder", folder);

        console.log("[PaymentAPI] Uploading image:", {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            folder
        });

        const response = await http.post<ImageUploadResponse>(
            API_PATH.FILE.UPLOAD_IMAGE,
            formData
        );

        console.log("[PaymentAPI] Upload response:", response.data);

        return response.data;
    },

    /**
     * Delete payment QR code image by publicId
     * @param publicId - Public ID of the image to delete (e.g., "payment/abc123")
     */
    async deletePaymentQRCode(publicId: string): Promise<{ success: boolean; message: string; data: boolean; timestamp: string }> {
        console.log("[PaymentAPI] Deleting image with publicId:", publicId);

        // Use the full publicId as-is in the URL path
        const response = await http.delete<{ success: boolean; message: string; data: boolean; timestamp: string }>(
            `FileUpload/${publicId}`
        );

        console.log("[PaymentAPI] Delete response:", response.data);

        return response.data;
    }
};