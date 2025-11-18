// Filter Option Types

export interface FilterOption {
    id: string;
    name: string;
}

export interface FilterOptions {
    implementingAgencies: FilterOption[];
    fields: FilterOption[];
    implementationLevels: FilterOption[];
    targetAudiences: FilterOption[];
}

export type SearchByType = 'department' | 'province';

