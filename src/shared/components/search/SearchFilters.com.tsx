interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  categories: string[];
  departments: string[];
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDepartment,
  setSelectedDepartment,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  categories,
  departments
}: SearchFiltersProps) {
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDepartment("");
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Bộ lọc</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Xóa bộ lọc
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập từ khóa..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lĩnh vực
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Tất cả lĩnh vực</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cơ quan thực hiện
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Tất cả cơ quan</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sắp xếp theo
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="name">Tên thủ tục</option>
            <option value="category">Lĩnh vực</option>
            <option value="department">Cơ quan</option>
            <option value="processingTime">Thời gian xử lý</option>
            <option value="fee">Lệ phí</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thứ tự
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setSortOrder("asc")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                sortOrder === "asc"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tăng dần
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                sortOrder === "desc"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Giảm dần
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bộ lọc nhanh
          </label>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedDepartment("");
                setSearchTerm("miễn phí");
              }}
              className="w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              Miễn phí
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Hành chính");
                setSelectedDepartment("");
                setSearchTerm("");
              }}
              className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Hành chính
            </button>
            <button
              onClick={() => {
                setSelectedCategory("An sinh xã hội");
                setSelectedDepartment("");
                setSearchTerm("");
              }}
              className="w-full text-left px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              An sinh xã hội
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
