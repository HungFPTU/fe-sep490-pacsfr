import { useMutation } from "@tanstack/react-query";
import { caseClientService } from "../services/case.service";
import { CASE_QUERY_KEYS } from "../constants";
import type { CaseProgressRequest, CaseProgressResult } from "../types";

export const useCaseProgress = () => {
    return useMutation<CaseProgressResult, Error, CaseProgressRequest>({
        mutationKey: CASE_QUERY_KEYS.CASE_PROGRESS(),
        mutationFn: (payload) => caseClientService.lookupCaseProgress(payload),
    });
};

