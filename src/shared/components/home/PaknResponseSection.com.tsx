'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, FileText, Calendar, User, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { PaknResponseList } from '@/modules/client/pakn-response';
import { formatDate } from '@/shared/lib/utils';

export function PaknResponseSection() {
  const [paknCode, setPaknCode] = useState('');
  const [searchCode, setSearchCode] = useState<string | null>(null);

  const handleSearch = () => {
    if (paknCode.trim()) {
      setSearchCode(paknCode.trim());
    }
  };

  const handleReset = () => {
    setPaknCode('');
    setSearchCode(null);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tra cứu phản hồi Phản ánh kiến nghị
            </h2>
            <p className="text-lg text-gray-600">
              Nhập mã PAKN để xem các phản hồi từ cơ quan chức năng
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  value={paknCode}
                  onChange={(e) => setPaknCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  placeholder="Nhập mã PAKN (ví dụ: PAKN-2025-001234)"
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!paknCode.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Tra cứu
              </Button>
              {searchCode && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              )}
            </div>
          </div>

          {searchCode && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Phản hồi cho mã PAKN: <span className="text-indigo-600">{searchCode}</span>
                </h3>
              </div>
              <PaknResponseList paknCode={searchCode} />
            </div>
          )}

          {!searchCode && (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <FileText className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-gray-600">
                Vui lòng nhập mã PAKN để xem phản hồi
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

