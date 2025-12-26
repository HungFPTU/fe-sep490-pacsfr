import React, { useState } from 'react';
import { AlertTriangle, Plus, Save, Check } from 'lucide-react';
import { MissingEntities, MissingItem } from '../../../types/fast-input.types';
import { fastInputService } from '../../../services/fast-input.service';
import { useGlobalToast } from '@/core/patterns/SingletonHook';

interface Props {
    missingEntities: MissingEntities;
    onEntityCreated: (type: string, originalData: any, newId: string) => void;
}

// Helper to extract list from simple array or $values wrapper
const getList = <T,>(input: any): T[] => {
    if (!input) return [];
    if (Array.isArray(input)) return input;
    if (input.$values && Array.isArray(input.$values)) return input.$values;
    return [];
};

interface EntityRowProps {
    item: MissingItem;
    type: string;
    onSuccess: (type: string, originalData: any, newId: string) => void;
}

const getInitialFormData = (type: string, data: any) => {
    switch (type) {
        case 'legislationDocument':
            return {
                documentNumber: data.soKyHieu || '',
                name: data.trichYeu || '',
                issueDate: data.ngayBanHanh || '',
                issueBody: data.coQuanBanHanh || 'Chính Phủ',
                documentType: 'Quyết định',
                effectiveDate: data.ngayBanHanh || ''
            };
        case 'docsType':
            return {
                docTypeName: data.tenGiayTo || '',
                description: 'Tài liệu được hệ thống tạo tự động từ chức năng nhập nhanh, phục vụ việc lập và quản lý hồ sơ theo quy định.'
            };
        case 'submissionMethod':
            return {
                submissionMethodName: data.hinhThuc || '',
                description: data.moTa || `Thời hạn: ${data.thoiHan || ''}, Phí: ${data.phiLePhi || ''}`
            };
        case 'serviceAgency':
            return {
                agencyName: typeof data === 'string' ? data : (data.coQuan || ''),
                description: 'Tài liệu được hệ thống tạo tự động từ chức năng nhập nhanh, phục vụ việc lập và quản lý hồ sơ theo quy định.'
            };
        default:
            return {};
    }
};

