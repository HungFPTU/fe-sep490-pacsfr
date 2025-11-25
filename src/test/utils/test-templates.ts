/**
 * Test templates và helpers để generate test code cho các functions
 */

import type { TestCase } from './excel-parser';

/**
 * Map function name từ Excel sang test implementation pattern
 */
export function getTestImplementationPattern(functionName: string): {
    type: 'api' | 'component' | 'hook' | 'service';
    imports: string[];
    testStructure: string;
} {
    const lowerName = functionName.toLowerCase();

    // API Tests
    if (
        lowerName.includes('get') ||
        lowerName.includes('create') ||
        lowerName.includes('update') ||
        lowerName.includes('delete') ||
        lowerName.includes('login') ||
        lowerName.includes('register')
    ) {
        return {
            type: 'api',
            imports: [
                "import { describe, it, expect, beforeEach, afterEach } from 'bun:test';",
                "import { createMockRestResponse } from '@/test/utils/test-helpers';",
            ],
            testStructure: getApiTestTemplate(functionName),
        };
    }

    // Component Tests
    if (lowerName.includes('view') || lowerName.includes('display') || lowerName.includes('render')) {
        return {
            type: 'component',
            imports: [
                "import { describe, it, expect } from 'bun:test';",
                "// import { render, screen } from '@testing-library/react';",
            ],
            testStructure: getComponentTestTemplate(functionName),
        };
    }

    // Hook Tests
    if (lowerName.includes('use') || lowerName.includes('hook')) {
        return {
            type: 'hook',
            imports: [
                "import { describe, it, expect } from 'bun:test';",
                "// import { renderHook, waitFor } from '@testing-library/react-hooks';",
            ],
            testStructure: getHookTestTemplate(functionName),
        };
    }

    // Default: Service test
    return {
        type: 'service',
        imports: [
            "import { describe, it, expect, beforeEach, afterEach } from 'bun:test';",
            "import { createMockRestResponse } from '@/test/utils/test-helpers';",
        ],
        testStructure: getServiceTestTemplate(functionName),
    };
}

/**
 * Generate API test template
 */
function getApiTestTemplate(functionName: string): string {
    return `
  it('should ${functionName.toLowerCase()} successfully', async () => {
    // Arrange: Chuẩn bị test data
    const mockRequest = {
      // TODO: Define request payload
    };

    const mockResponse = createMockRestResponse({
      // TODO: Define expected response data
    });

    // Act: Thực hiện API call
    // const result = await apiFunction(mockRequest);

    // Assert: Kiểm tra kết quả
    // expect(result).toBeDefined();
    // expect(result.success).toBe(true);
    expect(true).toBe(true); // TODO: Implement actual test
  });`;
}

/**
 * Generate Component test template
 */
function getComponentTestTemplate(functionName: string): string {
    return `
  it('should render ${functionName.toLowerCase()} correctly', () => {
    // Arrange
    // const props = { /* component props */ };

    // Act
    // render(<Component {...props} />);

    // Assert
    // expect(screen.getByText('Expected Text')).toBeInTheDocument();
    expect(true).toBe(true); // TODO: Implement với @testing-library/react
  });`;
}

/**
 * Generate Hook test template
 */
function getHookTestTemplate(functionName: string): string {
    return `
  it('should ${functionName.toLowerCase()} correctly', async () => {
    // Arrange
    // const wrapper = ({ children }) => <Provider>{children}</Provider>;

    // Act
    // const { result } = renderHook(() => useHook(), { wrapper });

    // Assert
    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(true).toBe(true); // TODO: Implement với @testing-library/react-hooks
  });`;
}

/**
 * Generate Service test template
 */
function getServiceTestTemplate(functionName: string): string {
    return `
  it('should ${functionName.toLowerCase()} correctly', async () => {
    // Arrange
    // const input = { /* service input */ };

    // Act
    // const result = await serviceFunction(input);

    // Assert
    // expect(result).toBeDefined();
    expect(true).toBe(true); // TODO: Implement actual test
  });`;
}

/**
 * Generate test code từ test case
 */
export function generateTestCode(testCase: TestCase): string {
    const pattern = getTestImplementationPattern(testCase.name);
    const functionName = testCase.name.replace(/[^a-zA-Z0-9]/g, '');

    // Build test steps comments
    const stepsComments = testCase.steps
        .map((step, index) => `    // ${index + 1}. ${step}`)
        .join('\n');

    // Build expected result comment
    const expectedComment = testCase.expectedResult
        ? `    // Expected: ${testCase.expectedResult}`
        : '    // Expected: TODO - Define expected result';

    // Build pre-condition comment
    const preConditionComment = testCase.description
        ? `    // Pre-Condition: ${testCase.description}`
        : '';

    return `
  it('${testCase.name}', async () => {
${preConditionComment ? `    ${preConditionComment}\n` : ''}    // Test steps:
${stepsComments || '    // TODO: Add test steps'}
    
${expectedComment}
    
    // TODO: Implement actual test logic
    expect(true).toBe(true);
  });`;
}

/**
 * Map function name sang module path
 */
export function getModulePath(functionName: string): string | null {
    const lowerName = functionName.toLowerCase();

    // Auth functions
    if (lowerName.includes('login') || lowerName.includes('register') || lowerName.includes('user')) {
        return '@/modules/auth';
    }

    // Case functions
    if (lowerName.includes('case')) {
        return '@/modules/staff/case';
    }

    // Service functions
    if (lowerName.includes('service')) {
        return '@/modules/manager/service';
    }

    // Client service functions
    if (lowerName.includes('get service') || lowerName.includes('service by')) {
        return '@/modules/client/service';
    }

    return null;
}

