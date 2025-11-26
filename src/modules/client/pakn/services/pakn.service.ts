"use client";

import { getValuesPage } from '@/types/rest';
import type { PageResult } from '@/types/rest';
import type {
    PaknAttachment,
    PaknCategoryOption,
    PaknItem,
    PaknOrgUnitOption,
} from '../types/response';
import type { PaknListFilters, PaknSubmitPayload } from '../types/request';
import { paknApi } from '../api/pakn.api';

export const paknService = {
    async submit(payload: PaknSubmitPayload) {
        return paknApi.submit(payload);
    },

    async getList(filters: PaknListFilters): Promise<PageResult<PaknItem>> {
        const response = await paknApi.getList(filters);
        return getValuesPage<PaknItem>(response.data);
    },

    async getAttachments(paknCode: string): Promise<PaknAttachment[] | null> {
        if (!paknCode) return null;
        const response = await paknApi.getAttachments(paknCode);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        const attachments = Array.isArray(response.data.data)
            ? response.data.data
            : (response.data.data as { $values?: PaknAttachment[] })?.$values ?? [];
        return attachments;
    },

    async getCategories(): Promise<PaknCategoryOption[]> {
        const response = await paknApi.getCategories();
        const page = getValuesPage<PaknCategoryOption>(response.data);
        return page.items ?? [];
    },

    async getOrgUnits(): Promise<PaknOrgUnitOption[]> {
        const response = await paknApi.getOrgUnits();
        const page = getValuesPage<PaknOrgUnitOption>(response.data);
        return page.items ?? [];
    },
};