const EntityRow: React.FC<EntityRowProps> = ({ item, type, onSuccess }) => {
    const toast = useGlobalToast();
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<any>(() => getInitialFormData(type, item.originalData || {}));

    React.useEffect(() => {
        setFormData(getInitialFormData(type, item.originalData || {}));
    }, [item.originalData, type]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleCreate = async () => {
        setIsCreating(true);
        try {
            let result;
            const normalizeDate = (dateStr: string) => {
                if (!dateStr) return undefined;
                const parts = dateStr.split(/[-/]/);
                if (parts.length === 3) {
                    if (parseInt(parts[0]) > 1900) return dateStr;
                    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                }
                return dateStr;
            };

            if (type === 'legislationDocument') {
                result = await fastInputService.createLegislationDocument({
                    documentNumber: formData.documentNumber,
                    name: formData.name,
                    issueDate: normalizeDate(formData.issueDate),
                    issueBody: formData.issueBody,
                    documentType: formData.documentType,
                    effectiveDate: normalizeDate(formData.effectiveDate)
                });
            } else if (type === 'docsType') {
                result = await fastInputService.createDocsType({
                    docTypeName: formData.docTypeName,
                    description: formData.description,
                    isRequired: false
                });
            } else if (type === 'submissionMethod') {
                result = await fastInputService.createSubmissionMethod({
                    submissionMethodName: formData.submissionMethodName,
                    description: formData.description
                });
            } else if (type === 'serviceAgency') {
                result = await fastInputService.createServiceAgency({
                    agencyName: formData.agencyName,
                    description: formData.description
                });
            }

            // Handle response safely
            if (result) {
                const resAny = result as any;
                const newId = resAny.data || (resAny.success && resAny.data) ? (typeof resAny.data === 'string' ? resAny.data : resAny.data?.id) : null;

                if (newId) {
                    toast.success(`Đã tạo mới: ${item.name}`);
                    onSuccess(type, item.originalData, newId);
                } else {

                    if (typeof result === 'string') {
                        toast.success(`Đã tạo mới: ${item.name}`);
                        onSuccess(type, item.originalData, result);
                        return;
                    }
                    throw new Error('No ID returned from API');
                }
            }
        } catch (error) {
            console.error('Quick create error:', error);
            toast.error(`Không thể tạo: ${item.name}`);
        } finally {
            setIsCreating(false);
        }
    };

    const renderInputs = () => {
        switch (type) {
            case 'legislationDocument':
                return (
                    <>
                        <div className="col-span-1">
                            <label className="text-xs text-amber-800 font-medium">Số ký hiệu</label>
                            <input
                                type="text"
                                value={formData.documentNumber}
                                onChange={e => handleChange('documentNumber', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-xs text-amber-800 font-medium">Ngày ban hành</label>
                            <input
                                type="text"
                                value={formData.issueDate}
                                onChange={e => handleChange('issueDate', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-xs text-amber-800 font-medium">Cơ quan ban hành</label>
                            <input
                                type="text"
                                value={formData.issueBody}
                                onChange={e => handleChange('issueBody', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-xs text-amber-800 font-medium">Loại văn bản</label>
                            <input
                                type="text"
                                value={formData.documentType}
                                onChange={e => handleChange('documentType', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-xs text-amber-800 font-medium">Ngày hiệu lực</label>
                            <input
                                type="text"
                                value={formData.effectiveDate}
                                onChange={e => handleChange('effectiveDate', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Trích yếu</label>
                            <textarea
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                rows={2}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white resize-none"
                            />
                        </div>
                    </>
                );
            case 'docsType':
                return (
                    <>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Tên loại giấy tờ</label>
                            <input
                                type="text"
                                value={formData.docTypeName}
                                onChange={e => handleChange('docTypeName', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Mô tả</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                    </>
                );
            case 'submissionMethod':
                return (
                    <>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Tên hình thức</label>
                            <input
                                type="text"
                                value={formData.submissionMethodName}
                                onChange={e => handleChange('submissionMethodName', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Chi tiết (Thời hạn, phí...)</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                    </>
                );
            case 'serviceAgency':
                return (
                    <>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Tên cơ quan</label>
                            <input
                                type="text"
                                value={formData.agencyName}
                                onChange={e => handleChange('agencyName', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-amber-800 font-medium">Mô tả</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                                className="w-full text-xs border-amber-300 rounded focus:border-amber-500 focus:ring-0 px-2 py-1 bg-white"
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-amber-100/40 p-3 rounded border border-amber-200 mb-2 last:mb-0 flex items-start justify-between">
            <div className="flex-1 mr-4">
                <p className="text-sm font-bold text-amber-900 mb-1">{item.name}</p>
                <div className="text-xs text-amber-800 space-y-1">
                    {/* Render details based on type */}
                    {type === 'legislationDocument' && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            <p><span className="font-semibold">Số ký hiệu:</span> {formData.documentNumber}</p>
                            <p><span className="font-semibold">Ngày ban hành:</span> {formData.issueDate}</p>
                            <p><span className="font-semibold">Cơ quan:</span> {formData.issueBody}</p>
                            <p><span className="font-semibold">Loại:</span> {formData.documentType}</p>
                        </div>
                    )}
                    {type === 'docsType' && (
                        <div>
                            <p><span className="font-semibold">Mô tả:</span> {formData.description}</p>
                        </div>
                    )}
                    {type === 'submissionMethod' && (
                        <div>
                            <p><span className="font-semibold">Chi tiết:</span> {formData.description}</p>
                        </div>
                    )}
                    {type === 'serviceAgency' && (
                        <div>
                            <p><span className="font-semibold">Mô tả:</span> {formData.description}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end flex-shrink-0 mt-0.5">
                <button
                    type="button"
                    onClick={handleCreate}
                    disabled={isCreating}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-600 text-white text-xs rounded hover:bg-amber-700 transition-colors disabled:bg-amber-400 whitespace-nowrap"
                >
                    {isCreating ? (
                        <span className="animate-pulse">Đang tạo...</span>
                    ) : (
                        <>
                            <Plus className="w-3 h-3" />
                            <span>Tạo & Sử dụng</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export const MissingEntitiesPanel: React.FC<Props> = ({ missingEntities, onEntityCreated }) => {


    const hasMissingItems =
        getList(missingEntities.legislationDocuments).length > 0 ||
        getList(missingEntities.docsTypes).length > 0 ||
        getList(missingEntities.submissionMethods).length > 0 ||
        getList(missingEntities.serviceAgencies).length > 0;

    if (!hasMissingItems) return null;

    const renderSection = (title: string, itemsInput: any, type: string) => {
        const items = getList<MissingItem>(itemsInput);
        if (items.length === 0) return null;
        return (
            <div className="mb-4 last:mb-0">
                <h4 className="text-sm font-semibold text-amber-800 mb-2 border-b border-amber-200 pb-1">{title}</h4>
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <EntityRow
                            key={`${type}-${index}-${item.name}`}
                            item={item}
                            type={type}
                            onSuccess={onEntityCreated}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-base font-medium text-amber-800">
                        Phát hiện dữ liệu chưa có trong hệ thống
                    </h3>
                    <p className="text-sm text-amber-700 mt-0.5">
                        Một số mục từ file DOCX chưa tồn tại trong cơ sở dữ liệu. Vui lòng kiểm tra và tạo mới.
                    </p>
                </div>
            </div>

            <div className="mt-4 pl-0 md:pl-8">
                {renderSection('Văn bản pháp luật', missingEntities.legislationDocuments, 'legislationDocument')}
                {renderSection('Loại giấy tờ (Hồ sơ)', missingEntities.docsTypes, 'docsType')}
                {renderSection('Cách thức thực hiện', missingEntities.submissionMethods, 'submissionMethod')}
                {renderSection('Cơ quan thực hiện', missingEntities.serviceAgencies, 'serviceAgency')}
            </div>
        </div>
    );
};
