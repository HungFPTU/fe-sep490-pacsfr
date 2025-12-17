import { useQuery } from '@tanstack/react-query';
import { paknResponseService } from '../services/pakn-response.service';
import { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

const QUERY_KEYS = {
  RESPONSES_BY_CODE: (paknCode: string) => ['client-pakn-responses', paknCode] as const,
};

export const usePaknResponsesByCode = (paknCode: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.RESPONSES_BY_CODE(paknCode || ''),
    queryFn: () => paknResponseService.getResponsesByCode(paknCode!),
    enabled: !!paknCode,
    gcTime: CACHE_TIME.MEDIUM,
    staleTime: STALE_TIME.SHORT,
  });
};

