'use client';

import { CaseProgressSummaryCard } from "./CaseProgressSummaryCard.ui";
import { CaseProgressTimeline } from "./CaseProgressTimeline.ui";
import { CaseProgressRawDataCard } from "./CaseProgressRawDataCard.ui";
import type { CaseProgressResult } from "../../types";

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
            <div className="mt-10 rounded-xl border border-gray-200 bg-white p-10 shadow-lg">
                <div className="flex flex-col items-center gap-4 text-gray-600">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
                    <div className="text-center">
                        <p className="text-base font-semibold text-gray-700">
                            Đang tra cứu dữ liệu hồ sơ...
                        </p>
                        <p className="text-sm text-gray-500">
                            Vui lòng chờ trong giây lát, hệ thống đang kết nối tới máy chủ.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (hasSearched && !result) {
        return (
            <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 shadow-inner">
                Không tìm thấy thông tin hồ sơ. Bạn vui lòng kiểm tra lại Mã số hồ sơ hoặc liên hệ
                cơ quan tiếp nhận để được hỗ trợ.
            </div>
        );
    }

    if (!result) {
        return null;
    }

    return (
        <div className="mt-10 space-y-8">
            <CaseProgressSummaryCard summary={result.summary} message={result.message} />
            <CaseProgressTimeline steps={result.steps} />
            <CaseProgressRawDataCard rawData={result.rawData} />
        </div>
    );
};

