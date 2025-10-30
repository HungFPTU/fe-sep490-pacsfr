'use client';

import React, { useState } from 'react';
import { useWorkShifts, useDeleteWorkShift } from '../../hooks';
import { WorkShiftHeader } from '../ui/header/WorkShiftHeader.ui';
import { WorkShiftFilter } from '../ui/filter/WorkShiftFilter.ui';
import { WorkShiftPagination } from '../ui/pagination/WorkShiftPagination.ui';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValues, getValuesPage, RestMany, RestPaged } from '@/types/rest';
import type { Counter, Staff, WorkShift } from '../../types';
import { CreateWorkShiftModal } from '../ui/modal/CreateWorkshiftModal.ui';
import { useCounters, useStaffs } from '@/modules/manager/staff';
import { WorkShiftTable } from '../ui/table/WorkShiftTable.ui';
import { WorkShiftViewModal } from '../ui/modal/WorkShiftViewModal.ui';

const SHIFT_TYPE_OPTIONS = [
  { value: '', label: '— Tất cả loại ca —' },
  { value: 'Sáng', label: 'Sáng' },
  { value: 'Chiều', label: 'Chiều' },
  { value: 'Cả ngày', label: 'Cả ngày' },
];

export const WorkShiftListPage: React.FC = () => {
  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters theo API
  const [keyword, setKeyword] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [counterId, setCounterId] = useState<string>('');
  const [staffId, setStaffId] = useState<string>('');
  const [shiftType, setShiftType] = useState<string>('');
  const [shiftDate, setShiftDate] = useState<string>(''); // YYYY-MM-DD
  const [fromTime, setFromTime] = useState<string>(''); // HH:mm
  const [toTime, setToTime] = useState<string>(''); // HH:mm
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenView, setModalOpenView] = useState(false);
  const [initData, setInitData] = useState<WorkShift | null>(null);

  // Dữ liệu select
  const { data: orgStaffData } = useStaffs({ PageSize: 100 });
  const { data: orgCounterData } = useCounters();

  const orgStaff = getValuesPage(orgStaffData as RestPaged<Staff>);
  const orgCounters = getValues(orgCounterData as RestMany<Counter>);

  const staffOptions = (orgStaff?.items?.map((s) => ({
    value: s.id as string,
    label: s.fullName,
  })) ?? []) as { value: string; label: string }[];

  const counterOptions = (orgCounters?.map((c) => ({
    value: c.id,
    label: c.counterName || c.id,
  })) ?? []) as { value: string; label: string }[];

  // Gọi API list (hook của bạn)
  const { data, refetch, isLoading } = useWorkShifts({
    keyword: keyword || undefined,
    counterId: counterId || undefined,
    staffId: staffId || undefined,
    shiftType: shiftType || undefined,
    shiftDate: shiftDate ? new Date(shiftDate).toISOString() : undefined,
    fromTime: fromTime || undefined,
    toTime: toTime || undefined,
    isActive,
    page,
    size: pageSize,
  });

  const deleteMutation = useDeleteWorkShift();
  const { addToast } = useGlobalToast();

  const handleCreate = () => setModalOpen(true);

  const handleEdit = (data: WorkShift) => {
    setInitData(data);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa ca làm việc này?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          addToast({ message: 'Xóa ca làm việc thành công', type: 'success' });
          refetch();
        },
        onError: () => addToast({ message: 'Xóa ca làm việc thất bại', type: 'error' }),
      });
    }
  };

  const pageResult = data ? getValuesPage(data as RestPaged<WorkShift>) : null;
  const workShifts = pageResult?.items || [];
  const total = pageResult?.total || 0;
  const totalPages = pageResult?.totalPages || 1;

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };
  const handleModalSuccess = () => refetch();

  // Reset về trang 1 khi đổi filter quan trọng
  const touchAndGoFirstPage = () => setPage(1);

  return (
    <div className="p-6">
      <WorkShiftHeader onCreateClick={handleCreate} />

      <WorkShiftFilter
        // text
        keyword={keyword}
        onKeywordChange={(v) => {
          setKeyword(v);
          touchAndGoFirstPage();
        }}
        // select trạng thái
        isActive={isActive}
        onStatusChange={(v) => {
          setIsActive(v);
          touchAndGoFirstPage();
        }}
        // counter
        counterId={counterId}
        onCounterChange={(v) => {
          setCounterId(v);
          touchAndGoFirstPage();
        }}
        counterOptions={[{ value: '', label: '— Tất cả quầy —' }, ...counterOptions]}
        // staff
        staffId={staffId}
        onStaffChange={(v) => {
          setStaffId(v);
          touchAndGoFirstPage();
        }}
        staffOptions={[{ value: '', label: '— Tất cả nhân viên —' }, ...staffOptions]}
        // shift type
        shiftType={shiftType}
        onShiftTypeChange={(v) => {
          setShiftType(v);
          touchAndGoFirstPage();
        }}
        shiftTypeOptions={SHIFT_TYPE_OPTIONS}
        // date & time
        shiftDate={shiftDate}
        onShiftDateChange={(v) => {
          setShiftDate(v);
          touchAndGoFirstPage();
        }}
        fromTime={fromTime}
        onFromTimeChange={(v) => {
          setFromTime(v);
          touchAndGoFirstPage();
        }}
        toTime={toTime}
        onToTimeChange={(v) => {
          setToTime(v);
          touchAndGoFirstPage();
        }}
        // utility
        onClear={() => {
          setKeyword('');
          setCounterId('');
          setStaffId('');
          setShiftType('');
          setShiftDate('');
          setFromTime('');
          setToTime('');
          setIsActive(true);
          setPage(1);
        }}
      />

      {/* Data Table */}
      <WorkShiftTable
        data={workShifts}
        isLoading={isLoading}
        counters={orgCounters} // mảng Counter lấy từ API counters
        staffs={orgStaff?.items} // mảng Staff lấy từ API staffs (nếu phân trang thì truyền items)
        onView={(ws) => {
          setInitData(ws);
          setModalOpenView(true);
        }}
        onEdit={(ws) => handleEdit(ws)}
        onDelete={(ws) => handleDelete(ws.id)}
      />

      {total > 0 && (
        <WorkShiftPagination
          page={page}
          pageSize={pageSize}
          total={total}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      {modalOpenView && (
        <WorkShiftViewModal
          open={modalOpenView}
          onClose={() => setModalOpenView(false)}
          initData={initData}
          counters={orgCounters}
          staffs={orgStaff?.items}
        />
      )}

      {modalOpen && (
        <CreateWorkShiftModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initData={initData}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};
