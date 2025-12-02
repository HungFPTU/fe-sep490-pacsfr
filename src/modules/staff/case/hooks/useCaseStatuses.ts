import { useQuery } from '@tanstack/react-query';
import { caseStatusApi, type CaseStatusItem } from '../api/case-status.api';

export const useCaseStatuses = () => {
  return useQuery<CaseStatusItem[]>({
    queryKey: ['case-statuses'],
    queryFn: async () => {
      const response = await caseStatusApi.getCaseStatuses();
      if (response.success && response.data?.$values) {
        return response.data.$values as CaseStatusItem[];
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
