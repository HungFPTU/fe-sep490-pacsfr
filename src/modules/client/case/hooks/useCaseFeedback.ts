'use client';

import { useMutation } from "@tanstack/react-query";
import { caseClientService } from "../services/case.service";
import type { CaseFeedbackRequest, CaseFeedbackResponse } from "../types";

export const useCaseFeedback = () => {
    return useMutation<CaseFeedbackResponse, Error, CaseFeedbackRequest>({
        mutationFn: (payload) => caseClientService.submitFeedback(payload),
    });
};


