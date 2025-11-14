/**
 * Parsers Module
 * 
 * Data parsing utilities for case module.
 * Follows Single Responsibility Principle - only handles data parsing/extraction.
 */

import type { CaseProgressRaw, CaseProgressApiResponse } from '../types';

/**
 * Convert unknown input to plain object
 */
export const toPlainObject = (input: unknown): Record<string, unknown> | null => {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        return null;
    }
    return input as Record<string, unknown>;
};

/**
 * Extract case data from API response
 * Handles various response formats (data, result, payload, nested data)
 */
export const extractCaseData = (response: CaseProgressApiResponse): CaseProgressRaw | null => {
    const candidates: Array<unknown> = [
        response?.data,
        (response as { result?: unknown }).result,
        (response as { payload?: unknown }).payload,
    ];

    for (const candidate of candidates) {
        if (!candidate) continue;

        // Handle string JSON
        if (typeof candidate === "string") {
            try {
                const parsed = JSON.parse(candidate) as unknown;
                const plain = toPlainObject(parsed);
                if (plain) return plain as CaseProgressRaw;
            } catch {
                continue;
            }
        }

        // Handle object
        const plain = toPlainObject(candidate);
        if (plain) {
            // Check for nested data
            if ("data" in plain && plain.data && typeof plain.data === "object") {
                const nested = toPlainObject(plain.data);
                if (nested) return nested as CaseProgressRaw;
            }
            return plain as CaseProgressRaw;
        }
    }

    // Fallback: use response itself if it looks like case data
    const plainResponse = toPlainObject(response);
    if (plainResponse && !("success" in plainResponse) && !("message" in plainResponse)) {
        return plainResponse as CaseProgressRaw;
    }

    return null;
};

