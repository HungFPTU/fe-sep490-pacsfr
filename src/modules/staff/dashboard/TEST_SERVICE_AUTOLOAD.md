# Test Service Auto-load Feature

## Mục đích
Kiểm tra tính năng tự động load danh sách service khi mở modal tạo hồ sơ.

## Bước Test

### Test 1: Auto-load khi mở modal
1. **Mở Staff Dashboard** (`/staff/dashboard`)
2. **Click nút "Tạo hồ sơ mới"** (nút xanh lá ở header)
3. **Quan sát modal CreateCaseModal**

**Expected Result** ✅:
- Modal hiển thị
- Phần "Dịch vụ" có input tìm kiếm
- **Loading spinner xuất hiện ngay** (nếu API chậm)
- Sau đó **danh sách services tự động hiển thị** khi click vào input hoặc icon dropdown

### Test 2: Kiểm tra loading state
1. Mở DevTools Network tab
2. Click "Tạo hồ sơ mới"
3. Quan sát network requests

**Expected Result** ✅:
- Request `GET /api/Service?IsActive=true&Page=1&Size=10` được gọi **tự động**
- Không cần click gì cả
- Response trả về danh sách services

### Test 3: Kiểm tra data hiển thị
1. Mở modal tạo hồ sơ
2. Click vào input "Tìm kiếm dịch vụ..."
3. Quan sát dropdown

**Expected Result** ✅:
- Dropdown hiển thị ngay lập tức
- Có **ít nhất 1 service** (nếu backend có data)
- Mỗi service hiển thị:
  - ✓ Tên dịch vụ
  - ✓ Mã dịch vụ (badge)
  - ✓ Mô tả
  - ✓ Thời gian xử lý (⏱️)
  - ✓ Phí (💰)
  - ✓ Loại dịch vụ (badge màu)

### Test 4: Kiểm tra pagination
1. Mở modal tạo hồ sơ
2. Click vào input service
3. Nếu có > 10 services, kiểm tra pagination ở dưới dropdown

**Expected Result** ✅:
- Hiển thị "Trang 1 / X"
- Nút "Trước" disabled
- Nút "Sau" enabled (nếu có page 2)

### Test 5: Kiểm tra empty state
**Nếu backend không có service nào**:

1. Mở modal
2. Click vào input service

**Expected Result** ✅:
- Dropdown hiển thị message: "Không tìm thấy dịch vụ"

### Test 6: Kiểm tra error handling
**Nếu API bị lỗi**:

1. Tắt backend hoặc mock API error
2. Mở modal tạo hồ sơ
3. Click vào input service

**Expected Result** ✅:
- Console log error (check DevTools Console)
- Services list trống
- Không crash app

## Visual Indicators

### Loading State
```
┌─────────────────────────────────┐
│   Dịch vụ *                     │
│  ┌───────────────────────────┐  │
│  │ 🔍 Tìm kiếm dịch vụ...  ▼│  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │         ⏳                 │  │
│  │    Đang tải...            │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Loaded State
```
┌─────────────────────────────────┐
│   Dịch vụ *                     │
│  ┌───────────────────────────┐  │
│  │ 🔍 Tìm kiếm dịch vụ...  ▼│  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ ● Dịch vụ hành chính 1    │  │
│  │   [SV001]                 │  │
│  │   ⏱️ 8 ngày | 💰 167,167  │  │
│  ├───────────────────────────┤  │
│  │ ● Dịch vụ hành chính 2    │  │
│  │   [SV002]                 │  │
│  │   ⏱️ 8 ngày | 💰 116,719  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Debug Checklist

Nếu services **KHÔNG** load tự động, kiểm tra:

### 1. Check Console Errors
```javascript
// Mở DevTools Console
// Tìm error messages như:
- "Error loading services:"
- Network error
- CORS error
```

### 2. Check Network Tab
```
DevTools > Network > XHR
- Có request đến /api/Service?
- Status code là gì? (200 OK?)
- Response có data không?
```

### 3. Check Backend
```bash
# Kiểm tra backend đang chạy
curl http://localhost:<port>/api/Service?IsActive=true&Page=1&Size=10

# Expected: JSON response với danh sách services
```

### 4. Check API Response Format
Response phải có format:
```json
{
  "success": true,
  "data": {
    "items": {
      "$values": [...]
    }
  }
}
```

## Common Issues & Solutions

### Issue 1: Dropdown không hiển thị gì
**Nguyên nhân**: Backend chưa có data
**Solution**: 
- Tạo ít nhất 1 service trong backend
- Set `isActive = true` cho service đó

### Issue 2: Loading mãi không xong
**Nguyên nhân**: 
- Backend chậm hoặc không response
- Network timeout

**Solution**:
- Check backend logs
- Check network connection
- Increase timeout setting

### Issue 3: Services load nhưng không hiển thị
**Nguyên nhân**: Response format không đúng

**Solution**: Check response format:
```typescript
// Phải có cấu trúc:
response.data.items.$values // ← Array of services
```

### Issue 4: "Không tìm thấy dịch vụ"
**Nguyên nhân**: 
- Tất cả services có `isActive = false`
- Backend filter bị sai

**Solution**: Check query parameters:
```
GET /api/Service?IsActive=true&Page=1&Size=10
                  ↑ Must be true
```

## Performance Check

### Thời gian load hợp lý:
- **< 1s**: Excellent ⚡
- **1-3s**: Good ✅
- **3-5s**: Acceptable ⚠️
- **> 5s**: Slow, cần optimize 🐌

### Nếu quá chậm:
1. Check backend query performance
2. Add database indexes
3. Implement caching
4. Reduce `size` parameter (10 → 5)

## Auto-load Behavior

### Khi nào services được load?

✅ **Load tự động**:
- Modal mở lần đầu
- Component mount

❌ **KHÔNG load lại**:
- User nhập vào search (dùng debounce search)
- User click pagination (load page mới)
- User đóng/mở dropdown (dùng cache)

### Re-load khi nào?
Services sẽ được load lại khi:
- Modal đóng và mở lại
- User nhập keyword search (sau 500ms debounce)
- User click pagination

## Success Criteria

✅ Tính năng hoạt động đúng khi:
1. Modal mở → Services load tự động
2. Loading state hiển thị đúng
3. Danh sách services hiển thị đầy đủ thông tin
4. Có thể chọn service và tạo hồ sơ thành công
5. Không có errors trong console
6. Performance tốt (< 3s)

## Next Steps After Testing

Nếu test thành công:
1. ✅ Test search functionality
2. ✅ Test pagination
3. ✅ Test select service
4. ✅ Test create case với service đã chọn

Nếu có issue:
1. 📝 Document error message
2. 🐛 Check console errors
3. 🔍 Debug với DevTools
4. 💬 Report issue với team


