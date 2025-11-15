import { useQuery } from '@tanstack/react-query';
import { submissionMethodApi } from '../api/submission-method.api';
import type { SubmissionMethod } from '../api/submission-method.api';

export const useSubmissionMethods = () => {
  return useQuery<SubmissionMethod[]>({
    queryKey: ['submission-methods'],
    queryFn: async () => {
      const response = await submissionMethodApi.getAllSubmissionMethods();
      if (response.success && response.data?.items?.$values) {
        return response.data.items.$values as SubmissionMethod[];
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export type { SubmissionMethod };
