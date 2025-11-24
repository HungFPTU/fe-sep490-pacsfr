# Hướng Dẫn Export Test Cases ra Excel

## Tổng Quan

Script này tự động export test cases từ các file `.test.ts` sang Excel file với format giống như template Excel của bạn.

## Cách Sử Dụng

### 1. Chạy Script Export

```bash
bun run test:export
```

Script sẽ:
- Tìm tất cả file test trong `src/test/generated/*-complete.test.ts`
- Parse JSDoc comments để extract test case information
- Tạo Excel file với format đúng như template
- Export ra folder `docs/` với tên file: `test-report-{feature-name}.xlsx`

### 2. Output Files

Excel files sẽ được tạo tại:
```
docs/
├── test-report-user-login.xlsx
├── test-report-get-current-user-info.xlsx
├── test-report-get-case-by-id.xlsx
└── ...
```

## Format Excel Output

### Summary Section (Rows 1-9)
- **Row 2**: Feature name
- **Row 3**: Test requirement (placeholder)
- **Row 4**: Number of TCs (tự động đếm)
- **Row 5**: Testing Round headers (Passed, Failed, Pending, N/A)
- **Row 6-8**: Testing Rounds (mặc định: 0, 0, 0, 0)

### Test Cases Section (Row 10+)
- **Row 10**: Column headers (green background, white text)
  - Test Case ID
  - Test Case Description
  - Test Case Procedure
  - Expected Results
  - Pre-conditions
  - Round 1, Test date, Tester
  - Round 2, Test date, Tester
  - Round 3, Test date, Tester
  - Note

- **Test Cases**: Grouped by category (FUNCTION headers)
  - Category rows: Light blue background
  - Test case rows: White background
  - Status mặc định: "Pending" cho tất cả rounds

## Cấu Trúc Test File Cần Có

Để script hoạt động đúng, test file cần có format như sau:

```typescript
/**
 * Complete Test Cases cho [Function Name]
 * ...
 * Feature: [Feature Name]
 * Function: [Function Name]
 * Pre-condition: [Pre-condition]
 * Number of TCs: [Number]
 */

describe('...', () => {
  // ============================================
  // FUNCTION: [Category Name]
  // ============================================

  /**
   * Test Case ID: TC-XXX-001
   * Function: [Function Name]
   * Test Case Description (EN): [Description]
   * Test Case Description (VI): [Mô tả]
   * 
   * Pre-conditions (EN): [Pre-condition]
   * Pre-conditions (VI): [Điều kiện]
   * 
   * Test Case Procedure:
   *   1. Step 1
   *   2. Step 2
   *   3. Step 3
   * 
   * Expected Results (EN): [Expected]
   * Expected Results (VI): [Kết quả mong đợi]
   */
  it('TC-XXX-001: Test name / Tên test', async () => {
    // Test implementation
  });
});
```

## Các Field Được Extract

Script sẽ tự động extract các thông tin sau từ JSDoc comments:

1. **Test Case ID**: `TC-XXX-001`
2. **Description**: Lấy từ `Test Case Description (VI)` hoặc `(EN)`
3. **Procedure**: Lấy từ `Test Case Procedure`
4. **Expected Results**: Lấy từ `Expected Results (VI)` hoặc `(EN)`
5. **Pre-conditions**: Lấy từ `Pre-conditions (VI)` hoặc `(EN)`
6. **Category**: Lấy từ `FUNCTION: [Category Name]` comment

## Ví Dụ

### Input: Test File
```typescript
/**
 * Feature: Get Case By ID
 * Function: 4. Lấy thông tin chi tiết hồ sơ theo ID
 * Number of TCs: 14
 */

describe('Case - Get Case By ID', () => {
  // FUNCTION: Get Case By ID - Success Cases (Staff)

  /**
   * Test Case ID: TC-CASE-001
   * Test Case Description (VI): Kiểm tra lấy thông tin hồ sơ theo ID thành công cho Staff
   * Test Case Procedure:
   *   1. Staff user logged in successfully
   *   2. Call API getCaseById(caseId)
   * Expected Results (VI): Trả về thông tin chi tiết hồ sơ
   * Pre-conditions (VI): Staff đã đăng nhập, case ID tồn tại
   */
  it('TC-CASE-001: Test get case by ID...', async () => {
    // ...
  });
});
```

### Output: Excel File
- Sheet name: "Get Case By ID"
- Summary: Feature, Number of TCs = 14
- Test Cases: TC-CASE-001 với đầy đủ thông tin

## Troubleshooting

### Lỗi: "No test files found"
- Kiểm tra file có đuôi `-complete.test.ts` không
- Kiểm tra file có trong folder `src/test/generated/` không

### Lỗi: "No test cases found"
- Kiểm tra JSDoc comments có đúng format không
- Kiểm tra Test Case ID có format `TC-XXX-001` không

### Lỗi: "xlsx package not found"
```bash
bun add -d xlsx @types/xlsx
```

## Tips

1. **Format nhất quán**: Đảm bảo tất cả test cases có format JSDoc giống nhau
2. **Category grouping**: Sử dụng `FUNCTION: [Name]` để group test cases
3. **Song ngữ**: Luôn có cả EN và VI trong comments để script có thể fallback
4. **Test Case ID**: Phải có format `TC-XXX-001` để script nhận diện

## Workflow Đề Xuất

1. ✅ Viết test cases trong file `.test.ts` với format đúng
2. ✅ Chạy `bun run test:export` để export ra Excel
3. ✅ Mở Excel file và điền thông tin test rounds (Passed/Failed/Pending)
4. ✅ Cập nhật test dates và tester names
5. ✅ Sử dụng Excel file để tracking và reporting

## Advanced Usage

### Export một file cụ thể

Bạn có thể modify script để chỉ export một file:

```typescript
// Trong export-tests-to-excel.ts
const testFiles = ['src/test/generated/get-case-by-id-complete.test.ts'];
```

### Customize Excel format

Bạn có thể modify function `createTestReportExcel()` để:
- Thay đổi màu sắc
- Thêm columns mới
- Thay đổi layout

## Support

Nếu gặp vấn đề, kiểm tra:
1. File test có đúng format không
2. JSDoc comments có đầy đủ không
3. Dependencies đã install chưa (`xlsx`, `@types/xlsx`)

