'use client';

import React, { useState, useRef } from 'react';
import { BaseModal } from '@/shared/components/manager';
import { Button } from '@/shared/components/ui/button.ui';
import { useCreatePaknResponse } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Upload, X, FileText } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  paknId: string | null;
  paknCode?: string;
  paknContent?: string;
  onSuccess?: () => void;
}

export const PaknResponseModal: React.FC<Props> = ({
  open,
  onClose,
  paknId,
  paknCode,
  paknContent,
  onSuccess,
}) => {
  const [responseContent, setResponseContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createMutation = useCreatePaknResponse();
  const toast = useGlobalToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!paknId || !responseContent.trim()) {
      toast.error('Vui lòng nhập nội dung phản hồi');
      return;
    }

    try {
      await createMutation.mutateAsync({
        paknId,
        responseContent: responseContent.trim(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      toast.success('Phản hồi đã được gửi thành công');
      handleReset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Không thể gửi phản hồi. Vui lòng thử lại');
    }
  };

  const handleReset = () => {
    setResponseContent('');
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Phản hồi Phản ánh kiến nghị"
      size="large"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={createMutation.isPending}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!responseContent.trim() || createMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {createMutation.isPending ? 'Đang gửi...' : 'Gửi phản hồi'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-4">
        {paknCode && (
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-sm text-slate-600">
              Mã PAKN: <span className="font-medium text-slate-900">{paknCode}</span>
            </p>
            {/* Nội dung phản ánh */}
            <div className="mt-2">
              <label className="text-sm font-medium text-slate-700">
                Nội dung phản ánh
              </label>
              <p className="mt-1 text-sm text-slate-900">{paknContent}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Nội dung phản hồi <span className="text-red-500">*</span>
          </label>
          <textarea
            value={responseContent}
            onChange={(e) => setResponseContent(e.target.value)}
            className="w-full min-h-[150px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Nhập nội dung phản hồi cho người dân..."
            disabled={createMutation.isPending}
          />
          <p className="text-xs text-slate-500">
            {responseContent.length} ký tự
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Tài liệu đính kèm
          </label>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="pakn-response-attachments"
              disabled={createMutation.isPending}
            />
            <label
              htmlFor="pakn-response-attachments"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              Chọn tệp đính kèm
            </label>

            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-500">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                      disabled={createMutation.isPending}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

