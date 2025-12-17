import { getValuesPage } from '@/types/rest';
import type { PageResult } from '@/types/rest';
import { paknResponseApi } from '../api/pakn-response.api';
import type { PaknResponse } from '../types';

export const paknResponseService = {
  async getResponsesByCode(paknCode: string): Promise<PageResult<PaknResponse>> {
    const response = await paknResponseApi.getByCode(paknCode);
    return getValuesPage<PaknResponse>(response.data);
  },
};

