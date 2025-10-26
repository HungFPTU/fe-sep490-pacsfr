import { useQuery } from '@tanstack/react-query';
import { caseDetailService } from '../services/case-detail.service';

export const useCaseDetail = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['case-detail', id],
    queryFn: () => caseDetailService.getCaseById(id),
    enabled: enabled && !!id,
    staleTime: 0,
    gcTime: 0,
  });
};

