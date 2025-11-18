/**
 * Services Module - Barrel Export
 * 
 * Main entry point for the client services module.
 * Follows Facade pattern to provide a clean API.
 */

// Types
export type * from './types';
export type * from './types/filter-options';
export type * from './types/filter.types';

// API Layer
export { serviceApi } from './api/service.api';

// Services Layer
export { ServiceService } from './services/service.service';
export { FilterOptionsService } from './services/filter-options.service';

// Hooks
export * from './hooks/useServices';
export * from './hooks/useFilterOptions';

// Formatters
export * from './formatters';

// Helpers
export * from './helpers';

// Mappers
export * from './mappers';

// Constants
export * from './constants';
export * from './constants/filter-options';

// Enums
export * from './enums';

// Utils - Colors only (to avoid conflicts)
export {
    SERVICE_TYPE_COLORS,
    SERVICE_TYPE_CHIP_COLORS,
    getServiceTypeColor,
    getServiceTypeChipColor,
} from './utils/colors';
