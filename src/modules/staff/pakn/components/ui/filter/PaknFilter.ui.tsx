'use client';

import React from 'react';
import { ManagerFilterBar } from '@/shared/components/manager/ui/filter/ManagerFilterBar.ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/manager/ui/select';
import { PAKN_STATUS_LABEL } from '../../../constants';

interface Props {
  keyword: string;
  onKeywordChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const PaknFilter: React.FC<Props> = ({
  keyword,
  onKeywordChange,
  status,
  onStatusChange,
  onSearch,
  onReset,
}) => {
  return (
    <ManagerFilterBar
      searchValue={keyword}
      onSearchChange={onKeywordChange}
      onSubmit={onSearch}
      onReset={onReset}
      searchPlaceholder="Tìm kiếm theo mã, tiêu đề..."
    >
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Trạng thái">
            {status === 'ALL' ? 'Tất cả trạng thái' : (PAKN_STATUS_LABEL[status] || 'Trạng thái')}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
          {Object.entries(PAKN_STATUS_LABEL).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ManagerFilterBar>
  );
};

