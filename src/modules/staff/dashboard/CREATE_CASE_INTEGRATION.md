# Create Case Integration - Staff Dashboard

## Tổng quan

Tài liệu này mô tả việc tích hợp chức năng tạo hồ sơ mới (Case) vào Staff Dashboard.

## API Endpoint

**Endpoint**: `POST /Case`

**Request Body**:
```json
{
  "guestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "priorityLevel": 0,
  "submissionMethod": "string",
  "notes": "string",
  "createdBy": "string"
}
```

**Success Response** (200):
```json
{
  "$id": "1",
  "success": true,
  "data": {
    "$id": "2",
    "id": "generated-uuid",
    "guestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "priorityLevel": 0,
    "submissionMethod": "Trực tiếp",
    "notes": "Ghi chú",
    "createdBy": "Staff Name",
    "createdAt": "2025-01-01T00:00:00Z",
    "status": "pending"
  }
}
```

## Cấu trúc Code

### 1. API Path (src/core/config/api.path.ts)

```typescript
STAFF: {
    DASHBOARD: {
        CREATE_CASE: "/Case",
    }
}
```

### 2. Types (src/modules/staff/dashboard/types.ts)

```typescript
export type CreateCaseRequest = {
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethod: string;
    notes?: string;
    createdBy: string;
};

export type CaseResponse = {
    $id?: string;
    id: string;
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethod: string;
    notes?: string;
    createdBy: string;
    createdAt: string;
    status: string;
};
```

### 3. API Function (src/modules/staff/dashboard/api/staff-dashboard.api.ts)

```typescript
async createCase(request: CreateCaseRequest): Promise<CreateCaseApiResponse> {
    const response = await http.post<CreateCaseApiResponse>(
        API_PATH.STAFF.DASHBOARD.CREATE_CASE, 
        request
    );
    return response.data;
}
```

### 4. Service Layer (src/modules/staff/dashboard/services/staff-dashboard.service.ts)

```typescript
async createCase(request: CreateCaseRequest): Promise<CaseResponse> {
    // Validation
    if (!request.guestId || !request.guestId.trim()) {
        throw new Error('Guest ID là bắt buộc');
    }
    if (!request.serviceId || !request.serviceId.trim()) {
        throw new Error('Service ID là bắt buộc');
    }
    if (request.priorityLevel < 0 || request.priorityLevel > 10) {
        throw new Error('Mức độ ưu tiên phải từ 0 đến 10');
    }

    const response = await staffDashboardApi.createCase(request);
    if (response.success && response.data) {
        return response.data;
    }
    throw new Error(response.message || 'Failed to create case');
}
```

### 5. CreateCaseModal Component

Component này cung cấp form để tạo hồ sơ mới với các trường:

**Required Fields**:
- **Guest ID** (UUID): ID của khách/công dân
- **Service ID** (UUID): ID của dịch vụ
- **Phương thức nộp**: Trực tiếp, Online, Email, Điện thoại, Bưu điện
- **Người tạo**: Tên nhân viên tạo hồ sơ

**Optional Fields**:
- **Priority Level** (0-10): Mức độ ưu tiên
  - 0: Bình thường
  - 1-3: Ưu tiên thấp
  - 4-6: Ưu tiên trung bình
  - 7-9: Ưu tiên cao
  - 10: Khẩn cấp
- **Notes**: Ghi chú thêm

## Sử dụng trong UI

### 1. Nút "Tạo hồ sơ mới"

Nút màu xanh lá ở góc phải header của Staff Dashboard:

```typescript
<Button 
    onClick={() => setShowCreateCaseModal(true)}
    className="bg-green-600 hover:bg-green-700"
    size="sm"
>
    <Plus className="w-4 h-4 mr-2" />
    Tạo hồ sơ mới
</Button>
```

### 2. Modal Form

Khi nhấn nút, modal sẽ hiển thị với form đầy đủ:

- **Header**: Icon + Tiêu đề "Tạo hồ sơ mới"
- **Form Fields**: Tất cả các trường với validation
- **Action Buttons**: 
  - Hủy (Cancel)
  - Tạo hồ sơ (Submit)

### 3. Validation

Client-side validation:
- Guest ID: Required
- Service ID: Required  
- Priority Level: 0-10
- Submission Method: Required
- Created By: Required

### 4. Success Flow

```
1. User nhập thông tin form
2. Nhấn "Tạo hồ sơ"
3. Validation check
4. Call API POST /Case
5. Success → Alert với Case ID
6. Reload dashboard data
7. Đóng modal
```

