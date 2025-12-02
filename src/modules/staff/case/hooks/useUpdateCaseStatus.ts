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
      // Invalidate case detail queries - refetch detailed case info
      queryClient.invalidateQueries({ queryKey: ['case-detail', variables.id] });
      
      // Invalidate payment bill queries - fetch updated bill if status change generates one
      queryClient.invalidateQueries({ queryKey: ['payment-bill'] });
      
      // Invalidate case search queries - refresh the search table
      queryClient.invalidateQueries({ queryKey: ['case-search'] });
      
      // Invalidate case lookup queries - update lookup results
      queryClient.invalidateQueries({ queryKey: ['case-lookup'] });
      
      // Invalidate case statuses - ensure latest status list
      queryClient.invalidateQueries({ queryKey: ['case-statuses'] });
      
      console.log('✅ Case status updated successfully:', response);
    },
    onError: (error) => {
      console.error('❌ Error updating case status:', error);
    },
  });
};

