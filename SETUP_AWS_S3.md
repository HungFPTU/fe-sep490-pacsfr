# Hướng dẫn Setup AWS S3 Upload - Tóm tắt nhanh

## ⚡ Quick Start

### Bước 1: Cài đặt AWS SDK

```bash
bun add @aws-sdk/client-s3 @aws-sdk/lib-storage
```

### Bước 2: Tạo file `.env.local`

```bash
# Copy từ example
cp env.example.txt .env.local
```

Cập nhật các giá trị AWS credentials:

```env
NEXT_PUBLIC_AWS_REGION=ap-southeast-1
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIA...
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=wJalr...
NEXT_PUBLIC_AWS_S3_BUCKET_NAME=pacsfr-uploads
```

### Bước 3: Enable Upload trong API Route

Mở file `src/app/api/upload/route.ts` và uncomment code AWS S3:

```typescript
// Uncomment các import
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Uncomment s3Client initialization
const s3Client = new S3Client({...});

// Uncomment upload logic trong POST handler
```

### Bước 4: Test Upload

1. Khởi động dev server: `bun run dev`
2. Vào `/manager/nhom-dich-vu`
3. Click "Tạo nhóm mới"
4. Upload ảnh ở field "Icon nhóm dịch vụ"

## 📚 Chi tiết đầy đủ

Xem hướng dẫn chi tiết trong: [docs/AWS_S3_SETUP.md](./docs/AWS_S3_SETUP.md)

## 🔧 Architecture

```
┌─────────────┐
│  Component  │ (ImageUpload.tsx)
│  (UI Layer) │
└──────┬──────┘
       │
       │ uses
       │
┌──────▼──────┐
│    Hook     │ (useFileUpload.ts)
│ (State Mgmt)│
└──────┬──────┘
       │
       │ calls
       │
┌──────▼──────┐
│   Service   │ (upload.service.ts)
│ (Logic)     │
└──────┬──────┘
       │
       │ POST
       │
┌──────▼──────┐
│  API Route  │ (/api/upload)
│  (Backend)  │
└──────┬──────┘
       │
       │ uploads
       │
┌──────▼──────┐
│   AWS S3    │
│  (Storage)  │
└─────────────┘
```

## 🎯 Sử dụng trong các module khác

### Trong Form Component

```tsx
import { ImageUpload } from '@/shared/components/common/ImageUpload';
import { AWS_CONFIG } from '@core/config/aws.config';

// Trong component
<form.Field name="imageUrl">
  {(field) => (
    <ImageUpload
      value={field.state.value as string}
      onChange={(url) => field.handleChange(url as never)}
      folder={AWS_CONFIG.FOLDERS.AVATARS} // hoặc folder khác
      label="Upload hình ảnh"
      required
    />
  )}
</form.Field>
```

### Standalone

```tsx
import { ImageUpload } from '@/shared/components/common/ImageUpload';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');
  
  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      folder="custom-folder"
      label="Tải lên ảnh"
    />
  );
}
```

## 🔐 Security Notes

- ✅ Credentials được lưu trong `.env.local` (không commit)
- ✅ File size limit: 5MB
- ✅ File type validation: Chỉ images
- ✅ Backend validation trước khi upload
- ✅ Unique filename generation để tránh conflict

## 📁 Files Created

```
src/
├── core/
│   ├── config/
│   │   └── aws.config.ts          # AWS configuration
│   ├── services/
│   │   ├── upload.service.ts      # Upload logic
│   │   └── README.md              # Service docs
│   └── hooks/
│       └── useFileUpload.ts       # Upload hook
├── shared/
│   └── components/
│       └── common/
│           ├── ImageUpload.tsx    # Upload component
│           └── README.md          # Component docs
└── app/
    └── api/
        └── upload/
            └── route.ts           # Upload API endpoint

docs/
└── AWS_S3_SETUP.md                # Full setup guide

env.example.txt                     # Environment template
```

## 🚀 Next Steps

1. **Setup AWS**: Follow [AWS_S3_SETUP.md](./docs/AWS_S3_SETUP.md)
2. **Install SDK**: `bun add @aws-sdk/client-s3 @aws-sdk/lib-storage`
3. **Configure**: Update `.env.local`
4. **Enable**: Uncomment code in `src/app/api/upload/route.ts`
5. **Test**: Upload ảnh trong ServiceGroup modal
6. **Production**: Setup CloudFront CDN (optional)

## 🆘 Troubleshooting

**Upload không hoạt động:**
- Check console logs
- Verify AWS credentials
- Check S3 CORS configuration
- Verify bucket permissions

**CORS errors:**
- Add CORS configuration trong S3 bucket
- Verify AllowedOrigins includes your domain

Xem chi tiết trong [docs/AWS_S3_SETUP.md](./docs/AWS_S3_SETUP.md)

