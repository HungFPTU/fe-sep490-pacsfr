# Queue API Integration - Staff Dashboard

## Tổng quan

Tài liệu này mô tả việc tích hợp 2 API mới vào trang Staff Dashboard để quản lý hàng đợi theo thời gian thực:

1. **Queue Status API**: Lấy trạng thái hàng đợi của quầy
2. **Call Next API**: Gọi số tiếp theo trong hàng đợi

## API Endpoints

### 1. Queue Status API

**Endpoint**: `GET /Queue/status/{queueId}`

**Response**:
```json
{
  "$id": "1",
  "success": true,
  "data": {
    "$id": "2",
    "queueName": "Nhóm dịch vụ 3",
    "messageCount": 5,
    "consumerCount": 1
  }
}
```

**Mô tả**:
- `queueName`: Tên nhóm dịch vụ/hàng đợi
- `messageCount`: Số lượng ticket đang chờ trong hàng đợi
- `consumerCount`: Số lượng consumer đang xử lý

### 2. Call Next API

**Endpoint**: `POST /api/Queue/{queueId}/call-next`

**Success Response** (200):
```json
{
  "$id": "1",
  "success": true,
  "data": {
    "ticketNumber": "A001",
    "citizenName": "Nguyễn Văn A",
    "serviceType": "Cấp giấy phép"
  }
}
```

**Error Response** (400):
```json
{
  "$id": "1",
  "success": false,
  "message": "No tickets in queue"
}
```

## Cấu trúc Code

### 1. API Paths (src/core/config/api.path.ts)

```typescript
STAFF: {
    DASHBOARD: {
        QUEUE_STATUS: (queueId: string) => `/Queue/status/${queueId}`,
        CALL_NEXT: (queueId: string) => `/api/Queue/${queueId}/call-next`,
    }
}
```

### 2. Types (src/modules/staff/dashboard/types.ts)

```typescript
export type QueueStatus = {
    queueName: string;
    messageCount: number;
    consumerCount: number;
};

export type CallNextResponse = {
    success: boolean;
    message?: string;
    data?: {
        ticketNumber?: string;
        citizenName?: string;
        serviceType?: string;
    };
};
```

### 3. API Functions (src/modules/staff/dashboard/api/staff-dashboard.api.ts)

```typescript
// Get queue status
async getQueueStatus(queueId: string): Promise<QueueStatusResponse>

// Call next ticket
async callNext(queueId: string): Promise<CallNextResponse>
```

### 4. Service Layer (src/modules/staff/dashboard/services/staff-dashboard.service.ts)

```typescript
// Get queue status với error handling
async getQueueStatus(queueId: string): Promise<QueueStatus>

// Call next với error handling và message tiếng Việt
async callNext(queueId: string): Promise<CallNextResponse>
```

### 5. Store (src/modules/staff/dashboard/stores/useStaffDashboardStore.ts)

**New State**:
- `queueId`: Queue ID hiện tại (được persist trong localStorage)
- `queueStatus`: Trạng thái hàng đợi
- `isLoadingQueueStatus`: Loading state cho queue status
- `isCallingNext`: Loading state cho call next

**New Actions**:
- `setQueueId(queueId)`: Lưu queue ID
- `setQueueStatus(status)`: Cập nhật queue status
- `setLoadingQueueStatus(loading)`: Set loading state
- `setCallingNext(calling)`: Set calling state

## Sử dụng trong Component

### 1. Cấu hình Queue ID

Staff cần cấu hình Queue ID trước khi sử dụng:

```typescript
// Nhấn nút "Cấu hình Queue" để hiển thị form
// Nhập Queue ID (VD: 760de1fc-028a-46bb-92ef-b9e42f7e11bb)
// Nhấn "Lưu Queue ID"
```

Queue ID sẽ được lưu vào localStorage và persist giữa các session.

### 2. Hiển thị Queue Status

Queue status được hiển thị ở:
- **Header**: Tên queue và số lượng ticket đang chờ
- **Stats Card**: Số lượng ticket đang chờ (cập nhật real-time)

### 3. Auto-refresh

Queue status được tự động refresh mỗi 10 giây để đảm bảo dữ liệu luôn mới nhất.

### 4. Gọi Số Tiếp Theo

```typescript
// Nhấn nút "Gọi số tiếp theo"
// - Disabled nếu chưa có Queue ID
// - Disabled nếu messageCount === 0 (không có ticket)
// - Hiển thị loading state khi đang gọi
// - Alert success với ticket number sau khi gọi thành công
// - Alert error nếu có lỗi (VD: "Không có số nào trong hàng đợi")
```

## Error Handling

### 1. Không có Queue ID

```
Alert: "Vui lòng cấu hình Queue ID trước!"
```

### 2. Không có ticket trong queue

```
Alert: "Không có số nào trong hàng đợi"
Button disabled với tooltip: "Không có ticket trong hàng đợi"
```

### 3. API Error

```
Console error + Alert với message từ API
```

## Testing

### Test với Mock Data

1. Nhập Queue ID: `760de1fc-028a-46bb-92ef-b9e42f7e11bb`
2. Kiểm tra Queue Status hiển thị đúng
3. Thử gọi số tiếp theo
4. Kiểm tra error handling khi không có ticket

### Test với Real API

1. Đảm bảo backend đang chạy
2. Cấu hình Queue ID từ backend
3. Test full flow: Queue Status → Call Next → Update Status

## Future Improvements

1. **Auto-assign Queue ID**: Lấy Queue ID tự động từ WorkShift khi staff check-in
2. **Real-time Updates**: Sử dụng WebSocket thay vì polling
3. **Queue History**: Hiển thị lịch sử các số đã gọi
4. **Multi-queue Support**: Hỗ trợ staff quản lý nhiều queue cùng lúc
5. **Analytics**: Thống kê hiệu suất xử lý queue

## Related Files

- `src/core/config/api.path.ts` - API paths
- `src/modules/staff/dashboard/types.ts` - Type definitions
- `src/modules/staff/dashboard/api/staff-dashboard.api.ts` - API functions
- `src/modules/staff/dashboard/services/staff-dashboard.service.ts` - Business logic
- `src/modules/staff/dashboard/stores/useStaffDashboardStore.ts` - State management
- `src/modules/staff/dashboard/components/StaffDashboard.tsx` - UI Component

## Notes

- Queue ID hiện tại được lưu trong localStorage với key `staff-dashboard-storage`
- Auto-refresh interval: 10 seconds
- Error messages được hiển thị bằng tiếng Việt
- Button states được quản lý để tránh duplicate calls

