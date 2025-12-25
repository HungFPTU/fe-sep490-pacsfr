import React from 'react';
import { Plus, Trash, FileText } from 'lucide-react';
import { ServiceRequiredDocumentInput } from '../../../types/fast-input.types';

interface Props {
    documents: ServiceRequiredDocumentInput[];
    onChange: (docs: ServiceRequiredDocumentInput[]) => void;
    isLoading: boolean;
}

export const RequiredDocumentsTable: React.FC<Props> = ({ documents, onChange, isLoading }) => {
    const handleAdd = () => {
        onChange([
            ...documents,
            {
                docTypeName: '',
                quantityOriginal: 1,
                quantityCopy: 0,
                description: '',
                note: ''
            }
        ]);
    };

    const handleRemove = (index: number) => {
        const newDocs = [...documents];
        newDocs.splice(index, 1);
        onChange(newDocs);
    };

    const handleUpdate = (index: number, field: keyof ServiceRequiredDocumentInput, value: any) => {
        const newDocs = [...documents];
        newDocs[index] = { ...newDocs[index], [field]: value };
        onChange(newDocs);
    };

    return (
        <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Thành phần hồ sơ
                </h3>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isLoading}
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                    <Plus className="w-3 h-3" />
                    Thêm giấy tờ
                </button>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Tên giấy tờ</th>
                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Bản chính</th>
                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Bản sao</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú / Mẫu đơn</th>
                            <th className="px-3 py-2 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-3 py-4 text-center text-sm text-gray-500 italic">
                                    Chưa có thành phần hồ sơ nào
                                </td>
                            </tr>
                        ) : (
                            documents.map((doc, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={doc.docTypeName || ''}
                                            onChange={(e) => handleUpdate(index, 'docTypeName', e.target.value)}
                                            placeholder="Tên loại giấy tờ"
                                            className="w-full text-sm border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border px-2 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={doc.quantityOriginal}
                                            onChange={(e) => handleUpdate(index, 'quantityOriginal', parseInt(e.target.value) || 0)}
                                            className="w-full text-sm text-center border-gray-300 rounded focus:border-blue-500 border px-1 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={doc.quantityCopy}
                                            onChange={(e) => handleUpdate(index, 'quantityCopy', parseInt(e.target.value) || 0)}
                                            className="w-full text-sm text-center border-gray-300 rounded focus:border-blue-500 border px-1 py-1"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={doc.note || ''}
                                            onChange={(e) => handleUpdate(index, 'note', e.target.value)}
                                            placeholder="Ghi chú thêm"
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
