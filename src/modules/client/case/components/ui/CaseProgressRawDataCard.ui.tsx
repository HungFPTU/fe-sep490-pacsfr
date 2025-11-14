'use client';

import type { CaseProgressRaw } from "../../types";

interface CaseProgressRawDataCardProps {
    rawData: CaseProgressRaw | null;
}

const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return value.toString();
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
};

export const CaseProgressRawDataCard: React.FC<CaseProgressRawDataCardProps> = ({ rawData }) => {
    if (!rawData) return null;

    const entries = Object.entries(rawData).filter(([, value]) => value !== undefined && value !== null);
    if (!entries.length) return null;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
                <p className="text-sm text-gray-600">
                    Dữ liệu gốc nhận từ hệ thống được hiển thị để tiện đối chiếu.
                </p>
            </div>

            <div className="max-h-[320px] overflow-y-auto rounded-lg border border-gray-100 bg-gray-50">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <tbody className="divide-y divide-gray-100">
                        {entries.map(([key, value]) => (
                            <tr key={key} className="hover:bg-white">
                                <td className="w-1/3 px-4 py-3 font-medium capitalize text-gray-600">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                </td>
                                <td className="px-4 py-3 text-gray-900">
                                    <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">
                                        {formatValue(value)}
                                    </pre>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

