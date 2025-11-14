export const CASE_QUERY_KEYS = {
    ROOT: ["client", "case"] as const,
    CASE_PROGRESS: () => [...CASE_QUERY_KEYS.ROOT, "progress"] as const,
} as const;

export const CASE_RECAPTCHA_ACTION = "case_progress_lookup";

