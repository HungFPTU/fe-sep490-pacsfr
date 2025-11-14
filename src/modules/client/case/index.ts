/**
 * Client Case Module
 * 
 * Main entry point for the client case module.
 * Follows Facade pattern to provide a clean API.
 * 
 * Architecture:
 * - Presentation Layer: components/
 * - Application Layer: hooks/, services/
 * - Domain Layer: types/
 * - Infrastructure Layer: api/, repositories/
 * - Utilities: utils/, mappers/
 */

// Presentation Layer
export * from "./components/view";
export * from "./components/ui";

// Application Layer
export * from "./hooks";
export * from "./services/case.service";

// Domain Layer
export * from "./types";

// Infrastructure Layer
export * from "./repositories";

// Utilities
export * from "./utils";
export * from "./mappers";

// Constants
export * from "./constants";

