export const HOLIDAYS_MAP: Record<string, string> = {
    // 2025
    '2025-01-01': 'Tết Dương lịch',
    '2025-01-29': 'Tết Nguyên đán', '2025-01-30': 'Tết Nguyên đán', '2025-01-31': 'Tết Nguyên đán',
    '2025-02-01': 'Tết Nguyên đán', '2025-02-02': 'Tết Nguyên đán',
    '2025-04-07': 'Giỗ Tổ Hùng Vương',
    '2025-04-30': 'Tổng tuyển cử', '2025-05-01': 'Quốc tế Lao động',
    '2025-09-01': 'Quốc khánh', '2025-09-02': 'Quốc khánh',

    // 2026
    '2026-01-01': 'Tết Dương lịch',
    '2026-02-17': 'Tết Nguyên đán', '2026-02-18': 'Tết Nguyên đán', '2026-02-19': 'Tết Nguyên đán',
    '2026-02-20': 'Tết Nguyên đán', '2026-02-21': 'Tết Nguyên đán',
    '2026-04-26': 'Giỗ Tổ Hùng Vương',
    '2026-04-30': 'Tổng tuyển cử', '2026-05-01': 'Quốc tế Lao động',
    '2026-09-02': 'Quốc khánh', '2026-09-03': 'Quốc khánh'
};

export const getHolidayName = (dateString: string): string | null => {
    if (!dateString) return null;
    const dateStr = dateString.split('T')[0];
    return HOLIDAYS_MAP[dateStr] || null;
};

export const isHoliday = (dateString: string): boolean => {
    return !!getHolidayName(dateString);
};
