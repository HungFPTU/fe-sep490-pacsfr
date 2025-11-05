import { SERVICE_TYPES, EXECUTION_LEVELS, SERVICE_FIELDS } from '../enums';

/**
 * Get service type label in Vietnamese
 */
export const getServiceTypeLabel = (value: string): string => {
    const serviceType = SERVICE_TYPES.find((type) => type.value === value);
    return serviceType?.label || value;
};

/**
 * Get execution level label in Vietnamese
 */
export const getExecutionLevelLabel = (value: string): string => {
    const level = EXECUTION_LEVELS.find((l) => l.value === value);
    return level?.label || value;
};

/**
 * Get service field label in Vietnamese
 */
export const getServiceFieldLabel = (value: string): string => {
    const field = SERVICE_FIELDS.find((f) => f.value === value);
    return field?.label || value;
};

