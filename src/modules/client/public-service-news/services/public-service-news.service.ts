import { publicServiceNewsRepository } from '../repositories';
import type { PublicServiceNewsFilters, PublicServiceNews } from '../types';
import { getValuesPage, getOne, type PageResult } from '@/types/rest';

export class PublicServiceNewsClientService {
    async getPublicServiceNews(filters: PublicServiceNewsFilters): Promise<PageResult<PublicServiceNews>> {
        const response = await publicServiceNewsRepository.getList(filters);
        return getValuesPage<PublicServiceNews>(response);
    }

    async getPublicServiceNewsDetail(id: string): Promise<PublicServiceNews | null> {
        const response = await publicServiceNewsRepository.getDetail(id);
        return getOne<PublicServiceNews>(response);
    }
}

export const publicServiceNewsClientService = new PublicServiceNewsClientService();

