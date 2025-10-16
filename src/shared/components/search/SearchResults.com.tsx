interface Procedure {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
    department: string;
    processingTime: string;
    fee: string;
    status: "active" | "inactive";
}

interface SearchResultsProps {
    procedures: Procedure[];
    totalCount: number;
    filteredCount: number;
}

export function SearchResults({ procedures, totalCount, filteredCount }: SearchResultsProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Kết quả tìm kiếm
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Hiển thị {filteredCount} trong tổng số {totalCount} thủ tục
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Hiển thị:</span>
                        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                            <option value="grid">Lưới</option>
                            <option value="list">Danh sách</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="p-6">
                {procedures.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Không tìm thấy thủ tục nào
                        </h3>
                        <p className="text-gray-600">
                            Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {procedures.map((procedure) => (
                            <div
                                key={procedure.id}
                                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300 group cursor-pointer"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                                        <span className="text-xl">{procedure.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                                            {procedure.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {procedure.description}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500">Lĩnh vực:</span>
                                                <span className="font-medium text-gray-700">{procedure.category}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500">Thời gian:</span>
                                                <span className="font-medium text-gray-700">{procedure.processingTime}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500">Lệ phí:</span>
                                                <span className={`font-medium ${procedure.fee === "Miễn phí" ? "text-green-600" : "text-gray-700"
                                                    }`}>
                                                    {procedure.fee}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {procedure.department}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${procedure.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    {procedure.status === "active" ? "Hoạt động" : "Tạm dừng"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {procedures.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Hiển thị 1-{procedures.length} trong tổng số {filteredCount} kết quả
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                                1
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                3
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
