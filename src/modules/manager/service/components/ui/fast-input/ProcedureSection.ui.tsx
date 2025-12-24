import React from 'react';
import { ClipboardList } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    isLoading: boolean;
}

export const ProcedureSection: React.FC<Props> = ({ value, onChange, isLoading }) => {
    return (
        <div className="space-y-2 mt-4">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Trình tự thực hiện
            </h3>
            <div className="w-full">
                <textarea
                    className="w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 min-h-[150px]"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Mô tả các bước thực hiện dịch vụ..."
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};
