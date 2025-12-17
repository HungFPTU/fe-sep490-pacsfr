/**
 * Vietnamese Holidays Utilities
 * Contains list of official Vietnamese holidays and helper functions
 */

/**
 * Vietnamese holidays for 2025
 * Format: 'MM-DD' (month-day)
 */
export const VIETNAMESE_HOLIDAYS_2025 = [
  '01-01', // Tết Dương lịch (New Year's Day)
  '01-28', // Tết Âm lịch (Lunar New Year's Eve) - 29 Tết
  '01-29', // Mùng 1 Tết (Lunar New Year Day 1)
  '01-30', // Mùng 2 Tết (Lunar New Year Day 2)
  '01-31', // Mùng 3 Tết (Lunar New Year Day 3)
  '02-01', // Mùng 4 Tết (Lunar New Year Day 4)
  '02-02', // Mùng 5 Tết (Lunar New Year Day 5)
  '04-10', // Giỗ Tổ Hùng Vương (Hung Kings' Commemoration Day)
  '04-30', // Ngày Giải phóng miền Nam (Reunification Day)
  '05-01', // Ngày Quốc tế Lao động (International Labor Day)
  '09-02', // Ngày Quốc khánh (National Day)
];

/**
 * Vietnamese holidays for 2026 (for future validation)
 * Note: Lunar calendar dates will vary each year
 */
export const VIETNAMESE_HOLIDAYS_2026 = [
  '01-01', // Tết Dương lịch
  '02-16', // Tết Âm lịch Eve 2026
  '02-17', // Mùng 1 Tết 2026
  '02-18', // Mùng 2 Tết 2026
  '02-19', // Mùng 3 Tết 2026
  '02-20', // Mùng 4 Tết 2026
  '02-21', // Mùng 5 Tết 2026
  '03-29', // Giỗ Tổ Hùng Vương 2026
  '04-30', // Ngày Giải phóng miền Nam
  '05-01', // Ngày Quốc tế Lao động
  '09-02', // Ngày Quốc khánh
];

/**
 * Map of holidays by year
 */
const HOLIDAYS_BY_YEAR: Record<number, string[]> = {
  2025: VIETNAMESE_HOLIDAYS_2025,
  2026: VIETNAMESE_HOLIDAYS_2026,
};

/**
 * Check if a date string (YYYY-MM-DD) is a Vietnamese holiday
 * @param dateString - Date in YYYY-MM-DD format
 * @returns true if the date is a holiday, false otherwise
 */
export const isVietnameseHoliday = (dateString: string): boolean => {
  if (!dateString) return false;

  try {
    const [year, month, day] = dateString.split('-');
    const yearNum = parseInt(year, 10);
    const monthDay = `${month}-${day}`;

    // Get holidays for the specific year, fallback to 2025
    const holidays = HOLIDAYS_BY_YEAR[yearNum] || VIETNAMESE_HOLIDAYS_2025;

    return holidays.includes(monthDay);
  } catch (error) {
    return false;
  }
};

/**
 * Get the name of the holiday for a given date
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Holiday name or null if not a holiday
 */
export const getHolidayName = (dateString: string): string | null => {
  if (!isVietnameseHoliday(dateString)) return null;

  const [, month, day] = dateString.split('-');
  const monthDay = `${month}-${day}`;

  const holidayNames: Record<string, string> = {
    '01-01': 'Tết Dương lịch',
    '01-28': 'Tết Âm lịch (29 Tết)',
    '01-29': 'Tết Âm lịch (Mùng 1)',
    '01-30': 'Tết Âm lịch (Mùng 2)',
    '01-31': 'Tết Âm lịch (Mùng 3)',
    '02-01': 'Tết Âm lịch (Mùng 4)',
    '02-02': 'Tết Âm lịch (Mùng 5)',
    '02-16': 'Tết Âm lịch (29 Tết)',
    '02-17': 'Tết Âm lịch (Mùng 1)',
    '02-18': 'Tết Âm lịch (Mùng 2)',
    '02-19': 'Tết Âm lịch (Mùng 3)',
    '02-20': 'Tết Âm lịch (Mùng 4)',
    '02-21': 'Tết Âm lịch (Mùng 5)',
    '03-29': 'Giỗ Tổ Hùng Vương',
    '04-10': 'Giỗ Tổ Hùng Vương',
    '04-30': 'Ngày Giải phóng miền Nam',
    '05-01': 'Ngày Quốc tế Lao động',
    '09-02': 'Ngày Quốc khánh',
  };

  return holidayNames[monthDay] || 'Ngày lễ';
};

/**
 * Check if a date range contains any Vietnamese holidays
 * @param fromDate - Start date in YYYY-MM-DD format
 * @param toDate - End date in YYYY-MM-DD format
 * @returns Array of holiday dates in the range
 */
export const getHolidaysInRange = (fromDate: string, toDate: string): string[] => {
  if (!fromDate || !toDate) return [];

  const holidays: string[] = [];
  const start = new Date(fromDate);
  const end = new Date(toDate);

  // Iterate through each day in the range
  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    if (isVietnameseHoliday(dateStr)) {
      holidays.push(dateStr);
    }
    current.setDate(current.getDate() + 1);
  }

  return holidays;
};
