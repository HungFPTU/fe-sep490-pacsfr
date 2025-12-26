'use client';

import { CaseProgressSummaryCard } from '../summary/CaseProgressSummaryCard.ui';
import { CaseProgressTimeline } from '../timeline/CaseProgressTimeline.ui';
import { CaseProgressDetailTable } from '../detail/CaseProgressDetailTable.ui';
import type { CaseProgressResult } from '../../../types';

interface CaseProgressResultProps {
    result: CaseProgressResult | null;
    isLoading?: boolean;
    hasSearched?: boolean;
}

export const CaseProgressResultView: React.FC<CaseProgressResultProps> = ({
    result,
    isLoading = false,
    hasSearched = false,
}) => {
    if (isLoading) {
        return (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 shadow-lg ring-1 ring-black/5">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
                    </div>
                    <div className="text-center">
                        <p className="text-base font-semibold text-slate-900">
                            Đang tra cứu hồ sơ...
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                            Hệ thống đang kết nối và lấy dữ liệu
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (hasSearched && !result) {
        return (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center ring-1 ring-black/5">
                <div className="space-y-2">
                    <p className="font-semibold text-slate-700">Không tìm thấy kết quả</p>
                    <p className="text-sm text-slate-600">
                        Kiểm tra lại mã hồ sơ hoặc liên hệ cơ quan tiếp nhận để được hỗ trợ
                    </p>
                </div>
            </div>
        );
    }

    if (!result) {
        return null;
    }

    return (
        <div className="mt-8 space-y-6">
            <CaseProgressSummaryCard summary={result.summary} message={result.message} />
            {/* <CaseProgressTimeline steps={result.steps} /> */}
            <CaseProgressDetailTable rawData={result.rawData} />
        </div>
    );
};

