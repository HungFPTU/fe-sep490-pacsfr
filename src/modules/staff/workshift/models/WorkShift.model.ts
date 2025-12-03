/**
 * WorkShift Domain Model
 * Encapsulates business logic related to work shifts
 */

import type { WorkShift } from '../types';

export class WorkShiftModel {
  constructor(private readonly data: WorkShift) {}

  get id(): string {
    return this.data.id;
  }

  get shiftDate(): Date {
    const date = (this.data.shiftDate || this.data.workDate) as unknown as string | Date;
    if (!date) return new Date();
    
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  }

  get shiftType(): string {
    return this.data.shiftType;
  }

  get startTime(): string {
    return this.data.startTime;
  }

  get endTime(): string {
    return this.data.endTime;
  }

  /**
   * Check if this is a full-day shift
   */
  isFullDay(): boolean {
    return this.data.shiftType === 'Cả ngày';
  }

  /**
   * Check if this is a morning shift
   */
  isMorning(): boolean {
    return this.data.shiftType === 'Sáng';
  }

  /**
   * Check if this is an afternoon shift
   */
  isAfternoon(): boolean {
    return this.data.shiftType === 'Chiều';
  }

  /**
   * Get a formatted date string
   */
  getFormattedDate(): string {
    return this.shiftDate.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  }

  /**
   * Get a formatted time range
   */
  getTimeRange(): string {
    return `${this.startTime} - ${this.endTime}`;
  }

  /**
   * Get display color based on shift type
   */
  getDisplayColor(): string {
    if (this.isFullDay()) return 'indigo';
    if (this.isMorning()) return 'amber';
    if (this.isAfternoon()) return 'purple';
    return 'gray';
  }

  /**
   * Get emoji icon for shift type
   */
  getIcon(): string {
    if (this.isFullDay()) return '☀️';
    if (this.isMorning()) return '🌅';
    if (this.isAfternoon()) return '🌆';
    return '📅';
  }

  /**
   * Convert back to plain data
   */
  toData(): WorkShift {
    return this.data;
  }
}
