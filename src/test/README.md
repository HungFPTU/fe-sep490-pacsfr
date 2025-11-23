# Test Automation Documentation

## 📋 Tổng quan

Thư mục này chứa cấu trúc test automation cho dự án PASCS Frontend, tích hợp với file test cases từ `docs/Report5_Test Report.xlsx`.

## 🏗️ Cấu trúc thư mục

```
src/test/
├── setup.ts                 # Test setup file (preloaded by Bun)
├── utils/                   # Test utilities
│   ├── test-helpers.ts      # Helper functions cho test
│   ├── mocks.ts             # Mock implementations
│   └── excel-parser.ts      # Parser cho Excel test cases
├── scripts/                  # Test scripts
│   └── parse-excel-tests.ts # Script parse Excel và generate test files
├── examples/                 # Example test files
│   ├── api.test.ts          # Example API tests
│   ├── component.test.tsx   # Example component tests
│   └── hook.test.ts         # Example hook tests
└── generated/               # Generated test files từ Excel (auto-generated)
```

## 🚀 Sử dụng

### 1. Chạy tests

```bash
# Chạy tất cả tests
bun test

# Chạy tests với watch mode
bun test:watch

# Chạy tests với coverage
bun test:coverage
```

### 2. Parse test cases từ Excel

```bash
# Parse Excel file và generate test files
bun test:parse
```

Script này sẽ:
- Đọc file `docs/Report5_Test Report.xlsx`
- Parse test cases
- Generate test files vào `src/test/generated/`

### 3. Cài đặt dependencies

Nếu cần parse Excel files, cài đặt xlsx:

```bash
bun add -d xlsx @types/xlsx
```

## 📝 Viết tests

### API Tests

```typescript
import { describe, it, expect } from 'bun:test';
import { createMockRestResponse, testDataFactory } from '@/test/utils/test-helpers';

describe('Service API', () => {
  it('should return service data', () => {
    const mockService = testDataFactory.service();
    const response = createMockRestResponse(mockService);
    
    expect(response.success).toBe(true);
    expect(response.data.id).toBeDefined();
  });
});
```

### Component Tests

```typescript
import { describe, it, expect } from 'bun:test';
// import { render, screen } from '@testing-library/react';

describe('Component Tests', () => {
  it('should render correctly', () => {
    // TODO: Implement với @testing-library/react
    expect(true).toBe(true);
  });
});
```

### Hook Tests

```typescript
import { describe, it, expect } from 'bun:test';
// import { renderHook, waitFor } from '@testing-library/react-hooks';

describe('Hook Tests', () => {
  it('should work correctly', () => {
    // TODO: Implement với @testing-library/react-hooks
    expect(true).toBe(true);
  });
});
```

## 🛠️ Test Utilities

### Test Helpers

- `createMockRestResponse<T>(data, success?, message?)` - Tạo mock REST response
- `createMockPagedResponse<T>(items, page?, size?)` - Tạo mock paginated response
- `createMockErrorResponse(message?, errors?)` - Tạo mock error response
- `testDataFactory` - Factory để tạo mock data (user, service, serviceGroup)
- `assertRestResponse<T>(response)` - Assert response structure
- `assertPagedResponse<T>(response)` - Assert paginated response structure

### Mocks

- `MockHttpClient` - Mock HTTP client
- `MockStorage` - Mock localStorage/sessionStorage
- `createMockRouter()` - Mock Next.js router
- `setupGlobalMocks()` - Setup global mocks

## 📊 Excel Test Case Format

File Excel (`Report5_Test Report.xlsx`) nên có các cột sau:

| Test ID | Test Name | Description | Module | Type | Priority | Steps | Expected Result | Status | Tags |
|---------|-----------|-------------|--------|------|----------|-------|-----------------|--------|------|
| TC001   | Login Test | Test login functionality | Auth | unit | high | Step 1; Step 2 | User logged in | pass | auth,login |

### Cột bắt buộc:
- **Test ID**: Unique identifier
- **Test Name**: Tên test case
- **Module**: Module/feature name
- **Type**: `unit`, `integration`, hoặc `e2e`
- **Priority**: `low`, `medium`, `high`, hoặc `critical`

### Cột tùy chọn:
- **Description**: Mô tả chi tiết
- **Steps**: Test steps (phân cách bằng `;` hoặc newline)
- **Expected Result**: Kết quả mong đợi
- **Status**: `pass`, `fail`, `pending`, hoặc `skip`
- **Tags**: Tags để filter (phân cách bằng `,` hoặc `;`)

## 🔧 Configuration

### Bun Test Configuration

File `.bunfig.local.toml` đã được cấu hình:

```toml
[test]
preload = ["./src/test/setup.ts"]
timeout = 10000
```

### Test Setup

File `src/test/setup.ts` được preload trước mỗi test, cung cấp:
- Global test utilities
- Environment mocks
- Next.js mocks

## 📚 Best Practices

1. **Tách biệt test types**: Unit tests, integration tests, và E2E tests nên ở các file riêng
2. **Sử dụng test helpers**: Dùng các helper functions thay vì viết lại logic
3. **Mock external dependencies**: Mock API calls, localStorage, etc.
4. **Test naming**: Tên test nên mô tả rõ ràng behavior được test
5. **Arrange-Act-Assert**: Follow pattern này trong mỗi test

## 🐛 Troubleshooting

### Excel parsing không hoạt động

```bash
# Cài đặt xlsx package
bun add -d xlsx @types/xlsx
```

### Tests không chạy

```bash
# Kiểm tra Bun version
bun --version

# Clear cache
bun pm cache rm
```

### Import errors

Đảm bảo `tsconfig.json` có đúng path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📖 Tài liệu tham khảo

- [Bun Test Documentation](https://bun.sh/docs/cli/test)
- [Testing Best Practices](https://testingjavascript.com/)
- [React Testing Library](https://testing-library.com/react)

## 🔄 Workflow

1. **Update Excel file** với test cases mới
2. **Run parser**: `bun test:parse`
3. **Review generated tests** trong `src/test/generated/`
4. **Implement actual test logic** thay thế TODO comments
5. **Run tests**: `bun test`
6. **Commit** test files

## 📝 Notes

- Generated test files sẽ có TODO comments cần được implement
- Test files nên được review và update trước khi commit
- Excel parser có thể cần điều chỉnh tùy theo format của Excel file

