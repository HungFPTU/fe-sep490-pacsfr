/**
 * Case Repository Module
 * 
 * Repository Pattern - abstracts data access layer.
 * Provides a clean interface for data operations without exposing API details.
 */

import { caseClientApi } from '../api/case.api';
import type { CaseProgressRequest, CaseProgressApiResponse } from '../types';

/**
 * Case Repository Interface
 * Defines contract for case data operations
 */
export interface ICaseRepository {
    lookupProgress(payload: CaseProgressRequest): Promise<CaseProgressApiResponse>;
}

/**
 * Case Repository Implementation
 * Handles all data access operations for case module
 */
export class CaseRepository implements ICaseRepository {
    /**
     * Lookup case progress from API
     */
    async lookupProgress(payload: CaseProgressRequest): Promise<CaseProgressApiResponse> {
        try {
            const response = await caseClientApi.progress(payload);
            return response.data;
        } catch (error) {
            console.error("[CaseRepository] Error looking up case progress:", error);
            throw error;
        }
    }
}

/**
 * Default repository instance
 */
export const caseRepository = new CaseRepository();

