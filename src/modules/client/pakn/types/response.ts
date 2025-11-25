"use client";

export type PaknItem = {
    id: string;
    paknCode: string;
    title: string;
    status: string;
    citizenName?: string;
    phone?: string;
    email?: string;
    categoryId?: string;
    categoryName?: string;
    orgUnitName?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type PaknAttachment = {
    fileName: string;
    url: string;
    contentType?: string;
    size?: number;
};

export type PaknCategoryOption = {
    id: string;
    categoryName: string;
    description?: string;
};

export type PaknOrgUnitOption = {
    id: string;
    unitName: string;
    name?: string;
};

