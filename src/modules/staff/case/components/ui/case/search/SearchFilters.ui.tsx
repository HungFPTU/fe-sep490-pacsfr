'use client';

import React, { useState } from 'react';
import type { CaseSearchFilters } from '../../../../types/case-search';
import { useCaseStatuses } from '../../../../hooks/useCaseStatuses';
import { useServices } from '../../../../hooks/useServices';
import { useGuests } from '../../../../hooks/useGuests';
import type { GuestItem } from '../../../../api/guest.api';

interface SearchFiltersProps {
  filters: CaseSearchFilters;
  onFilterChange: (key: keyof CaseSearchFilters, value: string | number | undefined) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const DatePickerCalendar: React.FC<{
  value: string;
  onChange: (date: string) => void;
  onClose: () => void;
}> = ({ value, onChange, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Parse dd/mm/yyyy format or use current date
  const getDisplayDate = () => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    }
    return currentDate;
  };

  const displayDate = getDisplayDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleSelectDate = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dd = String(selected.getDate()).padStart(2, '0');
    const mm = String(selected.getMonth() + 1).padStart(2, '0');
    const yyyy = selected.getFullYear();
    onChange(`${dd}/${mm}/${yyyy}`);
    onClose();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const dayNames = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-20 p-3 w-80">
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="px-2 py-1 hover:bg-gray-100 rounded text-sm font-medium"
        >
          ← Trước
        </button>
        <span className="text-sm font-semibold text-center flex-1">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="px-2 py-1 hover:bg-gray-100 rounded text-sm font-medium"
        >
          Sau →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            onClick={() => day && handleSelectDate(day)}
            disabled={!day}
            className={`w-10 h-10 text-sm rounded hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors ${
              day === displayDate.getDate() && currentDate.getMonth() === displayDate.getMonth()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : ''
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onKeyPress,
}) => {
  const { data: caseStatuses = [] } = useCaseStatuses();
  const { data: services = [] } = useServices();
  const [guestSearchKeyword, setGuestSearchKeyword] = useState('');
  const [shouldFetchGuests, setShouldFetchGuests] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const { data: guests = [] } = useGuests(shouldFetchGuests ? guestSearchKeyword : undefined);

  const handleGuestSearch = () => {
    setShouldFetchGuests(true);
    setShowGuestDropdown(true);
  };

  const handleGuestSelect = (guest: GuestItem) => {
    onFilterChange('guestId', guest.id);
    setGuestSearchKeyword(guest.fullName);
    setShowGuestDropdown(false);
  };

  const selectedGuest = guests.find((g) => g.id === filters.guestId);

  const formatDateToISO = (dateValue: string, timeValue: string = '00:00'): string => {
    if (!dateValue) return '';
    // dateValue format: "25/11/2025" from custom date input
    const parts = dateValue.split('/');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    const [hours, minutes] = timeValue.split(':');
    // Convert to: "2025-11-25T00:00:00.0000000Z"
    return `${year}-${month}-${day}T${hours}:${minutes}:00.0000000Z`;
  };

  const formatISOToDate = (isoValue: string): string => {
    if (!isoValue) return '';
    // isoValue format: "2025-11-25T00:00:00.0000000Z"
    // Convert to: "25/11/2025"
    const datePart = isoValue.substring(0, 10); // "2025-11-25"
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (key: 'fromDate' | 'toDate', value: string) => {
    const isoValue = formatDateToISO(value, '00:00');
    onFilterChange(key, isoValue);
  };

  return (
    <div className="space-y-4">
      {/* First Row: Case Code, Guest Name Search, Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Case Code */}
        <div>
          <label htmlFor="caseCode" className="block text-sm font-medium text-gray-700 mb-2">
            Mã hồ sơ
          </label>
          <input
            id="caseCode"
            type="text"
            value={filters.caseCode || ''}
            onChange={(e) => onFilterChange('caseCode', e.target.value || undefined)}
            onKeyPress={onKeyPress}
            placeholder="Nhập mã hồ sơ..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Case Status */}
        <div>
          <label htmlFor="caseStatus" className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            id="caseStatus"
            value={filters.caseStatus || ''}
            onChange={(e) => onFilterChange('caseStatus', e.target.value || undefined)}
            className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Tất cả</option>
            {caseStatuses.map((status) => (
              <option key={status.code} value={status.code}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
            Dịch vụ
          </label>
          <select
            id="serviceId"
            value={filters.serviceId || ''}
            onChange={(e) => onFilterChange('serviceId', e.target.value || undefined)}
            className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Tất cả</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Guest Name Search with Dropdown */}
      <div className="pt-2">
        <label htmlFor="guestSearch" className="block text-sm font-medium text-gray-700 mb-2">
          Tên khách hàng
        </label>
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                id="guestSearch"
                type="text"
                value={guestSearchKeyword || (selectedGuest?.fullName ?? '')}
                onChange={(e) => {
                  setGuestSearchKeyword(e.target.value);
                  setShouldFetchGuests(false);
                  if (filters.guestId) {
                    onFilterChange('guestId', undefined);
                  }
                }}
                placeholder="Nhập tên khách hàng..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${
                    showGuestDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Dropdown List */}
              {showGuestDropdown && guests.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-10">
                  <div className="max-h-48 overflow-y-auto">
                    {guests.map((guest: GuestItem) => (
                      <button
                        key={guest.id}
                        onClick={() => handleGuestSelect(guest)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors flex flex-col border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium text-gray-900">{guest.fullName}</span>
                        <span className="text-xs text-gray-500">
                          {guest.phoneNumber}
                          {guest.idNumber && ` • ${guest.idNumber}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleGuestSearch}
              disabled={!guestSearchKeyword.trim()}
              className="px-4 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Third Row: From Date and To Date */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* From Date */}
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
              Từ ngày
            </label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <input
                  id="fromDate"
                  type="text"
                  value={formatISOToDate(filters.fromDate || '')}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow typing numbers and slashes
                    if (/^[0-9/]*$/.test(value)) {
                      // Auto-format to dd/mm/yyyy
                      let formatted = value.replace(/\D/g, '');
                      if (formatted.length >= 2) {
                        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
                      }
                      if (formatted.length >= 5) {
                        formatted = formatted.substring(0, 5) + '/' + formatted.substring(5, 9);
                      }
                      
                      // When complete (dd/mm/yyyy), convert to ISO
                      if (formatted.length === 10 && /^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) {
                        handleDateChange('fromDate', formatted);
                      }
                    }
                  }}
                  placeholder="dd/mm/yyyy"
                  maxLength={10}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowFromDatePicker(!showFromDatePicker)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Chọn từ lịch"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              {showFromDatePicker && (
                <DatePickerCalendar
                  value={formatISOToDate(filters.fromDate || '')}
                  onChange={(date) => handleDateChange('fromDate', date)}
                  onClose={() => setShowFromDatePicker(false)}
                />
              )}
            </div>
          </div>

          {/* To Date */}
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
              Đến ngày
            </label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <input
                  id="toDate"
                  type="text"
                  value={formatISOToDate(filters.toDate || '')}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow typing numbers and slashes
                    if (/^[0-9/]*$/.test(value)) {
                      // Auto-format to dd/mm/yyyy
                      let formatted = value.replace(/\D/g, '');
                      if (formatted.length >= 2) {
                        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
                      }
                      if (formatted.length >= 5) {
                        formatted = formatted.substring(0, 5) + '/' + formatted.substring(5, 9);
                      }
                      
                      // When complete (dd/mm/yyyy), convert to ISO
                      if (formatted.length === 10 && /^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) {
                        handleDateChange('toDate', formatted);
                      }
                    }
                  }}
                  placeholder="dd/mm/yyyy"
                  maxLength={10}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowToDatePicker(!showToDatePicker)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Chọn từ lịch"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              {showToDatePicker && (
                <DatePickerCalendar
                  value={formatISOToDate(filters.toDate || '')}
                  onChange={(date) => handleDateChange('toDate', date)}
                  onClose={() => setShowToDatePicker(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

