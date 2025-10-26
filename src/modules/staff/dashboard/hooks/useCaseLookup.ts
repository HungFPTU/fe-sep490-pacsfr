import { useQuery } from '@tanstack/react-query';
import { caseLookupService } from '../services/case-lookup.service';

export const useCaseLookup = (caseId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['case-lookup', caseId],
    queryFn: () => caseLookupService.getCaseById(caseId),
    enabled: enabled && !!caseId,
    retry: false,
  });
};
