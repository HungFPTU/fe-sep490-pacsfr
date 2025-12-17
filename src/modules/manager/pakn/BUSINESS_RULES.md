# PAKN Business Rules - Manager & Staff

## Tổng quan

Module PAKN (Phản ánh kiến nghị) có 2 role chính với các quyền và flow xử lý khác nhau:

- **Manager**: Quản lý toàn bộ PAKN, phân công staff, và cập nhật status
- **Staff**: Xử lý PAKN được phân công, cập nhật status theo quy trình

## Status Flow Diagram

```
┌─────────────────┐
│ CHO_TIEP_NHAN   │ (Chờ tiếp nhận)
│  (Chờ tiếp nhận)│
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│ DA_TIEP_NHAN    │  │ TU_CHOI      │
│ (Đã tiếp nhận)  │  │ (Từ chối)    │
└────────┬────────┘  └──────────────┘
         │              [FINAL]
         │
         ▼
┌─────────────────┐
│ DANG_XU_LY      │ (Đang xử lý)
│ (Đang xử lý)    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│ DA_TRA_LOI      │  │ TU_CHOI      │
│ (Đã trả lời)    │  │ (Từ chối)    │
└────────┬────────┘  └──────────────┘
         │              [FINAL]
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│ HOAN_THANH      │  │ DANG_XU_LY   │
│ (Hoàn thành)    │  │ (Quay lại)   │
└─────────────────┘  └──────────────┘
   [FINAL]
```

## Manager Status Transitions

### Quyền của Manager:

Manager có thể chuyển đổi status theo các quy tắc sau:

| Từ Status       | Có thể chuyển sang         | Mô tả                                                 |
| --------------- | -------------------------- | ----------------------------------------------------- |
| `CHO_TIEP_NHAN` | `DA_TIEP_NHAN`, `TU_CHOI`  | Tiếp nhận hoặc từ chối ngay                           |
| `DA_TIEP_NHAN`  | `DANG_XU_LY`, `TU_CHOI`    | Chuyển sang xử lý (sau khi assign staff) hoặc từ chối |
| `DANG_XU_LY`    | `DA_TRA_LOI`, `TU_CHOI`    | Chuyển sang đã trả lời hoặc từ chối                   |
| `DA_TRA_LOI`    | `HOAN_THANH`, `DANG_XU_LY` | Hoàn thành hoặc quay lại xử lý                        |
| `TU_CHOI`       | -                          | **Final state** - Không thể thay đổi                  |
| `HOAN_THANH`    | -                          | **Final state** - Không thể thay đổi                  |

### Ví dụ Flow Manager:

1. **Nhận PAKN mới**: `CHO_TIEP_NHAN` → `DA_TIEP_NHAN` (tiếp nhận)
2. **Phân công Staff**: `DA_TIEP_NHAN` → `DANG_XU_LY` (sau khi assign)
3. **Staff xử lý xong**: `DANG_XU_LY` → `DA_TRA_LOI` (tự động hoặc Manager cập nhật)
4. **Hoàn thành**: `DA_TRA_LOI` → `HOAN_THANH`

### Trường hợp từ chối:

- Manager có thể từ chối ở bất kỳ giai đoạn nào (trừ `HOAN_THANH` và `TU_CHOI`)
- Từ chối là trạng thái cuối cùng, không thể thay đổi

## Staff Status Transitions

### Quyền của Staff:

Staff (sau khi được assign) chỉ có thể chuyển đổi status theo các quy tắc sau:

| Từ Status       | Có thể chuyển sang         | Mô tả                                     |
| --------------- | -------------------------- | ----------------------------------------- |
| `CHO_TIEP_NHAN` | -                          | **Không thể xử lý** - Chưa được phân công |
| `DA_TIEP_NHAN`  | `DANG_XU_LY`               | Bắt đầu xử lý PAKN được phân công         |
| `DANG_XU_LY`    | `DA_TRA_LOI`, `TU_CHOI`    | Trả lời hoặc từ chối nếu không thể xử lý  |
| `DA_TRA_LOI`    | `HOAN_THANH`, `DANG_XU_LY` | Hoàn thành hoặc quay lại xử lý nếu cần    |
| `TU_CHOI`       | -                          | **Final state** - Không thể thay đổi      |
| `HOAN_THANH`    | -                          | **Final state** - Không thể thay đổi      |

### Ví dụ Flow Staff:

1. **Nhận PAKN được phân công**: `DA_TIEP_NHAN` → `DANG_XU_LY` (bắt đầu xử lý)
2. **Xử lý xong**: `DANG_XU_LY` → `DA_TRA_LOI` (đã trả lời)
3. **Hoàn thành**: `DA_TRA_LOI` → `HOAN_THANH`

### Lưu ý:

- Staff **KHÔNG THỂ** xử lý PAKN ở trạng thái `CHO_TIEP_NHAN` (chưa được phân công)
- Staff chỉ có thể xử lý PAKN đã được Manager assign (status `DA_TIEP_NHAN` trở đi)
- Staff có thể từ chối nếu không thể xử lý (`DANG_XU_LY` → `TU_CHOI`)
