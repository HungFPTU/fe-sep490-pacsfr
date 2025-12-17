import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paknResponseService } from '../services/pakn-response.service';
import type { CreatePaknResponseRequest, PaknResponseFilters } from '../types';

const QUERY_KEYS = {
  RESPONSE_LIST: (filters: PaknResponseFilters) => ['staff-pakn-response-list', filters],
  RESPONSE_DETAIL: (id: string) => ['staff-pakn-response-detail', id],
};

export const usePaknResponseList = (filters: PaknResponseFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.RESPONSE_LIST(filters),
    queryFn: () => paknResponseService.getResponses(filters),
    enabled: !!filters.paknId,
  });
};

export const usePaknResponseDetail = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.RESPONSE_DETAIL(id),
    queryFn: () => paknResponseService.getResponseById(id),
    enabled: !!id,
  });
};

export const useCreatePaknResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaknResponseRequest) =>
      paknResponseService.createResponse(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['staff-pakn-response-list', { paknId: variables.paknId }] 
      });
      queryClient.invalidateQueries({ queryKey: ['staff-pakn-list'] });
      queryClient.invalidateQueries({ queryKey: ['staff-pakn-detail'] });
    },
  });
};

