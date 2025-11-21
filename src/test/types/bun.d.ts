/**
 * Bun-specific type declarations
 */

declare global {
    interface ImportMeta {
        /**
         * Bun-specific property: true if this file is the main entry point
         * @see https://bun.sh/docs/runtime/import-meta
         */
        main?: boolean;
    }
}

export { };

