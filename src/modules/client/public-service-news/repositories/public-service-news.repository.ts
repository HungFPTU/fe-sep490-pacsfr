import type { PublicServiceNewsFilters, PublicServiceNews } from '../types';
import type { RestPaged, RestResponse } from '@/types/rest';
import { publicServiceNewsClientApi } from '../api/public-service-news.api';

export interface IPublicServiceNewsRepository {
    getList(filters: PublicServiceNewsFilters): Promise<RestPaged<PublicServiceNews>>;
    getDetail(id: string): Promise<RestResponse<PublicServiceNews>>;
}

class PublicServiceNewsRepository implements IPublicServiceNewsRepository {
    getList(filters: PublicServiceNewsFilters) {
        return publicServiceNewsClientApi.getList(filters);
    }

    getDetail(id: string) {
        return publicServiceNewsClientApi.getById(id);
    }
}

export const publicServiceNewsRepository = new PublicServiceNewsRepository();

