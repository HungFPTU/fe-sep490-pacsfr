# OrgUnit Module

## Mô tả
Module quản lý **Cơ quan** (Organization Unit) cho vai trò Manager trong hệ thống PASCS. Cho phép tạo, xem, cập nhật và xóa các đơn vị/cơ quan trong tổ chức.

## Cấu trúc

```
org-unit/
├── api/
│   └── org-unit.api.ts           # Raw HTTP API calls
├── services/
│   └── org-unit.service.ts       # Business logic layer
├── components/
│   ├── view/
│   │   └── OrgUnitListPage.ui.tsx    # Main page
│   └── ui/
│       ├── header/
│       │   └── OrgUnitHeader.ui.tsx
│       ├── filter/
│       │   └── OrgUnitFilter.ui.tsx
│       ├── table/
│       │   ├── OrgUnitTable.ui.tsx
│       │   ├── OrgUnitTableHeader.ui.tsx
│       │   └── OrgUnitTableRow.ui.tsx
│       ├── pagination/
│       │   └── OrgUnitPagination.ui.tsx
│       ├── modal/
│       │   ├── CreateOrgUnitModal.ui.tsx
│       │   └── OrgUnitForm.ui.tsx
│       └── detail/
│           ├── OrgUnitDetailModal.ui.tsx
│           └── OrgUnitInfo.ui.tsx
├── hooks/
│   ├── index.ts                  # React Query hooks
│   └── useOrgUnitForm.ts         # Custom form hook
├── types/
│   └── index.ts                  # TypeScript types
├── constants/
│   └── index.ts                  # Constants & Query keys
├── enums/
│   └── index.ts                  # Enums
└── index.ts                      # Barrel export
```

## API Endpoints

### Base URL
Tất cả endpoints được định nghĩa trong `@core/config/api.path.ts`:

```typescript
API_PATH.MANAGER.ORG_UNIT = {
  GET_ALL: '/OrgUnit/get-all',
  GET_BY_ID: (id) => `/OrgUnit/${id}`,
  POST: '/OrgUnit/create',
  PUT: (id) => `/OrgUnit/${id}`,
  DELETE: (id) => `/OrgUnit/delete/${id}`,
}
```

### Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/OrgUnit/get-all?keyword=&isActive=true&Page=1&Size=10` | Lấy danh sách cơ quan với filter |
| GET | `/OrgUnit/{id}` | Lấy chi tiết cơ quan theo ID |
| POST | `/OrgUnit/create` | Tạo cơ quan mới |
| PUT | `/OrgUnit/{id}` | Cập nhật cơ quan |
| DELETE | `/OrgUnit/delete/{id}` | Xóa cơ quan |

## Data Types

### OrgUnit
```typescript
type OrgUnit = {
  id: string;
  unitCode: string;        // Mã cơ quan (unique)
  unitName: string;        // Tên cơ quan
  unitType: string;        // Loại hình: Phòng ban, Đơn vị, Trung tâm, Văn phòng
  address: string;         // Địa chỉ
  phone: string;           // Số điện thoại
  email: string;           // Email liên hệ
  isActive: boolean;       // Trạng thái hoạt động
  createdAt: string | Date;
  modifiedAt?: string | Date;
}
```

### Create/Update Request
```typescript
type CreateOrgUnitRequest = {
  unitCode: string;
  unitName: string;
  unitType: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
}
```

## Hooks Usage

### 1. React Query Hooks

```typescript
import { 
  useOrgUnits,
  useOrgUnitDetail,
  useCreateOrgUnit,
  useUpdateOrgUnit,
  useDeleteOrgUnit,
} from '@/modules/manager/org-unit';

// Fetch list
const { data, isLoading } = useOrgUnits({
  keyword: 'search term',
  isActive: true,
  page: 1,
  size: 10,
});

// Fetch detail
const { data: orgUnit } = useOrgUnitDetail(id);

// Create mutation
const createMutation = useCreateOrgUnit();
await createMutation.mutateAsync(data);

// Update mutation
const updateMutation = useUpdateOrgUnit();
await updateMutation.mutateAsync({ id, request: data });

// Delete mutation
const deleteMutation = useDeleteOrgUnit();
await deleteMutation.mutateAsync(id);
```

### 2. Form Hook

