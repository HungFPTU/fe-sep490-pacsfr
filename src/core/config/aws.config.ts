/**
 * AWS S3 Configuration
 * Cấu hình cho AWS S3 upload service
 */

export const AWS_CONFIG = {
  // AWS Credentials - Nên lấy từ environment variables
  get REGION() {
    return process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-1';
  },
  
  get ACCESS_KEY_ID() {
    return process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '';
  },
  
  get SECRET_ACCESS_KEY() {
    return process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '';
  },
  
  // S3 Bucket Configuration
  get BUCKET_NAME() {
    return process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || 'pacsfr-uploads';
  },
  
  get BUCKET_URL() {
    return process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL || 
      `https://${this.BUCKET_NAME}.s3.${this.REGION}.amazonaws.com`;
  },
  
  // Upload Configuration
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  
  // Folder structure
  FOLDERS: {
    SERVICE_GROUP_ICONS: 'service-groups/icons',
    DOCUMENTS: 'documents',
    AVATARS: 'avatars',
    TEMP: 'temp',
  },
} as const;

/**
 * Validate AWS configuration
 */
export function validateAwsConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!AWS_CONFIG.REGION) {
    errors.push('AWS_REGION is not configured');
  }
  
  if (!AWS_CONFIG.ACCESS_KEY_ID) {
    errors.push('AWS_ACCESS_KEY_ID is not configured');
  }
  
  if (!AWS_CONFIG.SECRET_ACCESS_KEY) {
    errors.push('AWS_SECRET_ACCESS_KEY is not configured');
  }
  
  if (!AWS_CONFIG.BUCKET_NAME) {
    errors.push('AWS_S3_BUCKET_NAME is not configured');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get full S3 URL for a file key
 */
export function getS3Url(key: string): string {
  return `${AWS_CONFIG.BUCKET_URL}/${key}`;
}

/**
 * Extract S3 key from full URL
 */
export function extractS3Key(url: string): string | null {
  try {
    const bucketUrl = AWS_CONFIG.BUCKET_URL;
    if (url.startsWith(bucketUrl)) {
      return url.substring(bucketUrl.length + 1);
    }
    return null;
  } catch {
    return null;
  }
}

