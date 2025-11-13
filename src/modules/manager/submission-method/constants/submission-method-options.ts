/**
 * Submission Method Options
 */

export const SUBMISSION_METHOD_OPTIONS = {
    ONLINE: 'Nộp trực tuyến',
    DIRECT: 'Nộp trực tiếp',
    POSTAL: 'Nộp qua bưu điện',
    OTHER: 'Khác',
} as const;

export type SubmissionMethodOption = typeof SUBMISSION_METHOD_OPTIONS[keyof typeof SUBMISSION_METHOD_OPTIONS];

export const SUBMISSION_METHOD_OPTIONS_LIST: Array<{ value: string; label: string }> = [
    { value: SUBMISSION_METHOD_OPTIONS.ONLINE, label: SUBMISSION_METHOD_OPTIONS.ONLINE },
    { value: SUBMISSION_METHOD_OPTIONS.DIRECT, label: SUBMISSION_METHOD_OPTIONS.DIRECT },
    { value: SUBMISSION_METHOD_OPTIONS.POSTAL, label: SUBMISSION_METHOD_OPTIONS.POSTAL },
    { value: SUBMISSION_METHOD_OPTIONS.OTHER, label: SUBMISSION_METHOD_OPTIONS.OTHER },
];

