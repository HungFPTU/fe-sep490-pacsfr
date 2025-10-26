import { useQuery } from '@tanstack/react-query';
import { caseSearchService } from '../services/case-search.service';
import type { CaseSearchFilters } from '../types/case-search';

export const useCaseSearch = (filters: CaseSearchFilters, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['case-search', filters],
    queryFn: () => caseSearchService.getCaseList(filters),
    enabled: enabled,
    staleTime: 30000, // 30 seconds
  });
};
