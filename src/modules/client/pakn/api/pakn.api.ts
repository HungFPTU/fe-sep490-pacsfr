import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type {
    PaknAttachment,
    PaknCategoryOption,
    PaknItem,
    PaknOrgUnitOption,
    PaknDetail,
} from '../types/response';
import type { PaknListFilters, PaknSubmitPayload } from '../types/request';

const toFormData = (payload: PaknSubmitPayload) => {
    const formData = new FormData();
    formData.append('Title', payload.title);
    formData.append('Content', payload.content);
    formData.append('CitizenName', payload.citizenName);
    formData.append('City', payload.city);
    if (payload.district) {
        formData.append('District', payload.district);
    }
    formData.append('StreetAddress', payload.streetAddress);
    if (payload.phone) formData.append('Phone', payload.phone);
    if (payload.email) formData.append('Email', payload.email);
    formData.append('CaptchaToken', payload.captchaToken);
    formData.append('PAKNCategoryId', payload.paknCategoryId);
    formData.append('OrgUnitId', payload.orgUnitId);
    payload.attachments?.forEach((file) => {
        formData.append('Attachments', file);
    });
    return formData;
};

export const paknApi = {
    submit: (payload: PaknSubmitPayload) => {
        const formData = toFormData(payload);
        return http.post(API_PATH.CLIENT.PAKN.SUBMIT, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    lookup: (payload: { paknCode: string }) => {
        return http.post(API_PATH.CLIENT.PAKN.LOOKUP, payload);
    },

    verifyOTP: (payload: { paknCode: string; otpCode: string }) => {
        return http.post<{ success: boolean; message: string; data: PaknDetail }>(API_PATH.CLIENT.PAKN.VERIFY, payload);
    },

    resendOTP: (payload: { paknCode: string }) => {
        return http.post(API_PATH.CLIENT.PAKN.RESEND_OTP, payload);
    },

    getList: (filters: PaknListFilters) => {
        return http.get<RestPaged<PaknItem>>(
            API_PATH.CLIENT.PAKN.LIST(
                filters.keyword ?? '',
                filters.status ?? '',
                filters.categoryId ?? '',
                filters.page,
                filters.size,
            ),
        );
    },

    getAttachments: (paknCode: string) => {
        return http.get<RestResponse<PaknAttachment[]>>(API_PATH.CLIENT.PAKN.FILES(paknCode));
    },

    getCategories: () => {
        // Fetch active categories with large page size to avoid pagination for dropdown
        return http.get<RestPaged<PaknCategoryOption>>(
            API_PATH.CLIENT.PAKN_CATEGORY.LIST('', true, 1, 200),
        );
    },

    getOrgUnits: () => {
        return http.get<RestPaged<PaknOrgUnitOption>>(
            API_PATH.CLIENT.ORG_UNIT.LIST('', true, 1, 200),
        );
    },
};

