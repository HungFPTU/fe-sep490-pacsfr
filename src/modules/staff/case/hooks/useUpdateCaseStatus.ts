'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { caseDetailService } from '../services/case-detail.service';
import type { UpdateCaseStatusRequest } from '../types/case-search';

export const useUpdateCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCaseStatusRequest }) =>
      caseDetailService.updateCaseStatus(id, data),
    onSuccess: (response, variables) => {
      // Invalidate case detail queries
      queryClient.invalidateQueries({ queryKey: ['case-detail', variables.id] });
      
      // Invalidate case search queries (to refresh the search table)
      queryClient.invalidateQueries({ queryKey: ['case-search'] });
      
      // Invalidate case lookup queries
      queryClient.invalidateQueries({ queryKey: ['case-lookup'] });
      
      console.log('✅ Case status updated successfully:', response);
    },
    onError: (error) => {
      console.error('❌ Error updating case status:', error);
    },
  });
};

