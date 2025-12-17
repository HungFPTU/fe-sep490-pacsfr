# API Guide - Shift Swap (Đổi Ca Làm Việc)

**Ngày:** 03/12/2024  
**Dành cho:** Frontend Team

---

## 🔄 Luồng Chức Năng

```
1. Staff A tạo yêu cầu đổi ca
   ↓
2. Staff B xem và phản hồi (chấp nhận/từ chối)
   ↓ (nếu chấp nhận)
3. Manager xem và duyệt (chấp nhận/từ chối)
   ↓ (nếu duyệt)
4. Hệ thống tự động hoán đổi ca làm việc
```

---

## 📋 Status Code

| Code | Tên | Ý nghĩa |
|------|-----|---------|
| 0 | PendingTargetResponse | Chờ Staff B phản hồi |
| 1 | PendingManagerApproval | Chờ Manager duyệt |
| 2 | Approved | Đã duyệt (đổi ca thành công) |
| 3 | RejectedByTarget | Staff B từ chối |
| 4 | RejectedByManager | Manager từ chối |
| 5 | Cancelled | Staff A hủy yêu cầu |

---

## 🚀 API Endpoints

### 1. Tạo Yêu Cầu Đổi Ca

**Staff A gửi yêu cầu đổi ca với Staff B**

```http
POST /api/ShiftSwapRequest
```

**Body:**
```json
{
  "myStaffWorkShiftId": "guid",          // Ca của mình
  "targetStaffId": "guid",               // Staff muốn đổi
  "targetStaffWorkShiftId": "guid",      // Ca của người đó (optional)
  "reason": "Lý do đổi ca"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Swap request created successfully",
  "data": {
    "id": "guid",
    "status": 0,  // PendingTargetResponse
    "requestingStaffName": "Nguyễn Văn A",
    "targetStaffName": "Trần Thị B"
  }
}
```

---

### 2. Xem Yêu Cầu Của Tôi

**Staff xem các yêu cầu liên quan đến mình (gửi hoặc nhận)**

```http
GET /api/ShiftSwapRequest/my-requests?status=0
```

**Query Params:**
- `status` (optional): Lọc theo trạng thái (0-5)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "guid",
      "requestingStaffName": "Nguyễn Văn A",
      "targetStaffName": "Trần Thị B",
      "status": 0,
      "reason": "Có việc gia đình",
      "requestingShiftDate": "2024-12-10",
      "targetShiftDate": "2024-12-10"
    }
  ]
}
```

---

### 3. Staff B Phản Hồi

**Chấp nhận hoặc từ chối yêu cầu**

```http
POST /api/ShiftSwapRequest/{id}/respond
```

**Body:**
```json
{
  "shiftSwapRequestId": "guid",
  "accept": true,                         // true = chấp nhận, false = từ chối
  "rejectionReason": "Lý do từ chối"     // Bắt buộc nếu accept=false
}
```

**Response (accept=true):**
```json
{
  "success": true,
  "message": "Swap request accepted, waiting for manager approval",
  "data": {
    "status": 1,  // PendingManagerApproval
    "targetStaffAccepted": true
  }
}
```

**Response (accept=false):**
```json
{
  "success": true,
  "message": "Swap request rejected",
  "data": {
    "status": 3,  // RejectedByTarget
    "rejectionReason": "Đã có lịch khác"
  }
}
```

---

### 4. Manager Xem Danh Sách Chờ Duyệt

```http
GET /api/ShiftSwapRequest?status=1&page=1&size=10
```

**Query Params:**
- `status` (optional): Lọc theo trạng thái
- `requestingStaffId` (optional): Lọc theo staff gửi
- `targetStaffId` (optional): Lọc theo staff nhận
- `fromDate`, `toDate` (optional): Lọc theo ngày tạo
- `page`, `size`: Phân trang

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "guid",
        "requestingStaffName": "Nguyễn Văn A",
        "targetStaffName": "Trần Thị B",
        "status": 1,
        "requestingShiftDate": "2024-12-10",
        "reason": "Có việc gia đình"
      }
    ],
    "total": 5,
    "page": 1,
    "size": 10
  }
}
```

---

### 5. Manager Duyệt/Từ Chối

```http
POST /api/ShiftSwapRequest/{id}/approve
```

**Body:**
```json
{
  "shiftSwapRequestId": "guid",
  "approve": true,                        // true = duyệt, false = từ chối
  "rejectionReason": "Lý do từ chối"     // Bắt buộc nếu approve=false
}
```

**Response (approve=true):**
```json
{
  "success": true,
  "message": "Swap request approved and shifts swapped successfully",
  "data": {
    "status": 2,  // Approved - Đã hoán đổi ca
    "processedAt": "2024-12-03T11:00:00Z"
  }
}
```

**Response (approve=false):**
```json
{
  "success": true,
  "message": "Swap request rejected",
  "data": {
    "status": 4,  // RejectedByManager
    "rejectionReason": "Không đủ nhân sự"
  }
}
```

---

### 6. Hủy Yêu Cầu

**Staff A hủy yêu cầu của mình (chỉ khi status = 0 hoặc 1)**

```http
POST /api/ShiftSwapRequest/{id}/cancel
```

**Response:**
```json
{
  "success": true,
  "message": "Swap request cancelled successfully",
  "data": true
}
```

---

### 7. Xem Chi Tiết Yêu Cầu

