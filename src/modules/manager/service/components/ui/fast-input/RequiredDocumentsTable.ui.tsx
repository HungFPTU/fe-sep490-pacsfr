import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash, FileText, Check, Loader2 } from 'lucide-react';
import { ServiceRequiredDocumentInput } from '../../../types/fast-input.types';
import { requiredDocumentService } from '../../../../required-document/services/required-document.service';
import { RequiredDocument } from '../../../../required-document/types/response';

interface Props {
    documents: ServiceRequiredDocumentInput[];
    onChange: (docs: ServiceRequiredDocumentInput[]) => void;
    isLoading: boolean;
}

interface DocumentAutocompleteProps {
    value: string;
    onSelect: (id: string, name: string) => void;
    onChangeText: (text: string) => void;
    disabled?: boolean;
}

const DocumentAutocomplete: React.FC<DocumentAutocompleteProps> = ({ value, onSelect, onChangeText, disabled }) => {
    const [suggestions, setSuggestions] = useState<RequiredDocument[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchDocuments = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const res = await requiredDocumentService.getRequiredDocuments({
                page: 1,
                size: 5,
                keyword: query,
                isActive: true
            });
            if (res?.data?.items) {
                const rawItems = res.data.items;
                const list = Array.isArray(rawItems) ? rawItems : (rawItems as any).$values || [];
                setSuggestions(list as RequiredDocument[]);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        onChangeText(text);

        // Reset ID when text changes significantly (handled by parent logic usually, but here just notify text change)
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchDocuments(text);
        }, 300);
    };

    const handleSelect = (doc: RequiredDocument) => {
        onSelect(doc.id, doc.docTypeName || doc.description || 'Không có tên');
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                value={value || ''}
                onChange={handleChange}
                onFocus={() => {
                    if (value) searchDocuments(value);
                }}
                placeholder="Tên loại giấy tờ"
                className="w-full text-sm border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border px-2 py-1"
                disabled={disabled}
            />
            {isSearching && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                </div>
            )}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                    {suggestions.map((doc) => (
                        <li
                            key={doc.id}
                            onClick={() => handleSelect(doc)}
                            className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer text-gray-700 flex justify-between items-center"
                        >
                            <span>{doc.docTypeName}</span>
                            {value === doc.docTypeName && <Check className="w-3 h-3 text-blue-500" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

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

    // Special handler for document type to manage both ID and Name
    const handleDocTypeChange = (index: number, id: string | undefined, name: string) => {
        const newDocs = [...documents];
        newDocs[index] = {
            ...newDocs[index],
            docTypeName: name,
            docTypeId: id // Undefined if just typing text, ID if selected
        };
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
                <div className="overflow-visible">
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
                                        <td className="px-3 py-2 relative">
                                            <DocumentAutocomplete
                                                value={doc.docTypeName || ''}
                                                onSelect={(id, name) => handleDocTypeChange(index, id, name)}
                                                onChangeText={(text) => handleDocTypeChange(index, undefined, text)}
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
        </div>
    );
};
