'use client';

import { useEffect, useState, useCallback } from 'react';
import { columns } from './columns';
import { DataTable } from '@/shared/components/manager/table/BaseTable';
import { Account } from '@/modules/manager/account';
import { accountApiService } from '@/modules/manager/account/services/account.service';

export default function Page() {
  // const [initData, setInitData] = useState<Account | null>(null);
  // const [openCreateModal, setOpenCreateModal] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await accountApiService.getDataAccounts();
      //setAccounts(data ?? []);
    } catch (err) {
      console.error(err);
      setError('Không tải được danh sách tài khoản');
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  },);

  //const handleClose = () => {
  //  setOpenCreateModal(false);
  //  setInitData(null);
  //}

  // const handleEdit = (account: Account) => {
  //   // setOpenCreateModal(true);
  //   // setInitData(account);
  // }

  const handleDelete = async (account: Account) => {
    if (!confirm(`Bạn có chắc muốn xóa tài khoản "${account.fullName}" không?`)) {
      return;
    }

    try {
      await accountApiService.deleteAccount(account.id);
      setAccounts((prev) => prev.filter((acc) => acc.id !== account.id));
      fetch();
    } catch (err) {
      console.error(err);
      setError('Xóa tài khoản thất bại');
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
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
              // setOpenCreateModal(true);
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
        data={accounts}
        // onEdit={(record) => handleEdit(record)}
        onDelete={(record) => handleDelete(record)}
      />
    </div>
  );
}
