'use client';

import { useQuery } from '@tanstack/react-query';
import { caseSearchService } from '../services/case-search.service';
import type { CaseSearchFilters } from '../types/case-search';

const MINIMUM_LOADING_TIME = 1500; // 1.5 seconds

export const useCaseSearch = (filters: CaseSearchFilters, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['case-search', filters],
    queryFn: async () => {
      const startTime = Date.now();
      
      try {
        // Execute the query
        const result = await caseSearchService.getCaseList(filters);
        
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
    enabled: enabled,
    staleTime: 30000, // 30 seconds
  });
};
