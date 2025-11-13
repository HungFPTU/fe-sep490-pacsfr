# 🔧 Sửa lỗi 500 Server Error trên Vercel

## 📋 Vấn đề

Khi deploy lên Vercel và edit trực tiếp URL trên web, ứng dụng bị lỗi 500 Server Error.

## ✅ Các vấn đề đã được sửa

### 1. **vercel.json - Loại bỏ rewrites không cần thiết**

**Vấn đề**: Cấu hình `rewrites` đang rewrite tất cả routes về chính nó, gây xung đột với Next.js routing.

**Giải pháp**: Loại bỏ phần `rewrites` vì Next.js tự xử lý routing.

```json
// ❌ TRƯỚC
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}

// ✅ SAU
// Đã loại bỏ rewrites
```

### 2. **next.config.ts - Loại bỏ output: "standalone"**

**Vấn đề**: `output: "standalone"` không tương thích với Vercel vì Vercel có cách xử lý riêng.

**Giải pháp**: Comment out `output: "standalone"` để Vercel tự xử lý.

```typescript
// ❌ TRƯỚC
output: "standalone",

// ✅ SAU
// output: "standalone", // Disabled for Vercel deployment
```

### 3. **Thêm Error Handling**

**Vấn đề**: Thiếu error boundaries và not-found pages, khiến lỗi không được xử lý đúng cách.

**Giải pháp**: Tạo các file error handling:

- ✅ `src/app/error.tsx` - Global error boundary
- ✅ `src/app/not-found.tsx` - Global 404 page
- ✅ `src/app/(client)/thu-tuc-hanh-chinh/[id]/error.tsx` - Error cho dynamic route
- ✅ `src/app/(client)/thu-tuc-hanh-chinh/[id]/not-found.tsx` - 404 cho dynamic route

## 🎯 Kết quả

Sau khi sửa:

1. ✅ Vercel sẽ xử lý routing đúng cách
2. ✅ Dynamic routes sẽ hoạt động bình thường
3. ✅ Lỗi sẽ được xử lý và hiển thị thông báo thân thiện
4. ✅ 404 pages sẽ hiển thị khi route không tồn tại

## 🚀 Các bước tiếp theo

1. **Commit và push code**:
   ```bash
   git add .
   git commit -m "fix: Sửa lỗi 500 server error trên Vercel"
   git push
   ```

2. **Redeploy trên Vercel**:
   - Vercel sẽ tự động detect changes và redeploy
   - Hoặc trigger manual deployment từ Vercel dashboard

3. **Kiểm tra**:
   - Thử edit URL trực tiếp trên browser
   - Kiểm tra các dynamic routes như `/thu-tuc-hanh-chinh/[id]`
   - Kiểm tra error handling khi có lỗi xảy ra

## 📝 Lưu ý

- **Dynamic Routes**: Tất cả dynamic routes nên có `error.tsx` và `not-found.tsx` để xử lý lỗi tốt hơn
- **Environment Variables**: Đảm bảo tất cả environment variables đã được cấu hình trên Vercel
- **API Routes**: Kiểm tra API routes có error handling đầy đủ

## 🔍 Debugging Tips

Nếu vẫn gặp lỗi 500:

1. **Kiểm tra Vercel Logs**:
   - Vào Vercel Dashboard → Deployments → Function Logs
   - Xem chi tiết lỗi trong logs

2. **Kiểm tra Environment Variables**:
   - Đảm bảo `NEXT_PUBLIC_API_BASE_URL` đã được set
   - Kiểm tra các biến môi trường khác

3. **Kiểm tra Build Logs**:
   - Xem build logs để tìm lỗi compile
   - Đảm bảo build thành công

4. **Test Local Production Build**:
   ```bash
   bun run build
   bun run start
   ```
   - Test trên local trước khi deploy

## 📚 Tài liệu tham khảo

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

