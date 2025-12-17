import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paknService } from '../services/pakn.service';
import type { PaknFilters } from '../types';

const QUERY_KEYS = {
  PAKN_LIST: (filters: PaknFilters) => ['staff-pakn-list', filters],
  PAKN_DETAIL: (id: string) => ['staff-pakn-detail', id],
};

export const usePaknList = (filters: PaknFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.PAKN_LIST(filters),
    queryFn: () => paknService.getPaknList(filters),
  });
};

export const usePaknDetail = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PAKN_DETAIL(id),
    queryFn: () => paknService.getPaknById(id),
    enabled: !!id,
  });
};

export const useUpdatePaknStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paknId, newStatus, note }: { paknId: string; newStatus: string; note: string }) =>
      paknService.updateStatus(paknId, newStatus, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-pakn-list'] });
      queryClient.invalidateQueries({ queryKey: ['staff-pakn-detail'] });
    },
  });
};

