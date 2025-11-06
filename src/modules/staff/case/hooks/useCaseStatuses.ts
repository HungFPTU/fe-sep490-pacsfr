import { useQuery } from '@tanstack/react-query';
import { caseStatusApi } from '../api/case-status.api';
import type { CaseStatus } from '../constants/case-statuses';

export const useCaseStatuses = () => {
  return useQuery<CaseStatus[], Error>({
    queryKey: ['case-statuses'],
    queryFn: async () => {
      const response = await caseStatusApi.getAllStatuses();
      if (response.success && response.data.$values) {
        return response.data.$values;
      }
      throw new Error(response.message || 'Failed to fetch case statuses');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - statuses don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
