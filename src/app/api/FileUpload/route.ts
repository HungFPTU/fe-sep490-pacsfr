import { NextRequest, NextResponse } from 'next/server';

/**
 * FileUpload API Route
 * Handle file uploads to backend server (Cloudinary)
 * Based on Swagger API specification
 */

export async function POST(request: NextRequest) {
    try {
        console.log('[FileUpload API] Received upload request');

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = formData.get('folder') as string | null;

        console.log('[FileUpload API] File details:', {
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            folder
        });

        if (!file) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No file provided',
                    data: null,
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            );
        }

        // Validate file size (10MB max)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    message: `File size exceeds ${Math.round(MAX_SIZE / 1024 / 1024)}MB limit`,
                    data: null,
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'File type not supported. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG, GIF, WEBP',
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

        const mockFileUrl = `https://res.cloudinary.com/pascs/raw/upload/v${timestamp}/${publicId}`;

        const response = {
            success: true,
            message: 'Upload file thành công',
            data: {
                fileUrl: mockFileUrl,
                publicId: publicId,
                originalFileName: file.name,
                fileSize: file.size,
                fileType: file.type
            },
            timestamp: new Date().toISOString()
        };

        console.log('[FileUpload API] Upload successful:', response);
        console.log('[FileUpload API] Response structure:', JSON.stringify(response, null, 2));
        console.log('[FileUpload API] fileUrl in response:', response.data.fileUrl);

        return NextResponse.json(response);

    } catch (error) {
        console.error('[FileUpload API] Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to upload file',
                data: null,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}
