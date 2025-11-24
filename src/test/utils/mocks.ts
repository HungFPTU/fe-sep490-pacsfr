/**
 * Mock implementations for testing
 */

// Type definitions for mock functions
interface MockFn<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mock: {
    calls: Parameters<T>[];
    results: Array<{ type: 'return' | 'throw'; value: any }>;
  };
  mockClear(): void;
  mockReset(): void;
  mockReturnValue(value: ReturnType<T>): MockFn<T>;
}

declare global {
  namespace jest {
    interface Mock<T extends (...args: any[]) => any> extends MockFn<T> {}
  }
}

/**
 * Mock HTTP client responses
 */
export class MockHttpClient {
  private responses: Map<string, any> = new Map();
  private delays: Map<string, number> = new Map();

  /**
   * Set mock response for a URL pattern
   */
  setResponse(url: string, response: any, delay = 0) {
    this.responses.set(url, response);
    if (delay > 0) {
      this.delays.set(url, delay);
    }
  }

  /**
   * Get mock response
   */
  async getMockResponse(url: string): Promise<any> {
    const delay = this.delays.get(url) || 0;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return this.responses.get(url);
  }

  /**
   * Clear all mocks
   */
  clear() {
    this.responses.clear();
    this.delays.clear();
  }
}

/**
 * Create a mock function (Bun-compatible)
 */
function createMockFn<T extends (...args: any[]) => any>(
  implementation?: T
): jest.Mock<T> {
  const calls: any[] = [];
  const mockFn = ((...args: any[]) => {
    calls.push(args);
    if (implementation) {
      return implementation(...args);
    }
    return undefined;
  }) as any;
  
  mockFn.mock = {
    calls,
    results: calls.map((args) => ({ type: 'return', value: undefined })),
  };
  mockFn.mockClear = () => {
    calls.length = 0;
  };
  mockFn.mockReset = () => {
    calls.length = 0;
  };
  mockFn.mockReturnValue = (value: any) => {
    if (implementation) {
      const originalImpl = implementation;
      implementation = (() => value) as T;
    }
    return mockFn;
  };
  
  return mockFn;
}

/**
 * Mock React Query client
 */
export function createMockQueryClient() {
  return {
    queries: new Map(),
    mutations: new Map(),
    invalidateQueries: createMockFn(),
    refetchQueries: createMockFn(),
    setQueryData: createMockFn(),
    getQueryData: createMockFn(),
  };
}

/**
 * Mock Next.js router
 */
export function createMockRouter(overrides?: Partial<any>) {
  return {
    push: createMockFn(),
    replace: createMockFn(),
    back: createMockFn(),
    forward: createMockFn(),
    refresh: createMockFn(),
    prefetch: createMockFn(),
    pathname: '/',
    query: {},
    asPath: '/',
    ...overrides,
  };
}

/**
 * Mock localStorage
 */
export class MockStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/**
 * Setup global mocks
 */
export function setupGlobalMocks() {
  // Mock localStorage
  if (typeof global !== 'undefined') {
    (global as any).localStorage = new MockStorage();
    (global as any).sessionStorage = new MockStorage();
  }

  // Mock window
  if (typeof window !== 'undefined') {
    (window as any).localStorage = new MockStorage();
    (window as any).sessionStorage = new MockStorage();
  }
}

