'use client';

import { useQuery } from '@tanstack/react-query';
import { caseDetailService } from '../services/case-detail.service';

const MINIMUM_LOADING_TIME = 1500; // 1.5 seconds

export const useCaseDetail = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['case-detail', id],
    queryFn: async () => {
      const startTime = Date.now();
      
      try {
        // Execute the query
        const result = await caseDetailService.getCaseById(id);
        
        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;
        
        // If elapsed time is less than minimum, wait for the remaining time
        if (elapsedTime < MINIMUM_LOADING_TIME) {
          await new Promise(resolve => setTimeout(resolve, MINIMUM_LOADING_TIME - elapsedTime));
        }
        
        return result;
      } catch (error) {
        // Even on error, ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < MINIMUM_LOADING_TIME) {
          await new Promise(resolve => setTimeout(resolve, MINIMUM_LOADING_TIME - elapsedTime));
        }
        throw error;
      }
    },
    enabled: enabled && !!id,
    staleTime: 0,
    gcTime: 0,
  });
};