```typescript
import { useOrgUnitForm } from '@/modules/manager/org-unit';

const { form, isLoading, handleSubmit } = useOrgUnitForm({
  initData: orgUnit,    // For edit mode
  open: modalOpen,
  onSuccess: () => { /* callback */ },
  onClose: () => { /* callback */ },
});
```

## Components

### Main Page Component
```typescript
import { OrgUnitListPage } from '@/modules/manager/org-unit';

// In page.tsx
export default function OrgUnitPage() {
  return <OrgUnitListPage />;
}
```

### Individual UI Components
```typescript
import {
  OrgUnitHeader,
  OrgUnitFilter,
  OrgUnitTable,
  OrgUnitPagination,
  CreateOrgUnitModal,
  OrgUnitDetailModal,
} from '@/modules/manager/org-unit';
```

## Features

### ✅ Implemented Features

1. **Danh sách cơ quan**
   - Hiển thị danh sách với pagination
   - Filter theo keyword (tìm kiếm)
   - Filter theo trạng thái (Hoạt động/Ngừng)
   - Sorting theo ngày cập nhật

2. **Tạo cơ quan mới**
   - Form validation
   - Required fields: unitCode, unitName, unitType, address, phone, email
   - Toast notification khi thành công/thất bại

3. **Cập nhật cơ quan**
   - Pre-fill form với data hiện tại
   - Disable unitCode khi edit
   - Update chỉ các field được thay đổi

4. **Xem chi tiết**
   - Modal hiển thị đầy đủ thông tin
   - Formatted dates và status badges
   - Icon cơ quan

5. **Xóa cơ quan**
   - Confirm dialog trước khi xóa
   - Toast notification
   - Auto refresh list sau khi xóa

## Validation Rules

### unitCode
- Required
- Unique
- Không được sửa khi edit

### unitName
- Required
- Tối thiểu 3 ký tự

### unitType
- Required
- Chỉ chọn từ danh sách: Phòng ban, Đơn vị, Trung tâm, Văn phòng

### email
- Required
- Format email hợp lệ

### phone
- Required
- Format số điện thoại hợp lệ

### address
- Required
- Tối thiểu 10 ký tự

## State Management

### Local State
- Component state với `useState` cho UI state (modals, filters, pagination)

### Server State
- React Query cho data fetching và caching
- Cache time: 5 minutes
- Stale time: 1 minute
- Auto invalidate khi mutation success

## Routing

```typescript
// Route
/manager/co-quan

// Navigation link trong sidebar
Thiết lập hoạt động > Quản lý cơ quan
```

## Error Handling

```typescript
// API errors
try {
  await createMutation.mutateAsync(data);
} catch (error) {
  console.error('Error:', error);
  addToast({ message: 'Đã xảy ra lỗi', type: 'error' });
}

// Form validation errors
form.Field({ name: 'unitCode' })
  .validate((value) => !value && 'Mã cơ quan là bắt buộc')
```

## Testing

### Unit Tests (TODO)
```typescript
// Test API calls
describe('orgUnitApi', () => {
  it('should fetch org units list', async () => {
    // ...
  });
});

// Test components
describe('OrgUnitListPage', () => {
  it('should render correctly', () => {
    // ...
  });
});
```

## Performance Optimization

1. **React Query Caching**: Cache API responses để giảm network calls
2. **Component Memoization**: Memo các expensive components
3. **Pagination**: Load chỉ 10 items mỗi lần
4. **Debounced Search**: Search input debounced 500ms

## Future Enhancements

- [ ] Bulk actions (xóa nhiều, update status nhiều)
- [ ] Advanced filters (filter theo unitType, date range)
- [ ] Export to Excel/CSV
- [ ] Import from file
- [ ] Sort columns
- [ ] Column visibility toggle
- [ ] Loading skeletons
- [ ] Infinite scroll option
- [ ] Mobile responsive improvements

## Related Modules

- **Department Module**: Quản lý phòng ban thuộc OrgUnit
- **Staff Module**: Nhân viên thuộc OrgUnit
- **Service Module**: Dịch vụ được cung cấp bởi OrgUnit

## Contributors

- Module được tạo theo **Cursor Rules** của project
- Follow best practices: Component composition, Custom hooks, Type safety
- Architecture pattern: API → Service → Hooks → Components

---

**Last Updated**: 2025-10-24  
**Version**: 1.0.0

