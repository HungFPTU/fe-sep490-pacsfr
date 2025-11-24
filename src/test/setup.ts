/**
 * Test setup file for Bun test runner
 * This file is preloaded before all tests
 */

// Mock Next.js environment
if (typeof process !== 'undefined') {
    Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
        configurable: true,
    });
}

// Mock Next.js router
if (typeof window !== 'undefined') {
    // Browser environment mocks
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false,
        }),
    });
}

// Setup global test utilities
global.testUtils = {
    // Mock data generators
    createMockResponse: <T>(data: T, success = true) => ({
        success,
        data,
        message: success ? 'Success' : 'Error',
        errors: null,
    }),

    // Wait helper
    wait: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

    // Mock API delay
    mockApiDelay: (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms)),
};

// Extend global types
declare global {
    var testUtils: {
        createMockResponse: <T>(data: T, success?: boolean) => {
            success: boolean;
            data: T;
            message: string;
            errors: null;
        };
        wait: (ms: number) => Promise<void>;
        mockApiDelay: (ms?: number) => Promise<void>;
    };
}

export { };

