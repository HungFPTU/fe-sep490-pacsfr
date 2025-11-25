"use client";

import { cn } from '@/shared/lib/utils';

interface PaknNotesCardProps {
    className?: string;
}

export const PaknNotesCard: React.FC<PaknNotesCardProps> = ({ className }) => {
    return (
        <div className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4', className)}>
            <h3 className="text-lg font-semibold text-slate-900">Lưu ý</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>
                    Hệ thống tiếp nhận các phản ánh, kiến nghị về thủ tục hành chính, thái độ phục vụ,
                    các bất cập và đề xuất cải thiện chất lượng dịch vụ công.
                </li>
                <li>
                    Không tiếp nhận đơn thư khiếu nại, tố cáo, các nội dung liên quan đến tranh chấp dân sự,
                    khiếu kiện đã có kết luận cuối cùng.
                </li>
                <li>
                    Vui lòng không gửi thông tin cá nhân nhạy cảm trong phần nội dung. Thông tin liên hệ sẽ được sử dụng
                    để phản hồi kết quả xử lý.
                </li>
            </ol>
        </div>
    );
};

