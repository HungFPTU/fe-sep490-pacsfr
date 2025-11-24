'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { ServiceInfo } from './ServiceInfo.ui';
import { ServiceSubmissionMethods } from './ServiceSubmissionMethods.ui';
import {
    ServiceAgenciesTable,
    ServiceLegalBasesTable,
    ServiceProceduresTable,
    ServiceRequiredDocumentsTable,
    ServiceSubmissionMethodsTable,
} from './detail-tables';
import { useServiceDetail } from '../../../hooks';
import type { Service } from '../../../types';
import { getOne } from '@/types/rest';

interface Props {
    open: boolean;
    onClose: () => void;
    service: Service | null;
}

export const ServiceDetailModal: React.FC<Props> = ({
    open,
    onClose,
    service,
}) => {
    const serviceId = service?.id ?? '';
    const {
        data: serviceDetailResponse,
        isLoading: isDetailLoading,
        isFetching,
        isError,
    } = useServiceDetail(serviceId);

    const serviceDetail = serviceDetailResponse ? getOne(serviceDetailResponse) : null;
    const resolvedService = serviceDetail ?? service;
    const isLoadingDetail = !!service && !serviceDetail && (isDetailLoading || isFetching);
    const assignedMethodIds =
        serviceDetail?.submissionMethods?.$values?.map((method) => method.id) ?? [];

    if (!service || !resolvedService) return null;

    const requiredDocuments = serviceDetail?.requiredDocuments?.$values ?? [];
    const procedures = serviceDetail?.serviceProcedures?.$values ?? [];
    const legalBases = serviceDetail?.legalBases?.$values ?? [];
    const submissionMethods = serviceDetail?.submissionMethods?.$values ?? [];
    const agencies = serviceDetail?.serviceAgencies?.$values ?? [];

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết dịch vụ: ${resolvedService.serviceName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="xl"
            footer={
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Đóng
                </button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                        <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {resolvedService.serviceName}
                        </h3>
                        <p className="text-sm text-slate-500">Mã: {resolvedService.serviceCode}</p>
                    </div>
                </div>

                <ServiceInfo service={resolvedService} />

                {isLoadingDetail && (
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-200 py-10">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Đang tải dữ liệu chi tiết...
                        </div>
                    </div>
                )}

                {isError && !serviceDetail && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        Không thể tải dữ liệu chi tiết. Vui lòng thử lại sau.
                    </div>
                )}

                {serviceDetail && (
                    <div className="space-y-4">
                        <ServiceRequiredDocumentsTable documents={requiredDocuments} />
                        <ServiceProceduresTable procedures={procedures} />
                        <ServiceLegalBasesTable legalBases={legalBases} />
                        <ServiceSubmissionMethodsTable methods={submissionMethods} />
                        <ServiceAgenciesTable agencies={agencies} />
                    </div>
                )}

                {service.id && (
                    <div className="mt-6 border-t border-slate-200 pt-6">
                        <ServiceSubmissionMethods
                            serviceId={service.id}
                            assignedMethodIds={assignedMethodIds}
                        />
                    </div>
                )}
            </div>
        </BaseModal>
    );
};

