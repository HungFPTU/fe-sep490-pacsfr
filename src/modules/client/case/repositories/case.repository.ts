/**
 * Case Repository Module
 * 
 * Repository Pattern - abstracts data access layer.
 * Provides a clean interface for data operations without exposing API details.
 */

import { caseClientApi } from '../api/case.api';
import type {
    CaseProgressRequest,
    CaseProgressApiResponse,
    CaseFeedbackRequest,
    CaseFeedbackResponse,
    CaseFeedback,
} from '../types';

/**
 * Case Repository Interface
 * Defines contract for case data operations
 */
export interface ICaseRepository {
    submitFeedback(payload: CaseFeedbackRequest): Promise<CaseFeedbackResponse>;
    getFeedbackByCase(caseId: string): Promise<CaseFeedback | null>;
}

/**
 * Case Repository Implementation
 * Handles all data access operations for case module
 */
export class CaseRepository implements ICaseRepository {
    /**
     * Lookup case progress from API
     */

    async submitFeedback(payload: CaseFeedbackRequest): Promise<CaseFeedbackResponse> {
        try {
            const response = await caseClientApi.feedback(payload);
            return response.data as CaseFeedbackResponse;
        } catch (error) {
            console.error("[CaseRepository] Error submitting feedback:", error);
            throw error;
        }
    }

    async getFeedbackByCase(caseId: string): Promise<CaseFeedback | null> {
        try {
            const response = await caseClientApi.getFeedbackByCase(caseId);
            if (response.data?.success === false) {
                return null;
            }
            return (response.data?.data as CaseFeedback) ?? null;
        } catch (error) {
            console.error("[CaseRepository] Error fetching feedback by case:", error);
            throw error;
        }
    }
}

/**
 * Default repository instance
 */
export const caseRepository = new CaseRepository();

