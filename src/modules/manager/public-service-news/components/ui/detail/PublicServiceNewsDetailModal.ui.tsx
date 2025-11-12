"use client";

import React from "react";
import { Newspaper } from "lucide-react";
import { BaseModal } from "@/shared/components/layout/manager/modal/BaseModal";
import { Button } from "@/shared/components/ui/button.ui";
import { PublicServiceNewsInfo } from "./PublicServiceNewsInfo.ui";
import type { PublicServiceNews } from "../../../types";

interface Props {
    open: boolean;
    onClose: () => void;
    news: PublicServiceNews | null;
}

export const PublicServiceNewsDetailModal: React.FC<Props> = ({ open, onClose, news }) => {
    if (!news) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết tin tức: ${news.title}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button type="button" onClick={onClose}>
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Newspaper className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{news.title}</h3>
                        <p className="text-sm text-muted-foreground">Slug: {news.slug || "-"}</p>
                    </div>
                </div>

                <PublicServiceNewsInfo news={news} />
            </div>
        </BaseModal>
    );
};
