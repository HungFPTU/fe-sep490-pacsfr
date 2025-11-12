"use client";

import React from "react";
import Image from "next/image";
import { formatDate } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge.ui";
import type { PublicServiceNews } from "../../../types";

interface Props {
    news: PublicServiceNews;
}

export const PublicServiceNewsInfo: React.FC<Props> = ({ news }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <label className="block text-sm font-medium text-foreground">Tiêu đề</label>
                <p className="mt-1 text-sm text-muted-foreground">{news.title}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Slug</label>
                <p className="mt-1 text-sm text-muted-foreground">{news.slug || "-"}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Danh mục</label>
                <p className="mt-1 text-sm text-muted-foreground">{news.newsCategoryName || "-"}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Dịch vụ</label>
                <p className="mt-1 text-sm text-muted-foreground">{news.serviceName || "-"}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Nhân viên phụ trách</label>
                <p className="mt-1 text-sm text-muted-foreground">{news.staffName || "-"}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Trạng thái</label>
                <div className="mt-1">
                    <Badge variant={news.isPublished ? "outline" : "secondary"}>
                        {news.isPublished ? "Đã xuất bản" : "Nháp"}
                    </Badge>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Ngày tạo</label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {news.createdAt ? formatDate(news.createdAt) : "-"}
                </p>
            </div>

            {news.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">Cập nhật lần cuối</label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(news.modifiedAt)}
                    </p>
                </div>
            )}

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">Tóm tắt</label>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                    {news.summary || "-"}
                </p>
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">Nội dung</label>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                    {news.content || "-"}
                </p>
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">Hình đại diện</label>
                {news.thumbnailUrl ? (
                    <div className="mt-2 flex flex-col gap-2">
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-slate-200">
                            <Image
                                src={news.thumbnailUrl}
                                alt={`Thumbnail ${news.title}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <a
                            href={news.thumbnailUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex text-sm text-primary hover:underline"
                        >
                            Xem ảnh gốc
                        </a>
                    </div>
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">Không có hình ảnh</p>
                )}
            </div>
        </div>
    );
};
