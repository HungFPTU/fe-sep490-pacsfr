# HƯỚNG DẪN LUỒNG NGHỈ PHÉP, PHÂN CÔNG & CHẤM CÔNG

## Mục tiêu
FE có thể tích hợp đầy đủ quy trình:
1. Nhân viên (Staff) xin nghỉ
2. Quản lý (Manager) duyệt / từ chối, tìm người thay thế nếu đã có ca phân công
3. Lập lịch ca (WorkShift) & gán nhân viên
4. Nhân viên chấm công (Check-In / Check-Out) đúng cửa sổ cho phép
5. Trạng thái ca cập nhật xuyên suốt

---
## Thuật ngữ & Entity chính
| Entity | Vai trò |
|--------|---------|
| WorkShift | Định nghĩa một ca làm việc (Ngày, giờ bắt đầu, giờ kết thúc) |
| StaffWorkShift | Bản ghi gán nhân viên vào WorkShift + trạng thái |
| LeaveRequest | Đơn xin nghỉ của nhân viên (thời gian từ - đến) |

### Trạng thái LeaveRequest
- Pending: chờ duyệt
- Approved: đã duyệt (có thể kèm ReplacementStaffId nếu cần thay thế)
- Rejected: bị từ chối

### Trạng thái StaffWorkShift
- Scheduled: đã phân công nhưng chưa đến giờ làm
- Working: nhân viên đã Check-In trong cửa sổ hợp lệ
- Completed: nhân viên đã Check-Out
- (Có thể mở rộng sau: Absent, Cancelled nếu cần)

---
## 1. LUỒNG XIN NGHỈ (STAFF)
### 1.1 Tạo đơn nghỉ
POST `api/LeaveRequest`
Body (CreateLeaveRequestDto):
```json
{
  "staffId": "<guid>",              // hoặc lấy từ token phía BE
  "fromDate": "2025-12-05",         // Ngày bắt đầu nghỉ (ISO date)
  "toDate": "2025-12-07",           // Ngày kết thúc nghỉ (bao gồm)
  "reason": "Nghỉ ốm"
}
```
Điều kiện business:
- Tổng số ngày nghỉ đã approved trong năm + (toDate - fromDate + 1) <= 48
- Không tạo đơn trùng khoảng với đơn Pending / Approved trước đó

Phản hồi (ApiResponse<LeaveRequestDto>):
```json
{
  "success": true,
  "message": "Created",
  "data": {
    "id": "guid",
    "staffId": "guid",
    "fromDate": "2025-12-05",
    "toDate": "2025-12-07",
    "status": "Pending",
    "reason": "Nghỉ ốm"
  }
}
```

### 1.2 Xem danh sách đơn nghỉ của tôi
GET `api/LeaveRequest/my?Page=1&PageSize=10&Status=Pending|Approved|Rejected`
- Dùng claim `uid` để xác định staffId server side.

### 1.3 Hủy / Sửa đơn nghỉ
(Chưa triển khai endpoint sửa/hủy; FE hiển thị Pending và cho phép user chờ quyết định hoặc đề xuất tính năng mới.)

---
## 2. QUẢN LÝ XỬ LÝ ĐƠN NGHỈ (MANAGER)
### 2.1 Danh sách tất cả đơn nghỉ
GET `api/LeaveRequest?Page=1&PageSize=20&Status=Pending`
Có thể filter thêm theo StaffId, Date range tùy DTO (`FilterLeaveRequestDto`).

### 2.2 Lấy chi tiết đơn nghỉ
GET `api/LeaveRequest/{id}`

### 2.3 Tìm nhân viên thay thế (nếu đơn nhân viên đã có ca trong khoảng nghỉ)
GET `api/LeaveRequest/{leaveRequestId}/available-replacements`
Phản hồi: Danh sách `AvailableStaffDto`:
```json
[
  {
    "staffId": "guid",
    "fullName": "Nguyễn Văn A",
    "availableReason": "Free in all overlapping shifts" // hoặc logic cụ thể
  }
]
```
(FE hiển thị để manager chọn 1 người nếu cần.)

### 2.4 Duyệt đơn nghỉ
POST `api/LeaveRequest/approve`
Body (`ApproveLeaveRequestDto`):
```json
{
  "leaveRequestId": "guid",
  "replacementStaffId": "guid" // optional; chỉ cần nếu có ca bị ảnh hưởng
}
```
Business khi duyệt:
- Kiểm tra đơn còn Pending
- Nếu trong khoảng nghỉ có StaffWorkShift đã Scheduled → nếu có replacementStaffId: gán những ca đó sang replacement; nếu không: báo lỗi yêu cầu chọn replacement.
- Cập nhật LeaveRequest.Status = Approved
- Tránh gán replacement vượt quá giới hạn 10 ca / tuần (service đã kiểm)

### 2.5 Từ chối đơn nghỉ
POST `api/LeaveRequest/reject`
Body (`RejectLeaveRequestDto`):
```json
{
  "leaveRequestId": "guid",
  "reason": "Thiếu nhân sự thay thế"
}
```
Kết quả: Status = Rejected. Không thay đổi ca.

---
## 3. LẬP LỊCH & PHÂN CÔNG CA (MANAGER)
### 3.1 Tạo WorkShift trước
(Endpoint giả định đã tồn tại, ví dụ: POST `api/WorkShift`)
```json
{
  "shiftDate": "2025-12-10",
  "startTime": "08:00:00",
  "endTime": "12:00:00"
}
```

### 3.2 Gán nhân viên vào ca
POST `api/StaffWorkShift`
```json
{
  "staffId": "guid",
  "workShiftId": "guid"
}
```
Validation trong service:
- Không vượt quá 10 ca trong tuần (Thứ 2 - Thứ 7)
- Nhân viên không thuộc đơn nghỉ Approved trùng ngày ca
- Không trùng WorkShift đã được assign (mỗi StaffWorkShift là 1 mapping)

