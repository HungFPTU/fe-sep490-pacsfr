'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { ServiceForm } from './ServiceForm.ui';
import { useServiceForm } from '../../../hooks/useServiceForm';
import { useCreateService, useUpdateService } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import type { Service, CreateServiceRequest, UpdateServiceRequest } from '../../../types';
import {
    FastInputCheckResponse,
    MissingEntities,
    ServiceRequiredDocumentInput,
    ServiceSubmissionMethodInput,
    FastInputCreateServiceRequest,
    ServiceProcedureInput,
    MissingItem,
    ExtractedDocument
} from '../../../types/fast-input.types';
import { fastInputService } from '../../../services/fast-input.service';
import { FastInputTrigger } from '../fast-input/FastInputTrigger.ui';
import { MissingEntitiesPanel } from '../fast-input/MissingEntitiesPanel.ui';
import { RequiredDocumentsTable } from '../fast-input/RequiredDocumentsTable.ui';
import { SubmissionMethodsTable } from '../fast-input/SubmissionMethodsTable.ui';
import { ProcedureSection } from '../fast-input/ProcedureSection.ui';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: Service | null;
}

export const CreateServiceModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
}) => {
    const toast = useGlobalToast();
    const createMutation = useCreateService();
    const updateMutation = useUpdateService();

    // Fast Input State
    const [missingEntities, setMissingEntities] = useState<MissingEntities | null>(null);
    const [requiredDocuments, setRequiredDocuments] = useState<ServiceRequiredDocumentInput[]>([]);
    const [submissionMethods, setSubmissionMethods] = useState<ServiceSubmissionMethodInput[]>([]);
    const [procedure, setProcedure] = useState<string>('');
    const [isFastInputMode, setIsFastInputMode] = useState(false);
    const [createdAgencyIds, setCreatedAgencyIds] = useState<string[]>([]);

    // Helper to extract list from simple array or $values wrapper
    const getList = <T,>(input: any): T[] => {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        if (input.$values && Array.isArray(input.$values)) return input.$values;
        return [];
    };

    const handleSubmit = async (data: CreateServiceRequest | UpdateServiceRequest) => {
        try {
            let res;
            // If ID exists, it's an update (standard flow usually)
            if ('id' in data) {
                res = await updateMutation.mutateAsync({
                    id: data.id,
                    request: data as UpdateServiceRequest,
                });
                if (res?.success) {
                    toast.success('Cập nhật dịch vụ thành công');
                } else {
                    toast.error('Cập nhật dịch vụ thất bại');
                    return;
                }
            } else {
                // Create Flow
                if (isFastInputMode || requiredDocuments.length > 0 || submissionMethods.length > 0) {

                    // Validate Required Documents (Must have ID)
                    for (const doc of requiredDocuments) {
                        if (!doc.docTypeId) {
                            toast.error(`Vui lòng tạo hoặc chọn loại giấy tờ cho: ${doc.docTypeName}`);
                            return;
                        }
                    }

                    // Pre-process: Ensure all Submission Methods have IDs
                    const processedSubmissionMethods = await Promise.all(submissionMethods.map(async (method) => {
                        if (!method.submissionMethodId) {
                            try {
                                const newMethodRes = await fastInputService.createSubmissionMethod({
                                    submissionMethodName: method.submissionMethodName || 'Chưa đặt tên',
                                    description: method.description || `Thời hạn: ${method.processingTime || ''}, Phí: ${method.fee || ''}`
                                });
                                // Handle response similar to MissingEntitiesPanel
                                const resAny = newMethodRes as any;
                                const newId = resAny.data || (resAny.success && resAny.data) ? (typeof resAny.data === 'string' ? resAny.data : resAny.data?.id) : null;

                                if (newId) {
                                    return { ...method, submissionMethodId: newId };
                                } else if (typeof newMethodRes === 'string') { // string fallback
                                    return { ...method, submissionMethodId: newMethodRes };
                                }
                                return method; // Failed to create? warning?
                            } catch (e) {
                                console.error('Failed to auto-create submission method', e);
                                return method;
                            }
                        }
                        return method;
                    }));

                    // Use Fast Input API
                    const fastInputRequest: FastInputCreateServiceRequest = {
                        ...(data as CreateServiceRequest),
                        condition: (data as CreateServiceRequest).condition || '',
                        requiredDocuments: requiredDocuments.map(d => ({
                            // If docTypeId is missing, valid GUID 00... might be safer or undefined if allowed. 
                            // User expected payload has docTypeId.
                            docTypeId: d.docTypeId || undefined,
                            description: d.description || '',
                            quantityOriginal: d.quantityOriginal || 0,
                            quantityCopy: d.quantityCopy || 0
                        })),
                        submissionMethods: processedSubmissionMethods.map(m => ({
                            submissionMethodId: m.submissionMethodId,
                            processingTime: m.processingTime || 'Trong ngày',
                            description: m.description || ''
                        })),
                        processingProcedure: procedure, // Use string directly
                        legislationDocumentIds: data.legislationDocumentIds || [],
                        serviceAgencyIds: createdAgencyIds // Use tracked agency IDs
                    };

                    const response = await fastInputService.createService(fastInputRequest);
                    // Cast response to any or generic interface checking success
                    const typedResponse = response as unknown as { success: boolean, message?: string };

                    if (typedResponse?.success) {
                        res = response;
                        toast.success('Tạo dịch vụ mới (nhập nhanh) thành công');
                    } else {
                        toast.error(typedResponse?.message || 'Tạo dịch vụ mới thất bại');
                        return;
                    }
                } else {
                    // Standard Create
                    res = await createMutation.mutateAsync(data as CreateServiceRequest);
                    if (res?.success) {
                        toast.success('Tạo dịch vụ mới thành công');
                    } else {
                        toast.error('Tạo dịch vụ mới thất bại');
                        return;
                    }
                }
            }

            // Cleanup and Close
            handleClose();
        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error instanceof Error
                ? error.message
                : 'Có lỗi xảy ra khi lưu dịch vụ';
            toast.error(errorMessage);
        }
    };

    const { form, isEdit } = useServiceForm({
        initData,
        onSubmit: async (data: any) => {
            await handleSubmit(data);
        },
        open,
    });

    const handleFastInputSuccess = (data: FastInputCheckResponse) => {
        setIsFastInputMode(true);

        const extracted = data.extractedData;

        // --- Helper Logic for resolving $ref references ---
        const extractedIds = new Map<string, any>();
        const indexItems = (list: any[]) => {
            if (!list) return;
            list.forEach(item => {
                if (item && item.$id) extractedIds.set(item.$id, item);
            });
        };
        // Index all possible referenced items
        indexItems(getList(extracted.canCuPhapLy));
        indexItems(getList(extracted.thanhPhanHoSo));
        indexItems(getList(extracted.cachThucThucHien));

        const resolve = (item: any) => {
            if (item && item.$ref && extractedIds.has(item.$ref)) {
                return extractedIds.get(item.$ref);
            }
            return item;
        };

        const mapToMissingItem = (list: any[], type: string, nameField: string): MissingItem[] => {
            return list.map(raw => {
                const item = resolve(raw);
                // Handle different name fields based on type or just use the mapped one
                let name = 'Không có tên';
                if (typeof item === 'string') {
                    name = item;
                } else if (item) {
                    name = item[nameField] || item.trichYeu || item.tenGiayTo || item.hinhThuc || item.name || '';
                }

                return {
                    name: name,
                    originalData: item,
                    type: type as any
                };
            });
        };

        // Normalize missing entities with resolution
        const normalizedMissing: MissingEntities = {
            legislationDocuments: mapToMissingItem(getList(data.missingEntities.legislationDocuments), 'legislationDocument', 'trichYeu'),
            docsTypes: mapToMissingItem(getList(data.missingEntities.docsTypes), 'docsType', 'tenGiayTo'),
            submissionMethods: mapToMissingItem(getList(data.missingEntities.submissionMethods), 'submissionMethod', 'hinhThuc'),
            serviceAgencies: mapToMissingItem(getList(data.missingEntities.serviceAgencies), 'serviceAgency', '')
        };
        setMissingEntities(normalizedMissing);

        // Map basic fields
        if (extracted.tenThuTuc) form.setFieldValue('serviceName', extracted.tenThuTuc as never);
        if (extracted.maThuTuc) form.setFieldValue('serviceCode', extracted.maThuTuc as never);
        if (extracted.soQuyetDinh) form.setFieldValue('decisionNumber', extracted.soQuyetDinh as never);

        // Map new fields
        if (extracted.yeuCauDieuKien && extracted.yeuCauDieuKien !== 'KHÔNG QUY ĐỊNH') {
            form.setFieldValue('condition', extracted.yeuCauDieuKien as never);
        } else {
            form.setFieldValue('condition', '');
        }

        if (extracted.moTa && extracted.moTa !== 'Không có thông tin') {
            form.setFieldValue('description', extracted.moTa as never);
        }

        if (extracted.ketQua) form.setFieldValue('resultDocument', extracted.ketQua as never);

        // Map Input Fields directly (No longer Dropdowns)
        if (extracted.linhVuc) form.setFieldValue('field', extracted.linhVuc as never);
        if (extracted.capThucHien) form.setFieldValue('executionLevel', extracted.capThucHien as never);

        // Service Type: Checks loaiThuTuc
        // removed loaiDichVu access to fix type error
        const typeText = extracted.loaiThuTuc;
        if (typeText) form.setFieldValue('serviceType', typeText as never);
        else form.setFieldValue('serviceType', 'Công dân' as never);

        // Map tables with safe checks using getList
        const docsList = getList<ExtractedDocument>(extracted.thanhPhanHoSo);
        const mappedDocs: ServiceRequiredDocumentInput[] = docsList.map(doc => ({
            docTypeId: doc.id, // Preserve ID if exists
            docTypeName: doc.tenGiayTo,
            quantityOriginal: doc.quantityOriginal || doc.banChinh || 0,
            quantityCopy: doc.quantityCopy || doc.banSao || 0,
            description: `Mẫu đơn: ${doc.mauDon}`,
            note: ''
        }));
        setRequiredDocuments(mappedDocs);

        const methodList = getList<any>(extracted.cachThucThucHien);
        const mappedMethods: ServiceSubmissionMethodInput[] = methodList.map(method => ({
            submissionMethodId: method.id || '', 
            submissionMethodName: method.hinhThuc,
            processingTime: method.thoiHan,
            fee: method.phiLePhi,
            description: method.moTa
        }));
        setSubmissionMethods(mappedMethods);

        setProcedure(extracted.trinhTuThucHien || '');
    };

    const handleEntityCreated = (type: string, originalData: any, newId: string) => {

        if (missingEntities) {
            const updatedMissing = { ...missingEntities };

            // Cast to MissingItem[] and filter
            if (type === 'legislationDocument') {
                updatedMissing.legislationDocuments = getList<MissingItem>(updatedMissing.legislationDocuments).filter((i) => i.originalData !== originalData);
                // Add to form field
                const currentIds = form.getFieldValue('legislationDocumentIds') as string[] || [];
                form.setFieldValue('legislationDocumentIds', [...currentIds, newId] as never);
            } else if (type === 'docsType') {
                updatedMissing.docsTypes = getList<MissingItem>(updatedMissing.docsTypes).filter((i) => i.originalData !== originalData);
                // Update requiredDocuments with new ID
                setRequiredDocuments(prev => prev.map(doc => {
                    const extracted = originalData as ExtractedDocument;
                    if (doc.docTypeName === extracted.tenGiayTo) {
                        return { ...doc, docTypeId: newId };
                    }
                    return doc;
                }));
            } else if (type === 'submissionMethod') {
                updatedMissing.submissionMethods = getList<MissingItem>(updatedMissing.submissionMethods).filter((i) => i.originalData !== originalData);
                // Update matching method in submissionMethods
                setSubmissionMethods(prev => prev.map(m => {
                    if (!m.submissionMethodId) {
                        return { ...m, submissionMethodId: newId };
                    }
                    return m;
                }));
            } else if (type === 'serviceAgency') {
                updatedMissing.serviceAgencies = getList<MissingItem>(updatedMissing.serviceAgencies).filter((i) => i.originalData !== originalData);
                setCreatedAgencyIds(prev => [...prev, newId]);
            }
            setMissingEntities(updatedMissing);
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOk = async () => {
        await form.handleSubmit();
    };

    const handleClose = () => {
        setMissingEntities(null);
        setRequiredDocuments([]);
        setSubmissionMethods([]);
        setCreatedAgencyIds([]);
        setProcedure('');
        setIsFastInputMode(false);
        onClose();
    }

    return (
        <BaseModal
            open={open}
            onClose={handleClose}
            title={isEdit ? 'Chỉnh sửa dịch vụ' : 'Tạo dịch vụ mới'}
            onOk={handleOk}
            onCancel={handleClose}
            okText={isEdit ? 'Cập nhật' : 'Tạo mới'}
            cancelText="Hủy"
            confirmLoading={isLoading}
            centered
            size="large"
            destroyOnClose={true}
        >
            {!isEdit && (
                <FastInputTrigger onSuccess={handleFastInputSuccess} />
            )}

            {missingEntities && (
                <MissingEntitiesPanel
                    missingEntities={missingEntities}
                    onEntityCreated={handleEntityCreated}
                />
            )}

            <ServiceForm form={form} isLoading={isLoading} isEdit={isEdit} />

            {/* Additional Sections for Fast Input / Extended Create */}
            {!isEdit && (
                <div className="mt-6 border-t pt-4">
                    <RequiredDocumentsTable
                        documents={requiredDocuments}
                        onChange={setRequiredDocuments}
                        isLoading={isLoading}
                    />

                    <SubmissionMethodsTable
                        methods={submissionMethods}
                        onChange={setSubmissionMethods}
                        isLoading={isLoading}
                    />

                    <ProcedureSection
                        value={procedure}
                        onChange={setProcedure}
                        isLoading={isLoading}
                    />
                </div>
            )}
        </BaseModal>
    );
};
