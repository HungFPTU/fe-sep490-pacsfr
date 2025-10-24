/**
 * Upload API Route
 * Handle file uploads to AWS S3
 */

import { NextRequest, NextResponse } from 'next/server';

// Note: Cần cài đặt AWS SDK
// bun add @aws-sdk/client-s3 @aws-sdk/lib-storage

// Uncomment khi đã cài AWS SDK
/*
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});
*/

/**
 * POST /api/upload
 * Upload file to S3
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}-${random}.${extension}`;
    const key = folder ? `${folder}/${fileName}` : fileName;
    
    // TODO: Implement actual S3 upload
    // Tạm thời trả về mock data
    // Uncomment phần dưới khi đã cài AWS SDK
    
    /*
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to S3
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || '',
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: 'public-read', // Hoặc private tùy theo yêu cầu
      },
    });
    
    await upload.done();
    
    const bucketUrl = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL || 
      `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`;
    const url = `${bucketUrl}/${key}`;
    */
    
    // Mock response (xóa khi implement thật)
    const mockUrl = `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(file.name)}`;
    
    return NextResponse.json({
      success: true,
      url: mockUrl,
      key: key,
      message: 'File uploaded successfully (MOCK)',
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload
 * Delete file from S3
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;
    
    if (!key) {
      return NextResponse.json(
        { error: 'No key provided' },
        { status: 400 }
      );
    }
    
    // TODO: Implement actual S3 delete
    // Uncomment khi đã cài AWS SDK
    
    /*
    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || '',
      Key: key,
    }));
    */
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully (MOCK)',
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/upload/presigned
 * Get presigned URL for secure access
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    const expiresIn = parseInt(searchParams.get('expiresIn') || '3600');
    
    if (!key) {
      return NextResponse.json(
        { error: 'No key provided' },
        { status: 400 }
      );
    }
    
    // TODO: Implement presigned URL generation
    // This is useful for private S3 buckets
    
    return NextResponse.json({
      url: `https://example.com/${key}`,
      expiresIn,
    });
    
  } catch (error) {
    console.error('Presigned URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    );
  }
}