### 3.3 Xem danh sách ca theo nhân viên
GET `api/StaffWorkShift/by-staff/{staffId}`

Chi tiết phản hồi gồm trạng thái, thời gian check-in/out nếu có.

---
## 4. CHẤM CÔNG (STAFF)
### 4.1 Check-In
POST `api/StaffWorkShift/{id}/check-in`
Business rule:
- Chỉ cho phép từ (WorkShift.StartTime - 30 phút) đến đúng StartTime.
- Nếu quá giờ bắt đầu → không cho Check-In (có thể bổ sung late policy sau).
- Chuyển trạng thái từ Scheduled -> Working, lưu `CheckInTime`.

Phản hồi ví dụ:
```json
{
  "success": true,
  "data": {
    "id": "guid",
    "status": "Working",
    "checkInTime": "2025-12-10T07:40:12Z"
  }
}
```

### 4.2 Check-Out
POST `api/StaffWorkShift/{id}/check-out`
Business rule:
- Chỉ gọi khi trạng thái hiện tại = Working
- Lưu `CheckOutTime`, chuyển trạng thái -> Completed
- Không kiểm tra thời lượng tối thiểu (có thể thêm sau)

Phản hồi ví dụ:
```json
{
  "success": true,
  "data": {
    "id": "guid",
    "status": "Completed",
    "checkOutTime": "2025-12-10T12:05:02Z"
  }
}
```

---
## 5. SƠ ĐỒ TRẠNG THÁI TÓM TẮT
### LeaveRequest
Pending -> Approved (có/không replacement) | -> Rejected

### StaffWorkShift
Scheduled -> Working (Check-In hợp lệ) -> Completed (Check-Out)
(Absent/Late: CHƯA IMPLEMENT)

---
## 6. EDGE CASES QUAN TRỌNG
| Case | Xử lý |
|------|-------|
| Staff tạo đơn nghỉ trùng với đơn Pending trước đó | Reject create với message phù hợp |
| Manager approve đơn nghỉ nhưng không chọn replacement khi có ca | Trả về lỗi yêu cầu replacementStaffId |
| Replacement vượt giới hạn 10 ca / tuần | Reject approve với message giới hạn tuần |
| Staff cố gắng check-in sớm > 30 phút | Reject với thông báo "Quá sớm" |
| Staff check-in sau giờ bắt đầu | Reject với thông báo "Đã quá giờ check-in" |
| Staff check-out khi chưa check-in | Reject (status not Working) |
| FE quên gửi token chứa claim uid | 401 Unauthorized |

---
## 7. GỢI Ý TÍCH HỢP FE
### 7.1 Staff Dashboard
- Gọi `api/StaffWorkShift/by-staff/{myId}` để load ca hôm nay.
- Hiển thị nút Check-In khi nằm trong cửa sổ cho phép (hãy so sánh client time & server time trả về, ưu tiên server time).

### 7.2 Leave Request UI
- Form tạo: date range picker + lý do
- List: trạng thái badge (Pending vàng, Approved xanh, Rejected đỏ)
- Chi tiết: nếu Approved và có replacement hiển thị tên replacement.

### 7.3 Manager Console
- Bảng đơn nghỉ Pending: actions Approve / Reject
- Khi Approve: gọi endpoint lấy available replacements trước -> modal chọn nhân viên -> gửi approve.
- Bảng ca: highlight những ca bị ảnh hưởng bởi đơn nghỉ vừa duyệt.

### 7.4 Error Handling chuẩn hóa
Dựa trên `ApiResponse<T>`:
```ts
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}
```
FE: nếu `!success` -> show toast với `message`.

---
## 8. ROADMAP MỞ RỘNG (TÙY CHỌN SAU)
- Late Check-In window (ví dụ cho phép đến +10 phút với cờ "Late")
- Absent auto-mark nếu quá giờ không check-in
- Ca nhiều nhân viên (multi-staff shift)
- Thống kê số ngày nghỉ theo tháng
- Báo cáo work hours (từ CheckInTime-CheckOutTime)

---
## 9. KIỂM TRA NHANH
Checklist FE trước khi gọi:
- Token có claim uid? (Staff endpoints)
- Timezone đồng bộ (sử dụng UTC hoặc convert server time về local)
- Đảm bảo không gọi Approve nếu chưa tải danh sách replacements khi có ca trùng

---
## 10. TÀI LIỆU LIÊN QUAN
- `LeaveRequestController.cs`
- `StaffWorkShiftController.cs`
- `StaffWorkShiftService` (rule check-in/out, weekly cap)
- `LeaveRequestService` (approve logic + replacement)

---
## 11. SAMPLE FLOW E2E
1. Manager tạo WorkShift ngày 10/12 sáng
2. Manager gán Staff A vào ca → StaffWorkShift (Scheduled)
3. Staff A xin nghỉ 10–12/12 (Pending)
4. Manager mở đơn → thấy ca bị ảnh hưởng → lấy replacements
5. Manager chọn Staff B → Approve leave (ca chuyển qua B)
6. Đến 10/12 07:40 Staff B check-in (Working)
7. 12:05 Staff B check-out (Completed)

---
## 12. LIÊN HỆ VÀ LOG
- Nếu migrate chưa áp dụng → ca và leave có thể lỗi do thiếu bảng/column.
- Log phê duyệt lưu trong service (có thể thêm Audit sau).

---
Tài liệu này nhằm giúp FE triển khai nhanh UI/flow mà không cần đọc toàn bộ code backend.
