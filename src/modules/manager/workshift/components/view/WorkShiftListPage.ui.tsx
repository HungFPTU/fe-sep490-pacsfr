'use client';

import React, { useState } from 'react';
import { useWorkShifts } from '../../hooks';
import { WorkShiftHeader } from '../ui/header/WorkShiftHeader.ui';
import type { WorkShift } from '../../types';
import { CreateWorkShiftModal } from '../ui/modal/CreateWorkshiftModal.ui';
import { WorkShiftViewModal } from '../ui/modal/WorkShiftViewModal.ui';
import { WorkShiftCalendar } from '../ui/calendar/WorkShiftCalendar.ui';
import { getValuesPage, RestPaged } from '@/types/rest';

export const WorkShiftListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenView, setModalOpenView] = useState(false);
  const [initData, setInitData] = useState<WorkShift | null>(null);

  // Gọi API list (không có filter)
  const { data, refetch, isLoading } = useWorkShifts();

  // Get all workshifts from response
  const pageResult = data ? getValuesPage(data as RestPaged<WorkShift>) : null;
  const workShifts = pageResult?.items || [];

  const handleCreate = () => {
    setInitData(null);
    setModalOpen(true);
  };

  const handleShiftClick = (shift: WorkShift) => {
    setInitData(shift);
    setModalOpenView(true);
  };

  const handleEditFromView = (shift: WorkShift) => {
    setInitData(shift);
    setModalOpenView(false);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    refetch();
  };

  return (
    <div>
      <WorkShiftHeader onCreateClick={handleCreate} />

      {/* Calendar View */}
      <WorkShiftCalendar
        workShifts={workShifts}
        isLoading={isLoading}
        onShiftClick={handleShiftClick}
      />

      {/* View Detail Modal */}
      {modalOpenView && initData && (
        <WorkShiftViewModal
          open={modalOpenView}
          onClose={() => {
            setModalOpenView(false);
            setInitData(null);
          }}
          initData={initData}
          onEdit={handleEditFromView}
          onSuccess={handleModalSuccess}
        />
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <CreateWorkShiftModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setInitData(null);
          }}
          initData={initData}
          existingShifts={workShifts}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};
