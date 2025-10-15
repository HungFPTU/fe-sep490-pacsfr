# Manager Module

Bảng điều khiển dành cho quản lý hệ thống PASCS với đầy đủ tính năng quản lý nhân sự, dịch vụ, hàng đợi và giám sát hệ thống.

## Tính năng chính

### 🎯 Dashboard quản lý
- **Tổng quan hệ thống**: Thống kê tổng quan về nhân sự, dịch vụ, hàng đợi
- **Biểu đồ thời gian thực**: Hiệu suất làm việc, tình trạng hệ thống
- **Thông báo quan trọng**: Cảnh báo hệ thống, báo cáo lỗi

### 👥 Quản lý nhân sự
- **Danh sách nhân viên**: Quản lý thông tin tất cả nhân viên trong hệ thống
- **Phân quyền & Vai trò**: Thiết lập quyền hạn cho từng vai trò (Admin, Staff, Citizen)
- **Hiệu suất làm việc**: Theo dõi hiệu suất và đánh giá nhân viên
- **Thống kê hoạt động**: Báo cáo chi tiết về hoạt động của nhân viên

### 🏢 Quản lý dịch vụ
- **Danh mục dịch vụ**: Quản lý các loại dịch vụ công cung cấp
- **Cấu hình quy trình**: Thiết lập quy trình xử lý cho từng dịch vụ
- **Quy tắc xếp hàng**: Định nghĩa logic xếp hàng và ưu tiên
- **Thời gian xử lý**: Thiết lập thời gian xử lý mục tiêu cho từng dịch vụ

### ⚙️ Thiết lập hoạt động
- **Giờ làm việc**: Cấu hình lịch làm việc của hệ thống
- **Giới hạn hàng đợi**: Thiết lập giới hạn số lượng người chờ
- **Quầy phục vụ**: Quản lý các quầy phục vụ và phân bổ nhân viên
- **Quy tắc đặc biệt**: Thiết lập cho các trường hợp đặc biệt

### 📊 Giám sát thời gian thực
- **Tình trạng hàng đợi**: Theo dõi real-time tình trạng các hàng đợi
- **Tải hệ thống**: Giám sát hiệu suất và tải của hệ thống
- **Ưu tiên nhóm đặc biệt**: Quản lý ưu tiên cho các nhóm đặc biệt
- **Cảnh báo tự động**: Thông báo khi có sự cố hoặc bất thường

### 📈 Thống kê & Báo cáo
- **Báo cáo tổng hợp**: Thống kê tổng quan về hoạt động hệ thống
- **Báo cáo chi tiết**: Phân tích sâu về hiệu suất từng bộ phận
- **Xuất dữ liệu**: Export báo cáo dưới nhiều định dạng
- **Lịch sử hoạt động**: Theo dõi lịch sử thay đổi và hoạt động

### 🎫 Quản lý hàng đợi
- **Tình trạng hàng chờ**: Giám sát real-time tình trạng các hàng đợi
- **Thống kê hàng đợi**: Phân tích hiệu suất và thời gian chờ
- **Điều chỉnh ưu tiên**: Thay đổi thứ tự ưu tiên khi cần thiết
- **Quản lý quầy**: Phân bổ và quản lý các quầy phục vụ

## Cấu trúc module

```
src/modules/manager/
├── account/                  # Quản lý nhân sự
│   ├── api/                 # API calls
│   ├── components/          # React components
│   ├── services/            # Business logic
│   ├── hooks/               # Custom hooks
│   ├── types.ts            # TypeScript definitions
│   ├── consts.ts           # Constants & mock data
│   ├── enums.ts            # Enumerations
│   └── utils/              # Utility functions
├── dashboard/               # Dashboard chính
│   ├── api/
│   ├── components/
│   ├── services/
│   └── types.ts
├── queue/                   # Quản lý hàng đợi
│   ├── api/
│   ├── components/
│   ├── services/
│   └── types.ts
├── services/                # Quản lý dịch vụ
│   ├── api/
│   ├── components/
│   ├── services/
│   └── types.ts
├── counters/                # Quản lý quầy phục vụ
├── index.ts                # Module exports
└── README.md               # Documentation
```

## Routes

### Dashboard
- `/manager` - Dashboard chính với tổng quan hệ thống

### Quản lý nhân sự
- `/manager/account/list` - Danh sách nhân viên
- `/manager/account/roles` - Phân quyền & Vai trò
- `/manager/account/performance` - Hiệu suất làm việc

### Quản lý dịch vụ
- `/manager/service/list` - Danh mục dịch vụ
- `/manager/service/config` - Cấu hình quy trình phục vụ
- `/manager/service/queue` - Quy tắc xếp hàng

### Thiết lập hoạt động
- `/manager/operation/hours` - Giờ làm việc
- `/manager/operation/limits` - Giới hạn số lượng hàng chờ
- `/manager/operation/counter` - Quầy phục vụ

### Giám sát thời gian thực
- `/manager/monitoring/queue` - Tình trạng hàng chờ
- `/manager/monitoring/manager` - Tải hệ thống
- `/manager/monitoring/special` - Ưu tiên nhóm đặc biệt

### Quản lý hàng đợi
- `/manager/queue/status` - Tình trạng hàng chờ
- `/manager/queue/statistics` - Thống kê hàng đợi

