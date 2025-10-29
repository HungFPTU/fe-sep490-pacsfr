import { NextRequest, NextResponse } from 'next/server';

/**
 * ImageUpload API Route
 * Handle image uploads to backend server (Cloudinary)
 * Based on Swagger API specification FILE-03
 */

export async function POST(request: NextRequest) {
    try {
        console.log('[ImageUpload API] Received image upload request');

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = formData.get('folder') as string | null;

        console.log('[ImageUpload API] Image details:', {
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            folder
        });

        if (!file) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No image file provided',
                    data: null,
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            );
        }

        // Validate file size (5MB max for images)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Image size exceeds ${Math.round(MAX_SIZE / 1024 / 1024)}MB limit`,
                    data: null,
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            );
        }

        // Validate file type - Only images
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid image type. Allowed: JPG, PNG, GIF, WEBP',
                    data: null,
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const fileName = `${file.name.split('.')[0]}_${random}.${extension}`;
        const publicId = folder ? `${folder}/${fileName}` : fileName;

        // TODO: Implement actual Cloudinary upload
        // For now, return mock response matching the expected format

        const mockImageUrl = `https://res.cloudinary.com/pascs/image/upload/v${timestamp}/${publicId}`;

        const response = {
            success: true,
            message: 'Upload hình ảnh thành công',
            data: {
                fileUrl: mockImageUrl,
                publicId: publicId,
                originalFileName: file.name,
                fileSize: file.size,
                fileType: file.type
            },
            timestamp: new Date().toISOString()
        };

        console.log('[ImageUpload API] Upload successful:', response);

        return NextResponse.json(response);

    } catch (error) {
        console.error('[ImageUpload API] Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to upload image',
                data: null,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}
