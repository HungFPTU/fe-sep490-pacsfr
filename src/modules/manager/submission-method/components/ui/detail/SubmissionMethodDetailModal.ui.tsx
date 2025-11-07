'use client';

import React from 'react';
import { FileCheck } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { SubmissionMethodInfo } from './SubmissionMethodInfo.ui';
import type { SubmissionMethod } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    submissionMethod: SubmissionMethod | null;
}

export const SubmissionMethodDetailModal: React.FC<Props> = ({
    open,
    onClose,
    submissionMethod,
}) => {
    if (!submissionMethod) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết phương thức nộp hồ sơ: ${submissionMethod.submissionMethodName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button
                    type="button"
                    onClick={onClose}
                    variant="default"
                >
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <FileCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {submissionMethod.submissionMethodName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            ID: {submissionMethod.id}
                        </p>
                    </div>
                </div>
                <SubmissionMethodInfo submissionMethod={submissionMethod} />
            </div>
        </BaseModal>
    );
};

