# Service Selection with Search Integration

## Tổng quan

Tích hợp dropdown chọn dịch vụ có tính năng tìm kiếm và phân trang vào CreateCaseModal, thay thế việc nhập UUID thủ công.

## API Endpoint

**Endpoint**: `GET /api/Service`

**Query Parameters**:
- `Keyword` (string, optional): Từ khóa tìm kiếm
- `ServiceGroupId` (string, optional): Filter theo nhóm dịch vụ
- `LegalBasisId` (string, optional): Filter theo cơ sở pháp lý
- `IsActive` (boolean, optional): Filter theo trạng thái active
- `Page` (number, optional): Số trang (default: 1)
- `Size` (number, optional): Kích thước trang (default: 10)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Get data succeeded.",
  "data": {
    "size": 10,
    "page": 1,
    "total": 5,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "items": {
      "$values": [
        {
          "id": "79ebd0ce-3190-4783-8dfc-fbb7aaf07101",
          "serviceName": "Dịch vụ hành chính 1",
          "serviceCode": "SV001",
          "description": "Mô tả dịch vụ",
          "serviceType": "Trực tiếp",
          "processingTime": "8 ngày",
          "feeAmount": 167167.01,
          "isActive": true
        }
      ]
    }
  }
}
```

## Cấu trúc Code

### 1. API Path

```typescript
// src/core/config/api.path.ts
STAFF: {
    DASHBOARD: {
        GET_SERVICES: "/api/Service",
    }
}
```

### 2. Types

```typescript
// src/modules/staff/dashboard/types.ts
export type Service = {
    id: string;
    serviceGroupId: string;
    legalBasisId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    processingTime: string;
    feeAmount: number;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    requiredDocuments: {
        $values: ServiceDocument[];
    };
    createdAt: string;
};

export type PaginatedData<T> = {
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
        $values: T[];
    };
};

export type ServiceFilters = {
    keyword?: string;
    serviceGroupId?: string;
    legalBasisId?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};
```

### 3. API Function

```typescript
// src/modules/staff/dashboard/api/staff-dashboard.api.ts
async getServices(filters?: ServiceFilters): Promise<ServiceListResponse> {
    const params = new URLSearchParams();
    
    if (filters?.keyword) params.append('Keyword', filters.keyword);
    if (filters?.serviceGroupId) params.append('ServiceGroupId', filters.serviceGroupId);
    if (filters?.legalBasisId) params.append('LegalBasisId', filters.legalBasisId);
    if (filters?.isActive !== undefined) params.append('IsActive', filters.isActive.toString());
    if (filters?.page) params.append('Page', filters.page.toString());
    if (filters?.size) params.append('Size', filters.size.toString());

    const query = params.toString();
    const url = `${API_PATH.STAFF.DASHBOARD.GET_SERVICES}${query ? '?' + query : ''}`;

    const response = await http.get<ServiceListResponse>(url);
    return response.data;
}
```

## UI Components

### Service Dropdown Features

#### 1. Search Input
- Icon tìm kiếm (Search)
- Placeholder: "Tìm kiếm dịch vụ..."
- Icon mũi tên dropdown (ChevronDown)
- Auto-focus hiển thị dropdown
- Debounce search 500ms

#### 2. Dropdown List
**Loading State**:
```tsx
<div className="p-4 text-center">
    <div className="animate-spin h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
    <p className="mt-2 text-sm">Đang tải...</p>
</div>
```

**Empty State**:
```tsx
<div className="p-4 text-center text-gray-500">
    <p className="text-sm">Không tìm thấy dịch vụ</p>
</div>
```

**Service Item**:
```tsx
<div className="p-3 hover:bg-gray-50 cursor-pointer">
    <div className="flex items-center gap-2">
        <p className="font-medium">{serviceName}</p>
        <span className="badge">{serviceCode}</span>
    </div>
    <p className="text-xs text-gray-500">{description}</p>
    <div className="flex items-center gap-3 text-xs">
        <span>⏱️ {processingTime}</span>
        <span>💰 {feeAmount.toLocaleString('vi-VN')} VNĐ</span>
        <span className="badge">{serviceType}</span>
    </div>
</div>
```

#### 3. Pagination
```tsx
<div className="p-3 border-t flex justify-between">
    <button disabled={currentPage === 1}>Trước</button>
    <span>Trang {currentPage} / {totalPages}</span>
    <button disabled={currentPage === totalPages}>Sau</button>
</div>
```

#### 4. Selected Service Display
```tsx
<div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-start justify-between">
        <div className="flex-1">
            <p className="text-sm font-medium text-green-900">
                ✓ Đã chọn: {selectedService.serviceName}
            </p>
            <p className="text-xs text-green-700 mt-1">
                Mã: {serviceCode} • {processingTime} • {feeAmount} VNĐ
            </p>
        </div>
        <button onClick={() => clearSelection()}>
            <X className="w-4 h-4" />
        </button>
    </div>
