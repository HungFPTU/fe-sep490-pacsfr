/**
 * Test utilities and helpers for test automation
 */

import type { RestResponse, RestPaged } from '@/types/rest';

/**
 * Create mock REST response
 */
export function createMockRestResponse<T>(
  data: T,
  success = true,
  message = 'Success'
): RestResponse<T & { $id?: string }> {
  return {
    success,
    data: data as unknown as T & { $id?: string },
  };
}

/**
 * Create mock paginated response
 */
export function createMockPagedResponse<T>(
  items: T[],
  page = 1,
  size = 10,
  totalItems?: number
): RestPaged<T & { $id?: string }> {
  const total = totalItems ?? items.length;
  const totalPages = Math.ceil(total / size);

  return {
    success: true,
    data: {
      items: items as any,
      page,
      size,
      total: total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    message: 'Success',
  };
}

/**
 * Create mock API error response
 */
export function createMockErrorResponse(
  message = 'Error occurred',
  errors: Record<string, string[]> | null = null
) {
  return {
    success: false,
    data: null,
    message,
    errors,
  };
}

/**
 * Wait for specified milliseconds
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock API delay for testing loading states
 */
export async function mockApiDelay(ms = 100): Promise<void> {
  return wait(ms);
}

/**
 * Create mock user data
 */
export function createMockUser(overrides?: Partial<any>) {
  return {
    id: 'user-1',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'CITIZEN',
    isActive: true,
    ...overrides,
  };
}

/**
 * Create mock service data
 */
export function createMockService(overrides?: Partial<any>) {
  return {
    id: 'service-1',
    serviceCode: 'SVC001',
    serviceName: 'Test Service',
    description: 'Test service description',
    serviceGroupId: 'group-1',
    isActive: true,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create mock service group data
 */
export function createMockServiceGroup(overrides?: Partial<any>) {
  return {
    id: 'group-1',
    groupCode: 'GRP001',
    groupName: 'Test Group',
    description: 'Test group description',
    iconUrl: 'https://example.com/icon.png',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Test data factory
 */
export const testDataFactory = {
  user: createMockUser,
  service: createMockService,
  serviceGroup: createMockServiceGroup,
};

/**
 * Assert response structure
 */
export function assertRestResponse<T extends object>(response: any): asserts response is RestResponse<T> {
  if (!response || typeof response !== 'object') {
    throw new Error('Response is not an object');
  }
  if (typeof response.success !== 'boolean') {
    throw new Error('Response.success is not a boolean');
  }
  if (!response.hasOwnProperty('data')) {
    throw new Error('Response.data is missing');
  }
  if (typeof response.message !== 'string') {
    throw new Error('Response.message is not a string');
  }
}

/**
 * Assert paginated response structure
 */
export function assertPagedResponse<T extends object>(response: any): asserts response is RestPaged<T> {
  assertRestResponse(response);
  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Paged response data is not an object');
  }
  if (!Array.isArray((response.data as any).items)) {
    throw new Error('Paged response items is not an array');
  }
  if (typeof (response.data as any).page !== 'number') {
    throw new Error('Paged response page is not a number');
  }
  if (typeof (response.data as any).size !== 'number') {
    throw new Error('Paged response size is not a number');
  }
}