### 5. Error Handling

```typescript
try {
    const caseResponse = await staffDashboardService.createCase(formData);
    alert(`Tạo hồ sơ thành công! ID: ${caseResponse.id}`);
    onSuccess(caseResponse.id);
    onClose();
} catch (error) {
    if (error instanceof Error) {
        alert(`Lỗi: ${error.message}`);
    }
}
```

## Props của CreateCaseModal

```typescript
interface CreateCaseModalProps {
    onClose: () => void;              // Callback khi đóng modal
    onSuccess?: (caseId: string) => void;  // Callback khi tạo thành công
    defaultCreatedBy?: string;        // Giá trị mặc định cho "Người tạo"
}
```

## Tích hợp vào StaffDashboard

```typescript
const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);

// Trong render
{showCreateCaseModal && (
    <CreateCaseModal
        onClose={() => setShowCreateCaseModal(false)}
        onSuccess={(caseId) => {
            console.log("Case created with ID:", caseId);
            loadDashboardData(); // Reload data
        }}
        defaultCreatedBy={queueId || undefined}
    />
)}
```

## Priority Level Helper Functions

Service cung cấp các helper functions:

```typescript
// Get text tiếng Việt
staffDashboardService.getPriorityLevelText(5)
// => "Ưu tiên trung bình"

// Get color class cho UI
staffDashboardService.getPriorityLevelColor(8)
// => "bg-orange-100 text-orange-800"
```

## Testing

### Test Case 1: Tạo hồ sơ thành công

1. Vào Staff Dashboard
2. Nhấn "Tạo hồ sơ mới"
3. Nhập đầy đủ thông tin:
   - Guest ID: `3fa85f64-5717-4562-b3fc-2c963f66afa6`
   - Service ID: `3fa85f64-5717-4562-b3fc-2c963f66afa6`
   - Priority Level: Ưu tiên trung bình (5)
   - Phương thức: Trực tiếp
   - Người tạo: Nguyễn Văn A
   - Ghi chú: Test tạo hồ sơ
4. Nhấn "Tạo hồ sơ"
5. Verify: Alert hiển thị với Case ID

### Test Case 2: Validation errors

1. Nhấn "Tạo hồ sơ mới"
2. Để trống Guest ID
3. Nhấn "Tạo hồ sơ"
4. Verify: Error "Guest ID là bắt buộc"

### Test Case 3: Priority levels

1. Nhấn "Tạo hồ sơ mới"
2. Thử các mức priority khác nhau
3. Verify: Text hiển thị đúng (Bình thường, Ưu tiên thấp, etc.)

## UI/UX Features

✅ **Modal với overlay**: Tối màu nền phía sau
✅ **Loading state**: Nút "Đang tạo..." khi submit
✅ **Error messages**: Hiển thị inline dưới mỗi field
✅ **Icons**: Icons cho mỗi field để dễ nhận biết
✅ **Responsive**: Form hoạt động tốt trên mobile
✅ **Keyboard support**: Enter để submit, Escape để đóng
✅ **Success feedback**: Alert với Case ID sau khi tạo thành công
✅ **Auto reload**: Dashboard tự động reload sau khi tạo

## Related Files

- `src/core/config/api.path.ts` - API paths
- `src/modules/staff/dashboard/types.ts` - Type definitions
- `src/modules/staff/dashboard/api/staff-dashboard.api.ts` - API functions
- `src/modules/staff/dashboard/services/staff-dashboard.service.ts` - Business logic
- `src/modules/staff/dashboard/components/CreateCaseModal.tsx` - Modal component
- `src/modules/staff/dashboard/components/StaffDashboard.tsx` - Main dashboard
- `src/modules/staff/dashboard/index.ts` - Module exports

## Future Improvements

1. **Auto-populate Guest ID**: Tự động lấy Guest ID từ citizen đang chọn
2. **Service Selection**: Dropdown để chọn service thay vì nhập UUID
3. **Form Templates**: Lưu template để tạo nhanh
4. **Bulk Create**: Tạo nhiều case cùng lúc
5. **File Upload**: Upload documents khi tạo case
6. **Real-time Validation**: Validate Guest ID và Service ID với backend
7. **Toast Notifications**: Thay alert bằng toast đẹp hơn

## Notes

- Priority Level được validate cả client-side và server-side
- Guest ID và Service ID phải là UUID hợp lệ
- CreatedBy thường là tên staff hoặc queue ID
- Notes field là optional, có thể để trống
- Form state được reset sau khi đóng modal

