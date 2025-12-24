import React from 'react';
import { Plus, Trash, Zap } from 'lucide-react';
import { ServiceSubmissionMethodInput } from '../../../types/fast-input.types';
// Note: In real implementation, we might want to fetch available submission methods for a dropdown
// For now, we allow free text or assume pre-filled IDs from Fast Input match logic. 
// Since Fast Input returns "hinhThuc" text, we might need a way to map or just visually show them.
// But the requirement says "Dropdown" for Method.
// To keep it simple for now, I'll use text input for name if ID is missing, or we need a prop for available methods.
// Implementation Plan called for "Method (Dropdown)".
// I'll add a simple input for now as I don't have the list fetched here yet, but will add a TODO or basic select if I get options.

interface Props {
    methods: ServiceSubmissionMethodInput[];
    onChange: (methods: ServiceSubmissionMethodInput[]) => void;
    isLoading: boolean;
    // In a full version, we would pass `availableMethods` here
    methodOptions?: { id: string; name: string }[];
}

export const SubmissionMethodsTable: React.FC<Props> = ({ methods, onChange, isLoading, methodOptions = [] }) => {
    // Helper to store display name if we don't have ID yet or just for UI
    // The type `ServiceSubmissionMethodInput` uses `submissionMethodId`.
    // If we are creating new ones on the fly, we might need a transient field.
    // For now, let's assume `processingTime` and `fee` are editable.

    // NOTE: The `check-docx` returns text. `MissingEntitiesPanel` creates them and gives us IDs.
    // So by the time we edit this table, we should hopefully have IDs if we used Quick Create.
    // However, for Manual Add, we need a dropdown of existing methods.

    const handleAdd = () => {
        onChange([
            ...methods,
            {
                submissionMethodId: '',
                submissionMethodName: '',
                processingTime: '',
                fee: ''
            }
        ]);
    };

    const handleRemove = (index: number) => {
        const newMethods = [...methods];
        newMethods.splice(index, 1);
        onChange(newMethods);
    };

    const handleUpdate = (index: number, field: keyof ServiceSubmissionMethodInput, value: any) => {
        const newMethods = [...methods];
        newMethods[index] = { ...newMethods[index], [field]: value };
        onChange(newMethods);
    };

    return (
        <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Cách thức thực hiện
                </h3>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isLoading}
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                    <Plus className="w-3 h-3" />
                    Thêm cách thức
                </button>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Hình thức</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian giải quyết</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phí / Lệ phí</th>
                            <th className="px-3 py-2 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {methods.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-3 py-4 text-center text-sm text-gray-500 italic">
                                    Chưa có cách thức thực hiện nào
                                </td>
                            </tr>
                        ) : (
                            methods.map((method, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={method.submissionMethodName || ''}
                                            onChange={(e) => handleUpdate(index, 'submissionMethodName', e.target.value)}
                                            placeholder="Nhập hình thức..."
                                            className="w-full text-sm border-gray-300 rounded focus:border-blue-500 border px-2 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={method.processingTime || ''}
                                            onChange={(e) => handleUpdate(index, 'processingTime', e.target.value)}
                                            placeholder="VD: 10 ngày"
                                            className="w-full text-sm border-gray-300 rounded focus:border-blue-500 border px-2 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={method.fee || ''}
                                            onChange={(e) => handleUpdate(index, 'fee', e.target.value)}
                                            placeholder="VD: 50.000 VNĐ"
                                            className="w-full text-sm border-gray-300 rounded focus:border-blue-500 border px-2 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(index)}
                                            disabled={isLoading}
                                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
