"use client";

export type PaknSubmitPayload = {
    title: string;
    content: string;
    citizenName: string;
    city: string;
    district?: string;
    streetAddress: string;
    phone?: string;
    email?: string;
    paknCategoryId: string;
    orgUnitId: string;
    captchaToken: string;
    attachments?: File[];
};

export type PaknListFilters = {
    keyword: string;
    status: string;
    categoryId: string;
    page: number;
    size: number;
};

export type PaknLookupFilters = {
    paknCode: string;
};

