export interface PaknCategoryFilters {
    keyword: string;
    isActive: boolean | null;
    page: number;
    size: number;
}

export interface BasePaknCategoryPayload {
    categoryName: string;
    description?: string;
    isActive: boolean;
}

export interface CreatePaknCategoryRequest extends BasePaknCategoryPayload { }

export interface UpdatePaknCategoryRequest extends BasePaknCategoryPayload {
    id: string;
}

