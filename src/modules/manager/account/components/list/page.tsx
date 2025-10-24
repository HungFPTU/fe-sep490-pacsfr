/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { columns } from './columns';
import { DataTable } from '@/shared/components/manager/table/BaseTable';
import CreateModal from '../modal/create';
import { Account, AccountLogin } from '../../types';
import { accountApiService } from '../../services/account.service';
import AssignModal from '../modal/assign';
import { getValues } from '@/types/rest';
import ViewModal from '../modal/view';

const getAccountLogin = (): AccountLogin | null => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem("account");
        if (!raw) return null;
        return JSON.parse(raw) as AccountLogin;
      } catch {
        return null;
      }
    }
    return null;
}

export default function Page() {
  const [initData, setInitData] = useState<Account | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<AccountLogin | null>(null);
  
    useEffect(() => {
      setCurrentAccount(getAccountLogin());
  
      const onStorage = (e: StorageEvent) => {
        if (e.key === 'app:account') {
          setCurrentAccount(getAccountLogin());
        }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }, []);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await accountApiService.getDataAccounts();
      if (res?.success) {
        setAccounts(getValues(res) ?? []);
      } else {
        setAccounts([]);
      }
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
  }, []);

  const handleClose = () => {
    setOpenViewModal(false);
    setOpenAssignModal(false);
    setOpenCreateModal(false);
    setInitData(null);
  }

  const handleAssign = (account: Account) => {
    setOpenAssignModal(true);
    setInitData(account);
  }

  const handleView = (account: Account) => {
    setOpenViewModal(true);
    setInitData(account);
  }
  
  const handleEdit = (account: Account) => {
    setOpenCreateModal(true);
    setInitData(account);
  }

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
        data={accounts}
        buttonOther="Điều chuyển"
        onOther={(record) => handleAssign(record)}
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
          currentAccount={currentAccount}
        />
      )}

      {openAssignModal && (
        <AssignModal
          onClose={handleClose}
          fetch={fetch}
          initData={initData}
        />
      )}
    </div>
  );
}