### Thống kê & Báo cáo
- `/manager/reporting` - Báo cáo tổng hợp

## Cách sử dụng

### 1. Truy cập Dashboard
```typescript
import { ManagerDashboard } from '@modules/manager/dashboard';

export default function Page() {
    return <ManagerDashboard />;
}
```

### 2. Sử dụng các component riêng lẻ
```typescript
import {
    AccountList,
    ServiceConfig,
    QueueStatus,
    SystemMonitoring
} from '@modules/manager';
```

### 3. Sử dụng API services
```typescript
import { 
    accountService,
    serviceService,
    queueService 
} from '@modules/manager';

// Quản lý nhân sự
const accounts = await accountService.getAccounts();
await accountService.updateAccount({
    id: 'acc_001',
    name: 'Nguyễn Văn A',
    roles: ['STAFF'],
    status: 'ACTIVE'
});

// Quản lý dịch vụ
const services = await serviceService.getServices();
await serviceService.updateService({
    id: 'svc_001',
    name: 'Cấp giấy phép lái xe',
    status: 'ACTIVE',
    processingTime: 30
});

// Quản lý hàng đợi
const queueStatus = await queueService.getQueueStatus();
await queueService.updateQueuePriority({
    queueId: 'q_001',
    priority: 'HIGH'
});
```

### 4. Sử dụng Zustand stores
```typescript
import { 
    useAccountStore,
    useServiceStore,
    useQueueStore 
} from '@modules/manager';

function MyComponent() {
    const { accounts, setAccounts, updateAccount } = useAccountStore();
    const { services, setServices } = useServiceStore();
    const { queueStatus, setQueueStatus } = useQueueStore();

    // Use store methods...
}
```

### 5. Sử dụng Custom Hooks
```typescript
import { usePolling } from '@modules/manager/account/hooks';

function AccountList() {
    // Auto-refresh mỗi 2 giây
    const { data: accounts } = usePolling(
        accountService.getAccounts, 
        2000
    );

    return <AccountTable data={accounts} />;
}
```

## Mock Data

Module bao gồm dữ liệu giả để phát triển và testing:

- `MOCK_ACCOUNTS`: Danh sách nhân viên mẫu
- `MOCK_SERVICES`: Danh mục dịch vụ mẫu
- `MOCK_QUEUES`: Tình trạng hàng đợi mẫu
- `MOCK_DASHBOARD_STATS`: Thống kê dashboard

## API Integration

Để tích hợp với API thật, cập nhật các function trong các file API:

```typescript
// src/modules/manager/account/api/account.api.ts
import { http } from "@core/http/client";
import { API_PATH } from "@shared/const/api.path";

export const accountApi = {
    async getAccounts(filters?: AccountFilters) {
        const response = await http.get(API_PATH.MANAGER.ACCOUNT.LIST, {
            params: filters
        });
        return response.data;
    },

    async updateAccount(id: string, data: UpdateAccountRequest) {
        const response = await http.put(
            `${API_PATH.MANAGER.ACCOUNT.UPDATE}/${id}`,
            data
        );
        return response.data;
    }
};
```

## Tính năng nâng cao

### Real-time Monitoring
- WebSocket integration cho giám sát thời gian thực
- Auto-refresh dashboard mỗi 5 giây
- Push notifications cho các sự kiện quan trọng

### Performance Optimization
- Lazy loading cho danh sách dài
- Virtual scrolling cho 1000+ records
- Optimized re-renders với React.memo
- Efficient polling với usePolling hook

### Security & Permissions
- Role-based access control (RBAC)
- Permission validation cho từng action
- Audit logging cho tất cả thay đổi
- Secure API endpoints với authentication

### Data Management
- Optimistic updates cho UX tốt hơn
- Error handling và retry logic
- Data caching với TanStack Query
- Offline support với service workers

## Testing

```bash
# Chạy tests cho manager module
npm test -- src/modules/manager/

# Chạy E2E tests
npm run test:e2e -- --spec manager-dashboard.spec.ts

# Test coverage
npm run test:coverage -- src/modules/manager/
```

## Dependencies

- React 19
- Next.js 15
- Tailwind CSS v4
- Zustand (state management)
- TanStack Query (server state)
- Lucide React (icons)
- Recharts (charts & graphs)

## Contributing

1. Follow existing code style và conventions
2. Add TypeScript types cho tất cả props và functions
3. Include comprehensive error handling
4. Add unit tests cho new features
5. Update documentation và README
6. Ensure accessibility compliance
7. Test với different screen sizes
8. Validate với ESLint và Prettier

## Architecture Notes

### State Management
- **Global State**: Zustand stores cho cross-module data
- **Local State**: React useState cho component-specific state
- **Server State**: TanStack Query cho API data caching
- **Form State**: React Hook Form cho complex forms

### Performance Considerations
- **Code Splitting**: Dynamic imports cho large components
- **Memoization**: React.memo cho expensive components
- **Virtual Scrolling**: Cho large data tables
- **Debounced Search**: Cho search và filter operations

### Security Best Practices
- **Input Validation**: Client và server-side validation
- **XSS Protection**: Sanitize user inputs
- **CSRF Protection**: Token-based requests
- **Rate Limiting**: Prevent API abuse
