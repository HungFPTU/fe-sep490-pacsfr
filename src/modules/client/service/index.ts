/**
 * Client Service Module
 * 
 * Main entry point for the client service module.
 * Follows Facade pattern to provide a clean API.
 * 
 * Architecture:
 * - Presentation Layer: components/
 * - Application Layer: hooks/, services/
 * - Domain Layer: types/, enums/
 * - Infrastructure Layer: api/, repositories/
 * - Utilities: constants/
 */

// Presentation Layer
export * from './components/view';
export * from './components/ui';

// Application Layer
export * from './hooks';
export * from './services/service.service';

// Domain Layer
export * from './types';
export * from './enums';

// Infrastructure Layer
export * from './repositories';

// Constants
export * from './constants';

// Utilities
export * from './utils';

