# Google Sheets Formulas cho Test Cases

## Đếm số Test Cases (bỏ qua Function Headers)

### Công thức 1: COUNTIF với pattern TC-*

```excel
=COUNTIF(A:A, "TC-*")
```

**Giải thích:**
- Đếm tất cả các ô trong cột A có giá trị bắt đầu bằng "TC-"
- Bỏ qua các dòng function headers như "FUNCTION A:", "FUNCTION B:", etc.

**Ví dụ:**
- ✅ Đếm: TC-LOGIN-001, TC-LOGIN-002, TC-GET-USER-001
- ❌ Bỏ qua: "FUNCTION A: Manager Login Success Cases"

---

### Công thức 2: COUNTIFS với nhiều điều kiện

```excel
=COUNTIFS(A:A, "TC-*", B:B, "<>")
```

**Giải thích:**
- Đếm các dòng có Test Case ID (TC-*) VÀ có mô tả (cột B không rỗng)
- Đảm bảo chỉ đếm các test case thực sự, không đếm headers trống

---

### Công thức 3: COUNTIF với REGEX (nếu Google Sheets hỗ trợ)

```excel
=COUNTIF(A:A, REGEXMATCH(A:A, "^TC-[A-Z]+-\d+$"))
```

**Giải thích:**
- Sử dụng REGEX để match pattern chính xác: TC-[CHỮ CÁI]-[SỐ]
- Ví dụ: TC-LOGIN-001, TC-GET-USER-001

---

### Công thức 4: SUMPRODUCT với điều kiện phức tạp

```excel
=SUMPRODUCT((LEFT(A:A, 3)="TC-")*1)
```

**Giải thích:**
- Kiểm tra 3 ký tự đầu tiên của mỗi ô = "TC-"
- Nhân với 1 để convert boolean thành số và tính tổng

---

## Đếm Test Cases theo Function/Module

### Đếm Test Cases trong một Function cụ thể

```excel
=COUNTIFS(A:A, "TC-LOGIN-*", B:B, "<>")
```

**Giải thích:**
- Đếm tất cả test cases có ID bắt đầu bằng "TC-LOGIN-"
- Bỏ qua các dòng trống

---

## Đếm Test Cases đã Pass/Fail/Pending

### Đếm Test Cases đã Pass trong Round 1

```excel
=COUNTIFS(A:A, "TC-*", F:F, "Passed")
```

**Giải thích:**
- Đếm các test case (TC-*) có status "Passed" trong cột F (Round 1)

---

### Đếm Test Cases đã Fail trong Round 1

```excel
=COUNTIFS(A:A, "TC-*", F:F, "Failed")
```

---

### Đếm Test Cases Pending trong Round 1

```excel
=COUNTIFS(A:A, "TC-*", F:F, "Pending")
```

---

## Tổng hợp Test Cases theo Round

### Tổng số Test Cases đã test trong Round 1

```excel
=COUNTIFS(A:A, "TC-*", F:F, "<>Pending", F:F, "<>N/A")
```

**Giải thích:**
- Đếm test cases không phải "Pending" và không phải "N/A"
- Tức là đã được test (Passed hoặc Failed)

---

## Ví dụ thực tế trong Test Report

### Cấu trúc Sheet:

| A | B | C | ... | F (Round 1) |
|---|---|---|-----|-------------|
| Test Case ID | Description | Procedure | ... | Status |
| FUNCTION A: Manager Login | | | | |
| TC-LOGIN-001 | Test login... | 1. Enter... | ... | Passed |
| TC-LOGIN-002 | Test login... | 1. Enter... | ... | Passed |
| FUNCTION B: Staff Login | | | | |
| TC-LOGIN-003 | Test login... | 1. Enter... | ... | Passed |

### Công thức trong Summary Section:

**Cell B4 (Number of TCs):**
```excel
=COUNTIF(A:A, "TC-*")
```
**Kết quả:** 3 (chỉ đếm TC-LOGIN-001, TC-LOGIN-002, TC-LOGIN-003)

**Cell C6 (Round 1 - Passed):**
```excel
=COUNTIFS(A:A, "TC-*", F:F, "Passed")
```
**Kết quả:** 3

**Cell D6 (Round 1 - Failed):**
```excel
=COUNTIFS(A:A, "TC-*", F:F, "Failed")
```
**Kết quả:** 0

**Cell E6 (Round 1 - Pending):**
```excel
=COUNTIFS(A:A, "TC-*", F:F, "Pending")
```
**Kết quả:** 0

---

## Lưu ý

1. **Wildcard `*`**: Chỉ hoạt động với `COUNTIF`, không hoạt động với `COUNTIFS` pattern matching
2. **Case-sensitive**: Google Sheets mặc định không phân biệt hoa thường
3. **Empty cells**: Các ô trống sẽ không match pattern "TC-*"
4. **Performance**: Với dữ liệu lớn, nên giới hạn phạm vi (ví dụ: A12:A1000 thay vì A:A)

---

## Công thức nâng cao: Đếm với Array Formula

```excel
=SUMPRODUCT((LEFT(A12:A1000, 3)="TC-")*1)
```

**Giải thích:**
- Chỉ đếm trong phạm vi A12:A1000 (bỏ qua header)
- Hiệu quả hơn với dữ liệu lớn