</div>
```

## Component States

```typescript
// Service search states
const [services, setServices] = useState<Service[]>([]);
const [isLoadingServices, setIsLoadingServices] = useState(false);
const [serviceSearchKeyword, setServiceSearchKeyword] = useState("");
const [showServiceDropdown, setShowServiceDropdown] = useState(false);
const [selectedService, setSelectedService] = useState<Service | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
```

## Key Functions

### 1. Load Services

```typescript
const loadServices = useCallback(async (keyword: string = "", page: number = 1) => {
    setIsLoadingServices(true);
    try {
        const response = await staffDashboardApi.getServices({
            keyword: keyword || undefined,
            isActive: true,
            page,
            size: 10,
        });

        if (response.success && response.data) {
            setServices(response.data.items.$values || []);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.page);
        }
    } catch (error) {
        console.error("Error loading services:", error);
    } finally {
        setIsLoadingServices(false);
    }
}, []);
```

### 2. Handle Service Select

```typescript
const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setFormData({ ...formData, serviceId: service.id });
    setServiceSearchKeyword(service.serviceName);
    setShowServiceDropdown(false);
    // Clear error
    if (errors.serviceId) {
        const newErrors = { ...errors };
        delete newErrors.serviceId;
        setErrors(newErrors);
    }
};
```

### 3. Debounced Search

```typescript
useEffect(() => {
    const timer = setTimeout(() => {
        if (showServiceDropdown) {
            loadServices(serviceSearchKeyword, 1);
        }
    }, 500);

    return () => clearTimeout(timer);
}, [serviceSearchKeyword, showServiceDropdown, loadServices]);
```

## User Flow

### 1. Mở Form Tạo Hồ Sơ
- Services được load tự động (isActive: true, page: 1, size: 10)
- Dropdown ban đầu ẩn

### 2. Tìm Kiếm Service
```
User nhập vào search input
→ onFocus → Hiển thị dropdown
→ onChange → Update serviceSearchKeyword
→ Debounce 500ms
→ Call API với keyword mới
→ Update services list
```

### 3. Chọn Service
```
User click vào service item
→ handleServiceSelect()
→ Update selectedService
→ Update formData.serviceId
→ Update serviceSearchKeyword với serviceName
→ Đóng dropdown
→ Hiển thị selected service display
```

### 4. Xóa Selection
```
User click nút X trên selected service display
→ Clear selectedService
→ Clear formData.serviceId
→ Clear serviceSearchKeyword
```

### 5. Pagination
```
User click "Trước" hoặc "Sau"
→ loadServices(serviceSearchKeyword, newPage)
→ Update services list với page mới
```

## Styling Classes

### Service Type Badge Colors
```typescript
serviceType === 'Trực tiếp' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-purple-100 text-purple-700'
```

### Error State
```typescript
className={errors.serviceId ? 'border-red-500' : 'border-gray-300'}
```

### Selected State
```tsx
<div className="bg-green-50 border border-green-200 rounded-lg">
    <p className="text-green-900">✓ Đã chọn: ...</p>
    <p className="text-green-700">Mã: ... • ... • ...</p>
</div>
```

## Performance Optimization

### 1. Debounce Search
- Delay: 500ms
- Giảm số lượng API calls khi user đang typing

### 2. Pagination
- Size: 10 items per page
- Load on-demand khi user click next/prev

### 3. useCallback
- `loadServices` được wrap trong useCallback
- Tránh re-create function không cần thiết

### 4. Conditional Rendering
- Dropdown chỉ render khi `showServiceDropdown === true`
- Loading/Empty states riêng biệt

## Error Handling

### 1. API Error
```typescript
try {
    const response = await staffDashboardApi.getServices(...);
    // Handle success
} catch (error) {
    console.error("Error loading services:", error);
    // Keep existing services list
}
```

### 2. Validation Error
```typescript
if (!formData.serviceId.trim()) {
    newErrors.serviceId = "Service ID là bắt buộc";
}
```

## Testing Scenarios

### Test Case 1: Load Services
1. Mở modal
2. Verify: API được gọi với `isActive=true`, `page=1`, `size=10`
3. Verify: Danh sách hiển thị đúng

### Test Case 2: Search
1. Nhập "hành chính" vào search
2. Wait 500ms
3. Verify: API được gọi với `Keyword=hành chính`
4. Verify: Kết quả filtered

### Test Case 3: Select Service
1. Click vào service item
2. Verify: Selected display hiển thị
3. Verify: serviceId được set vào formData
4. Verify: Dropdown đóng

### Test Case 4: Pagination
1. Click "Sau"
2. Verify: API được gọi với `page=2`
3. Verify: Danh sách page 2 hiển thị

### Test Case 5: Clear Selection
1. Select một service
2. Click nút X
3. Verify: Selection bị clear
4. Verify: Search input trống

## Integration with CreateCase API

Khi submit form:
```typescript
const formData = {
    guestId: "...",
    serviceId: selectedService?.id, // ← UUID từ service được chọn
    priorityLevel: 0,
    submissionMethod: "Trực tiếp",
    notes: "...",
    createdBy: "..."
};

await staffDashboardService.createCase(formData);
```

## Benefits

✅ **Better UX**: 
- Không cần nhớ/copy UUID
- Tìm kiếm nhanh bằng tên
- Xem thông tin service trước khi chọn

✅ **Data Integrity**:
- Chỉ chọn được services active
- UUID luôn đúng format
- Không nhập sai

✅ **Efficiency**:
- Search với debounce
- Pagination để handle nhiều services
- Loading states rõ ràng

✅ **Accessibility**:
- Keyboard navigation (focus, enter, escape)
- Clear visual states
- Error messages

## Related Files

- `src/core/config/api.path.ts` - API path
- `src/modules/staff/dashboard/types.ts` - Types
- `src/modules/staff/dashboard/api/staff-dashboard.api.ts` - API functions
- `src/modules/staff/dashboard/components/CreateCaseModal.tsx` - UI Component
- `src/modules/staff/dashboard/index.ts` - Exports

## Future Improvements

1. **Fuzzy Search**: Tìm kiếm thông minh hơn
2. **Recently Used**: Hiển thị services đã dùng gần đây
3. **Favorites**: Lưu services yêu thích
4. **Filters**: Filter theo serviceType, fee range
5. **Infinite Scroll**: Thay pagination bằng infinite scroll
6. **Service Details**: Modal xem chi tiết service
7. **Keyboard Shortcuts**: Arrow keys để navigate list
8. **Cache**: Cache danh sách để giảm API calls

