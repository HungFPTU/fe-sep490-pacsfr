# Staff Dashboard Module

Bảng điều khiển dành cho nhân viên PASCS với đầy đủ tính năng quản lý hàng đợi và hồ sơ công dân.

## Tính năng chính

### 🎯 Dashboard chính
- **Danh sách công dân đang chờ**: Hiển thị danh sách công dân đang chờ phục vụ
- **Thống kê thời gian thực**: Số lượng đang chờ, đang xử lý, hoàn thành trong ngày
- **Tìm kiếm và lọc**: Theo tên, số thứ tự, loại dịch vụ

### 👤 Quản lý hồ sơ công dân
- **Xem chi tiết hồ sơ**: Thông tin cá nhân, lịch sử phục vụ
- **Cập nhật trạng thái**: Đang chờ → Đang xử lý → Cần bổ sung → Hoàn thành
- **Ghi chú**: Thêm ghi chú cho từng hồ sơ

### 📄 Quản lý tài liệu
- **Tải lên tài liệu**: Hỗ trợ PDF, DOC, JPG, PNG (tối đa 10MB)
- **Tải xuống tài liệu**: Download với tên file gốc
- **Xem tài liệu**: Preview trực tiếp trong trình duyệt
- **Xóa tài liệu**: Xóa tài liệu không cần thiết

### 💬 Phản hồi từ công dân
- **Ghi nhận đánh giá**: Hệ thống 5 sao
- **Thu thập nhận xét**: Phản hồi chi tiết từ công dân
- **Lưu trữ lịch sử**: Lưu trữ tất cả phản hồi

### 📊 Lịch sử hồ sơ
- **Danh sách hoàn thành**: Tất cả hồ sơ đã xử lý
- **Thống kê hiệu suất**: Thời gian xử lý trung bình
- **Xuất báo cáo**: CSV với đầy đủ thông tin
- **Bộ lọc nâng cao**: Theo ngày, loại dịch vụ, trạng thái

### 🔔 Thông báo thời gian thực
- **Popup thông báo**: Khi có công dân mới, đến lượt, cập nhật trạng thái
- **Đánh dấu đã đọc**: Quản lý trạng thái thông báo
- **Lọc thông báo**: Theo loại và thời gian

## Cấu trúc module

```
src/modules/staff/dashboard/
├── api/                    # API calls
├── components/             # React components
├── services/              # Business logic
├── stores/                # Zustand state management
├── types.ts              # TypeScript definitions
├── consts.ts             # Mock data & constants
├── index.ts              # Module exports
└── README.md             # Documentation
```

## Routes

- `/staff/dashboard` - Dashboard chính với danh sách chờ
- `/staff/history` - Lịch sử hồ sơ đã hoàn thành

## Cách sử dụng

### 1. Truy cập Dashboard
```typescript
import { StaffDashboard } from '@modules/staff/dashboard';

export default function Page() {
    return <StaffDashboard />;
}
```

### 2. Sử dụng các component riêng lẻ
```typescript
import {
    CitizenProfileModal,
    DocumentUpload,
    FeedbackForm,
    NotificationPanel
} from '@modules/staff/dashboard';
```

### 3. Sử dụng API services
```typescript
import { staffDashboardService } from '@modules/staff/dashboard';

// Get waiting list
const citizens = await staffDashboardService.getWaitingList();

// Update citizen status
await staffDashboardService.updateCitizenStatus({
    citizenId: 'cit_001',
    status: 'processing',
    notes: 'Đang kiểm tra giấy tờ'
});
```

### 4. Sử dụng Zustand store
```typescript
import { useStaffDashboardStore } from '@modules/staff/dashboard';

function MyComponent() {
    const {
        waitingList,
        setWaitingList,
        updateCitizenInList
    } = useStaffDashboardStore();

    // Use store methods...
}
```

## Mock Data

Module bao gồm dữ liệu giả để phát triển và testing:

- `MOCK_CITIZENS`: Danh sách công dân mẫu
- `MOCK_HISTORY`: Lịch sử hồ sơ đã hoàn thành
- `MOCK_NOTIFICATIONS`: Thông báo mẫu
- `MOCK_STATS`: Thống kê dashboard

## API Integration

Để tích hợp với API thật, cập nhật các function trong `staff-dashboard.api.ts`:

```typescript
// Thay thế mock data bằng API calls thực
export const staffDashboardApi = {
    async getWaitingList(filters) {
        const response = await http.get(API_PATH.STAFF.DASHBOARD.WAITING_LIST, {
            params: filters
        });
        return response.data;
    }
};
```

## Tính năng nâng cao

### Real-time Updates
- WebSocket integration cho thông báo thời gian thực
- Auto-refresh dashboard mỗi 30 giây
- Push notifications khi có thay đổi

### Performance
- Lazy loading cho danh sách dài
- Virtual scrolling cho 1000+ records
- Optimized re-renders với React.memo

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Testing

```bash
# Chạy tests cho staff dashboard
npm test -- src/modules/staff/dashboard/

# Chạy E2E tests
npm run test:e2e -- --spec staff-dashboard.spec.ts
```

## Dependencies

- React 19
- Next.js 15
- Tailwind CSS v4
- Zustand (state management)
- Lucide React (icons)

## Contributing

1. Follow existing code style
2. Add TypeScript types cho tất cả props
3. Include error handling
4. Add unit tests cho new features
5. Update documentation
