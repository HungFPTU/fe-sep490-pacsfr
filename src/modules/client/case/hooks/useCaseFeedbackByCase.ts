'use client';

import { useQuery } from "@tanstack/react-query";
import { caseClientService } from "../services/case.service";
import type { CaseFeedback } from "../types";

const CASE_FEEDBACK_QUERY_KEY = (caseId: string) => ["case-feedback", caseId] as const;

export const useCaseFeedbackByCase = (caseId?: string) => {
    return useQuery<CaseFeedback | null>({
        queryKey: CASE_FEEDBACK_QUERY_KEY(caseId ?? "unknown"),
        queryFn: () => caseClientService.getFeedbackByCase(caseId!),
        enabled: Boolean(caseId),
        staleTime: 1000 * 60 * 5,
    });
};


