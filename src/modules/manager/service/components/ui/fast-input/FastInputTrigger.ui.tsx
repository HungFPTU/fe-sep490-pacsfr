import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { fastInputService } from '../../../services/fast-input.service';
import { FastInputCheckResponse } from '../../../types/fast-input.types';

interface Props {
    onSuccess: (data: FastInputCheckResponse) => void;
}

export const FastInputTrigger: React.FC<Props> = ({ onSuccess }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useGlobalToast();

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Verify file type
        if (!file.name.endsWith('.docx')) {
            toast.error('Vui lòng chọn file .docx');
            return;
        }

        try {
            setIsLoading(true);
            const response = await fastInputService.checkDocx(file);
            toast.success('Đã đọc dữ liệu từ file thành công');
            onSuccess(response);
        } catch (error) {
            console.error('Fast Input Error:', error);
            toast.error('Không thể đọc dữ liệu từ file. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="absolute top-4 right-14 z-10">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".docx"
                className="hidden"
            />
            <button
                type="button"
                onClick={handleButtonClick}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Upload className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Đang xử lý...' : 'Nhập nhanh từ file DOCX'}</span>
            </button>
        </div>
    );
};
