/**
 * Example API test file
 * This demonstrates the testing pattern for API services
 */

// @ts-ignore - Bun test types
import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import {
    createMockRestResponse,
    createMockPagedResponse,
    createMockErrorResponse,
    assertRestResponse,
    assertPagedResponse,
} from '../utils/test-helpers';
import { testDataFactory } from '../utils/test-helpers';

describe('API Service Tests', () => {
    beforeEach(() => {
        // Setup before each test
    });

    afterEach(() => {
        // Cleanup after each test
    });

    describe('Service API', () => {
        it('should return mock service data', () => {
            const mockService = testDataFactory.service();
            const response = createMockRestResponse(mockService);

            assertRestResponse(response);
            expect(response.success).toBe(true);
            expect(response.data).toBeDefined();
            if (response.data && typeof response.data === 'object' && 'id' in response.data) {
                expect(response.data.id).toBe('service-1');
            }
        });

        it('should return paginated service list', () => {
            const services = [
                testDataFactory.service({ id: 'service-1' }),
                testDataFactory.service({ id: 'service-2' }),
            ];
            const response = createMockPagedResponse(services, 1, 10);

            assertPagedResponse(response);
            if (response.data) {
                expect(response.data.items).toHaveLength(2);
                expect(response.data.page).toBe(1);
                expect(response.data.totalPages).toBe(1);
            }
        });

        it('should handle error responses', () => {
            const errorResponse = createMockErrorResponse('Service not found', {
                id: ['Service ID is required'],
            });

            expect(errorResponse.success).toBe(false);
            expect(errorResponse.errors).toBeDefined();
        });
    });

    describe('Service Group API', () => {
        it('should return mock service group data', () => {
            const mockGroup = testDataFactory.serviceGroup();
            const response = createMockRestResponse(mockGroup);

            expect(response.success).toBe(true);
            if (response.data && typeof response.data === 'object' && 'groupCode' in response.data) {
                expect(response.data.groupCode).toBe('GRP001');
            }
        });
    });
});

