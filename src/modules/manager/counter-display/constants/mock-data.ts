import type { CounterDisplayItem, DisplaySettings } from '../types';

/**
 * Mock data for 10 counters with sample queue numbers
 * Following the reference image layout
 */
export const MOCK_COUNTERS: CounterDisplayItem[] = [
    {
        id: '1',
        counterCode: 'Q1',
        counterName: 'Quầy 1',
        currentQueueNumber: 1023,
        status: 'active',
        staffName: 'Nguyễn Văn A',
    },
    {
        id: '2',
        counterCode: 'Q2',
        counterName: 'Quầy 2',
        currentQueueNumber: 2007,
        status: 'active',
        staffName: 'Trần Thị B',
    },
    {
        id: '3',
        counterCode: 'Q3',
        counterName: 'Quầy 3',
        currentQueueNumber: 4011,
        status: 'active',
        staffName: 'Lê Văn C',
    },
    {
        id: '4',
        counterCode: 'Q4',
        counterName: 'Quầy 4',
        currentQueueNumber: null,
        status: 'inactive',
    },
    {
        id: '5',
        counterCode: 'Q5',
        counterName: 'Quầy 5',
        currentQueueNumber: 5005,
        status: 'active',
        staffName: 'Phạm Thị D',
    },
    {
        id: '6',
        counterCode: 'Q6',
        counterName: 'Quầy 6',
        currentQueueNumber: 6011,
        status: 'active',
        staffName: 'Hoàng Văn E',
    },
    {
        id: '7',
        counterCode: 'Q7',
        counterName: 'Quầy 7',
        currentQueueNumber: 8008,
        status: 'busy',
        staffName: 'Vũ Thị F',
    },
    {
        id: '8',
        counterCode: 'Q8',
        counterName: 'Quầy 8',
        currentQueueNumber: 8008,
        status: 'active',
        staffName: 'Đỗ Văn G',
    },
    {
        id: '9',
        counterCode: 'Q9',
        counterName: 'Quầy 9',
        currentQueueNumber: null,
        status: 'inactive',
    },
    {
        id: '10',
        counterCode: 'Q10',
        counterName: 'Quầy 10',
        currentQueueNumber: null,
        status: 'inactive',
    },
];

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
    title: 'TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG',
    subtitle: 'HỆ THỐNG QUẢN LÝ SỐ THỨ TỰ',
    sessionInfo: 'Buổi Sáng',
    refreshInterval: 5000,
    showClock: true,
    columns: 2,
};
