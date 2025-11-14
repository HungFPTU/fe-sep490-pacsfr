/**
 * Case Progress Hook
 * 
 * React Query hook for case progress operations.
 * Follows Hook pattern - encapsulates React Query logic.
 */

import { useMutation } from "@tanstack/react-query";
import { caseClientService } from "../services/case.service";
import { CASE_QUERY_KEYS } from "../constants";
import type { CaseProgressRequest, CaseProgressResult } from "../types";

/**
 * Hook for looking up case progress
 * Uses React Query mutation for async operations
 */
export const useCaseProgress = () => {
    return useMutation<CaseProgressResult, Error, CaseProgressRequest>({
        mutationKey: CASE_QUERY_KEYS.CASE_PROGRESS(),
        mutationFn: (payload) => caseClientService.lookupCaseProgress(payload),
    });
};

