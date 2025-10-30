import { http } from '@core/http/client';
import { API_PATH } from '@/core';
import { RestResponse } from '@/types/rest';
import { Counter } from '../types';

export const counterApi = {
    getById: (id: string) => {
        return http.get<RestResponse<Counter>>(API_PATH.MANAGER.COUNTER.GET_BY_ID(id));
    },
};
