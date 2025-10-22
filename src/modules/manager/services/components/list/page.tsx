/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { columns } from './columns';
import { DataTable } from '@/shared/components/manager/table/BaseTable';
import { Services } from '../../types';
import { serviceAPI } from '../../services/services.service';
import CreateModal from '../modal/create';
import { getValuesPage } from '@/types/rest';
import ViewModal from '../modal/view';

export default function Page() {
  const [initData, setInitData] = useState<Services | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await serviceAPI.getAllService('', '', '', true, 1, 100);
      if (res?.success) {
         setServices(getValuesPage<Services>(res)?.items ?? []);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error(err);
      setError('Không tải được dữ liệu');
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const handleClose = () => {
    setOpenViewModal(false);
    setOpenCreateModal(false);
    setInitData(null);
  }

  const handleView = (service: Services) => {
    setOpenViewModal(true);
    setInitData(service);
  }

  const handleEdit = (service: Services) => {
    setOpenCreateModal(true);
    setInitData(service);
  }

  const handleDelete = async (service: Services) => {
    if (!confirm(`Bạn có chắc muốn xóa dịch vụ "${service.serviceName}" không?`)) {
      return;
    }

    try {
      await serviceAPI.deleteService(service.id);
      setServices((prev) => prev.filter((srv) => srv.id !== service.id));
      fetch();
    } catch (err) {
      console.error(err);
      setError('Xóa dịch vụ thất bại');
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        <div className="flex gap-2">
          <button
            className="rounded bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
            onClick={fetch}
            disabled={loading}
            title="Tải lại 1 lần"
          >
            {loading ? 'Đang tải…' : 'Tải lại'}
          </button>
          <button
            className="rounded bg-blue-600 px-4 py-1 font-semibold text-white hover:bg-blue-700"
            onClick={() => {
              setOpenCreateModal(true);
            }}
          >
            Tạo
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <DataTable
        columns={columns}
        data={services}
        onView={(record) => handleView(record)}
        onEdit={(record) => handleEdit(record)}
        onDelete={(record) => handleDelete(record)}
      />

      {openViewModal && (
        <ViewModal
          onClose={handleClose}
          initData={initData}
        />
      )}

      {openCreateModal && (
        <CreateModal
          onClose={handleClose}
          fetch={fetch}
          initData={initData}
        />
      )}
      
    </div>
  );
}
