# AWS S3 Upload Setup Guide

Hướng dẫn cấu hình AWS S3 để upload files trong dự án PACSFR.

## 📋 Yêu cầu

- Tài khoản AWS (https://aws.amazon.com)
- Quyền tạo IAM User và S3 Bucket
- Node.js và Bun đã cài đặt

## 🚀 Bước 1: Tạo S3 Bucket

### 1.1. Đăng nhập AWS Console
- Truy cập: https://console.aws.amazon.com/s3/
- Chọn region gần với server/user (ví dụ: `ap-southeast-1` cho Singapore)

### 1.2. Tạo Bucket mới
1. Click **"Create bucket"**
2. Đặt tên bucket (ví dụ: `pacsfr-uploads`)
   - Tên phải unique trên toàn AWS
   - Chỉ chứa lowercase, số, và dấu gạch nối
3. Chọn **Region**: `Asia Pacific (Singapore) ap-southeast-1`
4. **Block Public Access settings**: 
   - Nếu muốn public: Bỏ tick "Block all public access"
   - Nếu muốn private: Giữ nguyên và dùng presigned URLs
5. Click **"Create bucket"**

### 1.3. Cấu hình CORS (nếu upload từ browser)

Vào bucket → **Permissions** → **CORS configuration**, thêm:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

**Production**: Thay `"*"` bằng domain cụ thể:
```json
"AllowedOrigins": ["https://yourdomain.com", "https://www.yourdomain.com"]
```

### 1.4. Bucket Policy (nếu muốn public read)

Vào **Permissions** → **Bucket Policy**, thêm:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::pacsfr-uploads/*"
    }
  ]
}
```

**Lưu ý**: Chỉ dùng cho public assets. Với private files, dùng presigned URLs.

## 🔐 Bước 2: Tạo IAM User

### 2.1. Tạo IAM User
1. Truy cập: https://console.aws.amazon.com/iam/
2. Vào **Users** → **Add users**
3. User name: `pacsfr-s3-uploader`
4. Tick **"Access key - Programmatic access"**
5. Click **"Next: Permissions"**

### 2.2. Gán quyền S3
1. Chọn **"Attach existing policies directly"**
2. Tìm và chọn: **AmazonS3FullAccess** (hoặc custom policy bên dưới)
3. Click **"Next"** → **"Create user"**

### 2.3. Lưu Credentials
**QUAN TRỌNG**: Lưu lại:
- **Access Key ID**: `AKIA...`
- **Secret Access Key**: `wJalr...` (chỉ hiện 1 lần)

### 2.4. Custom IAM Policy (Recommended - Least Privilege)

Thay vì `AmazonS3FullAccess`, tạo policy chỉ cho phép upload/delete:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::pacsfr-uploads",
        "arn:aws:s3:::pacsfr-uploads/*"
      ]
    }
  ]
}
```

## ⚙️ Bước 3: Cấu hình Project

### 3.1. Cài đặt AWS SDK

```bash
bun add @aws-sdk/client-s3 @aws-sdk/lib-storage
```

### 3.2. Tạo file `.env.local`

Copy từ `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật các giá trị:

```env
# AWS S3 Configuration
NEXT_PUBLIC_AWS_REGION=ap-southeast-1
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIA... # Từ bước 2.3
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=wJalr... # Từ bước 2.3

# S3 Bucket
NEXT_PUBLIC_AWS_S3_BUCKET_NAME=pacsfr-uploads
NEXT_PUBLIC_AWS_S3_BUCKET_URL=https://pacsfr-uploads.s3.ap-southeast-1.amazonaws.com

# Server-side credentials (same as above or different)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJalr...
```

### 3.3. Enable AWS Upload trong API Route

Uncomment code trong `src/app/api/upload/route.ts`:

```typescript
// Đã có comment hướng dẫn trong file
```

## 🧪 Bước 4: Test Upload

### 4.1. Khởi động dev server

```bash
bun run dev
```

### 4.2. Test trong ServiceGroup Modal

1. Login với tài khoản Manager
2. Vào `/manager/nhom-dich-vu`
3. Click "Tạo nhóm mới"
4. Thử upload ảnh ở field "Icon nhóm dịch vụ"
5. Kiểm tra ảnh đã upload lên S3 bucket

### 4.3. Kiểm tra S3 Bucket

- Vào AWS Console → S3 → Bucket `pacsfr-uploads`
- Xem folder `service-groups/icons/`
- Verify file đã được upload

## 🔒 Security Best Practices

### 1. **KHÔNG commit credentials vào Git**

Add vào `.gitignore`:
```
.env.local
.env.production.local
```

### 2. **Dùng IAM Role thay vì Access Keys (Production)**

Khi deploy lên AWS (EC2, ECS, Lambda):
- Tạo IAM Role với S3 permissions
- Attach role vào service
- Không cần hardcode credentials

### 3. **Rotate Access Keys định kỳ**

- Mỗi 90 ngày nên đổi Access Key
- Tạo key mới → Update env → Xóa key cũ

### 4. **Dùng Private Bucket + Presigned URLs**

Cho sensitive files:
- Bucket policy: Chỉ cho IAM User access
- Generate presigned URLs với expiration time
- Users access qua presigned URLs

### 5. **Enable S3 Bucket Versioning**

Backup và recover files khi bị xóa nhầm:
- Vào Bucket → Properties → Versioning → Enable

### 6. **Enable CloudFront CDN (Optional)**

Tăng tốc độ download:
- Tạo CloudFront distribution
- Origin: S3 bucket
- Update `NEXT_PUBLIC_AWS_S3_BUCKET_URL` thành CloudFront URL

## 🌍 Multi-region Setup

Nếu có users từ nhiều region:

```typescript
// aws.config.ts
export const AWS_REGIONS = {
  SINGAPORE: 'ap-southeast-1',
  TOKYO: 'ap-northeast-1',
  SYDNEY: 'ap-southeast-2',
} as const;
```

Upload lên bucket gần nhất với user.

## 📊 Cost Estimation

### S3 Storage Pricing (ap-southeast-1)

- First 50 TB: **$0.025 per GB/month**
- PUT requests: **$0.005 per 1,000 requests**
- GET requests: **$0.0004 per 1,000 requests**

### Example:
- 10,000 images × 100KB = 1GB storage
- Cost: **$0.025/month**
- 100,000 GET requests: **$0.04/month**
- **Total: ~$0.07/month**

Very cheap! 💰

## 🐛 Troubleshooting

### Upload fails với "Access Denied"

**Giải pháp:**
1. Kiểm tra IAM User có đủ quyền S3
2. Verify credentials trong `.env.local`
3. Check bucket policy và CORS config

### CORS error khi upload từ browser

**Giải pháp:**
1. Add CORS configuration (Bước 1.3)
2. Verify domain trong `AllowedOrigins`
3. Clear browser cache

### Không thấy file sau khi upload

**Giải pháp:**
1. Check S3 bucket trong AWS Console
2. Verify bucket name trong env vars
3. Check file key/path

### Performance issues

**Giải pháp:**
1. Enable CloudFront CDN
2. Use image optimization (next/image)
3. Compress images trước khi upload

## 📚 Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)
- [S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

## 🆘 Support

Nếu gặp vấn đề, liên hệ team DevOps hoặc tạo issue trong repository.

