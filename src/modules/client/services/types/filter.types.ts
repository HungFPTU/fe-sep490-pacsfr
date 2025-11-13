/**
 * Types for filter components
 */

export interface OptionItem {
    id: string;
    name: string;
}

export interface SearchableSelectProps {
    label: string;
    placeholder: string;
    emptyMessage: string;
    options: OptionItem[];
    value?: string | null;
    onChange: (value: string) => void;
    className?: string;
}