```http
GET /api/ShiftSwapRequest/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "guid",
    "requestingStaffId": "guid",
    "requestingStaffName": "Nguyễn Văn A",
    "requestingStaffCode": "NV001",
    "requestingShiftDate": "2024-12-10",
    "requestingShiftType": "Morning",
    "requestingShiftStartTime": "08:00:00",
    "requestingShiftEndTime": "16:00:00",
    
    "targetStaffId": "guid",
    "targetStaffName": "Trần Thị B",
    "targetStaffCode": "NV002",
    "targetShiftDate": "2024-12-10",
    "targetShiftType": "Afternoon",
    "targetShiftStartTime": "13:00:00",
    "targetShiftEndTime": "21:00:00",
    
    "reason": "Có việc gia đình",
    "status": 1,
    "targetStaffAccepted": true,
    "targetStaffRespondedAt": "2024-12-03T10:30:00Z",
    
    "approvedBy": null,
    "processedAt": null,
    "rejectionReason": null,
    
    "createdAt": "2024-12-03T09:00:00Z"
  }
}
```

---

## ❌ Các Lỗi Thường Gặp

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| "Cannot swap shift with yourself" | Đổi ca với chính mình | Chọn staff khác |
| "Staff must have at least one matching service group" | Không cùng nhóm dịch vụ | Chọn staff cùng nhóm |
| "A pending swap request already exists" | Ca này đã có yêu cầu đang chờ | Hủy yêu cầu cũ trước |
| "Only target staff can respond" | Người phản hồi không đúng | Chỉ Staff B mới phản hồi được |
| "Only managers can approve" | Không phải manager | Chỉ manager mới duyệt được |
| "Can only cancel pending requests" | Yêu cầu đã xử lý xong | Không thể hủy nữa |
| "Your shift not found" | Shift ID không tồn tại | Kiểm tra lại ID |
| "Shifts must be on the same date" | Ca không cùng ngày | Chỉ đổi ca cùng ngày |

---

## 📝 Notes cho Frontend

### 1. Hiển thị Status
```javascript
const statusLabels = {
  0: { text: 'Chờ phản hồi', color: 'warning' },
  1: { text: 'Chờ duyệt', color: 'info' },
  2: { text: 'Đã duyệt', color: 'success' },
  3: { text: 'Bị từ chối', color: 'error' },
  4: { text: 'Manager từ chối', color: 'error' },
  5: { text: 'Đã hủy', color: 'default' }
};
```

### 2. Validation trước khi gọi API
- ✅ `myStaffWorkShiftId` không được trống
- ✅ `targetStaffId` không được trống
- ✅ `targetStaffId` khác với staff hiện tại
- ✅ Ca làm việc phải có status = "Scheduled" (0)
- ✅ `reason` không được trống

### 3. Phân quyền
- **Staff thường:**
  - Tạo yêu cầu đổi ca (của mình)
  - Xem yêu cầu của mình
  - Phản hồi yêu cầu (nếu là target staff)
  - Hủy yêu cầu (nếu là requesting staff)

- **Manager:**
  - Xem tất cả yêu cầu
  - Duyệt/từ chối yêu cầu

### 4. Real-time Updates
Nên polling hoặc dùng SignalR để cập nhật:
- Khi có yêu cầu mới → Notify target staff
- Khi target staff phản hồi → Notify requesting staff + manager
- Khi manager duyệt → Notify cả 2 staff

### 5. UI Suggestions
- Hiển thị badge số lượng yêu cầu chờ xử lý
- Calendar view: highlight các ca có thể đổi
- Form tạo yêu cầu: Suggest staff phù hợp (cùng service group)
- Timeline hiển thị lịch sử xử lý yêu cầu

---

## 🔍 Example Flow (React/Vue)

```javascript
// 1. Staff A tạo yêu cầu
const createSwapRequest = async (myShiftId, targetStaffId, targetShiftId, reason) => {
  const response = await axios.post('/api/ShiftSwapRequest', {
    myStaffWorkShiftId: myShiftId,
    targetStaffId: targetStaffId,
    targetStaffWorkShiftId: targetShiftId,
    reason: reason
  });
  
  if (response.data.success) {
    showNotification('Đã gửi yêu cầu đổi ca');
  }
};

// 2. Staff B xem và phản hồi
const respondToRequest = async (requestId, accept, rejectionReason) => {
  const response = await axios.post(`/api/ShiftSwapRequest/${requestId}/respond`, {
    shiftSwapRequestId: requestId,
    accept: accept,
    rejectionReason: accept ? null : rejectionReason
  });
  
  if (response.data.success) {
    showNotification(accept ? 'Đã chấp nhận yêu cầu' : 'Đã từ chối yêu cầu');
    refreshMyRequests();
  }
};

// 3. Manager duyệt
const approveRequest = async (requestId, approve, rejectionReason) => {
  const response = await axios.post(`/api/ShiftSwapRequest/${requestId}/approve`, {
    shiftSwapRequestId: requestId,
    approve: approve,
    rejectionReason: approve ? null : rejectionReason
  });
  
  if (response.data.success && approve) {
    showNotification('Đã duyệt. Ca làm việc đã được hoán đổi!');
    refreshPendingRequests();
  }
};
```

---

**Last Updated:** 03/12/2024  
**Contact:** Backend Team nếu có thắc mắc
