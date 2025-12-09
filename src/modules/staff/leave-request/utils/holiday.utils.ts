export const HOLIDAYS_BY_YEAR: Record<number, string[]> = {
    2025: [
        '2025-01-01', // Tết Dương lịch
        // Tết Nguyên đán (29/01 - 02/02)
        '2025-01-29', '2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02',
        // Giỗ Tổ Hùng Vương (10/3 Âm = 07/04 Dương)
        '2025-04-07',
        // Ngày Chiến thắng & Quốc tế Lao động
        '2025-04-30', '2025-05-01',
        // Quốc khánh (02/09 + 01/09)
        '2025-09-01', '2025-09-02'
    ],
    2026: [
        '2026-01-01', // Tết Dương lịch
        // Tết Nguyên đán (17/02 - 21/02)
        '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-21',
        // Giỗ Tổ Hùng Vương (10/3 Âm = 26/04 Dương)
        '2026-04-26',
        // Ngày Chiến thắng & Quốc tế Lao động
        '2026-04-30', '2026-05-01',
        // Quốc khánh (02/09 + 03/09 dự kiến)
        '2026-09-02', '2026-09-03'
    ]
};

export const isHoliday = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const year = date.getFullYear();
    const holidays = HOLIDAYS_BY_YEAR[year];

    // Simple string comparison YYYY-MM-DD
    // Ensure dateString is YYYY-MM-DD
    const dateStr = dateString.split('T')[0];

    return holidays ? holidays.includes(dateStr) : false;
};

export const getHolidaysInRange = (startDateString: string, endDateString: string): string[] => {
    if (!startDateString || !endDateString) return [];

    const start = new Date(startDateString);
    const end = new Date(endDateString);
    const holidaysFound: string[] = [];

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return [];

    const current = new Date(start);
    while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        if (isHoliday(dateStr)) {
            holidaysFound.push(dateStr);
        }
        current.setDate(current.getDate() + 1);
    }

    return holidaysFound;
};
