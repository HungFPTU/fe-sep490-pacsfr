/**
 * Counter Display Module
 * Fullscreen display for showing queue numbers at all service groups
 * 
 * Architecture: SOLID Principles
 * - Types → API → Service → Hooks → Components
 */

// Types (Request/Response separation)
export * from './types';

// Hooks (Public API for components)
export * from './hooks';

// Components
export * from './components';

// Constants
export { MOCK_COUNTERS, DEFAULT_DISPLAY_SETTINGS } from './constants/mock-data';
export { COUNTER_DISPLAY_QUERY_KEYS, CACHE_TIME, STALE_TIME, REFETCH_INTERVAL } from './constants/query-keys';
