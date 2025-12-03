/**
 * Modern, luxury header component for WorkShift management
 * Features gradient design and smooth interactions
 */

'use client';

import React from 'react';
import { Plus, Calendar, Sparkles } from 'lucide-react';

interface WorkShiftHeaderProps {
  onCreateClick: () => void;
}

export const WorkShiftHeader: React.FC<WorkShiftHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="mb-8">
      {/* Gradient background card */}
      <div className="relative overflow-hidden rounded-2xl bg-indigo-600 p-8 shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              
              </div>

              <h1 className="mb-2 text-3xl font-bold text-white">
                Quản Lý Ca Làm Việc
              </h1>
              <p className="max-w-2xl text-base text-indigo-100">
                Lập lịch và phân công nhân viên một cách hiệu quả với giao diện hiện đại
              </p>

              {/* Stats */}
              {/* <div className="mt-6 flex gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">24</span>
                  <span className="text-sm text-indigo-200">Ca làm việc</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">18</span>
                  <span className="text-sm text-indigo-200">Nhân viên</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">95%</span>
                  <span className="text-sm text-indigo-200">Hiệu suất</span>
                </div>
              </div> */}
            </div>

            {/* Create button */}
            <button
              onClick={onCreateClick}
              className="group relative overflow-hidden rounded-xl bg-white px-6 py-3 font-bold text-indigo-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-indigo-300 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-2">
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                <span>Tạo Ca Mới</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
