'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { useAssignStaff } from '../../../hooks';
import { useStaffs } from '@/modules/manager/staff/hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { getValues } from '@/types/rest';
import { Search, User, Check, Mail, Phone, Briefcase } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  paknId: string | null;
}

export const AssignStaffModal: React.FC<Props> = ({ open, onClose, paknId }) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const globalToast = useGlobalToast();
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch active staff list
  const { data: staffData, isLoading: isLoadingStaff } = useStaffs({
    IsActive: true,
    RoleType: 'Staff',
    SearchTerm: debouncedSearchTerm,
    Page: 1,
    PageSize: 100,
  });

  const assignStaffMutation = useAssignStaff();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setSelectedStaffId('');
      setSearchTerm('');
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!paknId || !selectedStaffId) return;

    try {
      await assignStaffMutation.mutateAsync({
        paknId,
        staffId: selectedStaffId,
      });
      globalToast.success('Phân công nhân viên thành công');
      onClose();
    } catch (error) {
      globalToast.error('Phân công nhân viên thất bại');
      console.error(error);
    }
  };

  const staffList = staffData ? getValues(staffData) : [];

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Phân công xử lý</h3>
            <p className="text-sm font-normal text-slate-500">Chọn nhân viên phụ trách phản ánh này</p>
          </div>
        </div>
      }
      size="large"
      footer={
        <div className="flex justify-between items-center w-full px-2">
          <div className="text-sm text-slate-500">
            {selectedStaffId ? (
              <span>Đã chọn: <span className="font-medium text-indigo-600">{staffList.find(s => s.id === selectedStaffId)?.fullName}</span></span>
            ) : (
              <span>Chưa chọn nhân viên nào</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="px-6">
              Hủy bỏ
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedStaffId || assignStaffMutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-sm shadow-indigo-200"
            >
              {assignStaffMutation.isPending ? 'Đang xử lý...' : 'Xác nhận phân công'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 py-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Staff List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {isLoadingStaff ? (
            // Loading Skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 border border-slate-100 rounded-xl bg-slate-50 animate-pulse h-[100px]" />
            ))
          ) : staffList.length > 0 ? (
            staffList.map((staff) => {
              const isSelected = selectedStaffId === staff.id;
              return (
                <div
                  key={staff.id}
                  onClick={() => setSelectedStaffId(staff.id)}
                  className={`
                    relative p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                    ${isSelected 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-500/30' 
                      : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-sm hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar / Initials */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                      ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'}
                    `}>
                      {staff.avatarUrl ? (
                        <img src={staff.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        staff.fullName.charAt(0).toUpperCase()
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                          {staff.fullName}
                        </h4>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Briefcase className="w-3 h-3" />
                          <span className="truncate">{staff.position} • {staff.staffCode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{staff.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone className="w-3 h-3" />
                          <span className="truncate">{staff.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 py-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Không tìm thấy nhân viên nào</p>
              <p className="text-slate-400 text-sm mt-1">Vui lòng thử từ khóa khác</p>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
