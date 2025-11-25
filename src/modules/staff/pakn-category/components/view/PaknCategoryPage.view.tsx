"use client";

import { useMemo, useState } from "react";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import { getValuesPage } from "@/types/rest";
import {
    PaknCategoryTableView,
    PaknCategoryModal,
    PaknCategoryPagination,
    PaknCategoryHeader,
    PaknCategoryFilterBar,
} from "../ui";
import { usePaknCategoryList, useDeletePaknCategory } from "../../hooks";
import type { PaknCategory, PaknCategoryFilters } from "../../types";
import type { StatusFilter } from "../ui/filter/PaknCategoryFilterBar.ui";

const PAGE_SIZE = 10;

export const PaknCategoryPageView: React.FC = () => {
    const { addToast } = useGlobalToast();
    const [filterState, setFilterState] = useState<{ keyword: string; status: StatusFilter }>({
        keyword: "",
        status: "all",
    });
    const [appliedFilters, setAppliedFilters] = useState<PaknCategoryFilters>({
        keyword: "",
        isActive: null,
        page: 1,
        size: PAGE_SIZE,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<PaknCategory | null>(null);

    const { data, isLoading, refetch } = usePaknCategoryList(appliedFilters);
    const deleteMutation = useDeletePaknCategory();

    const pageData = useMemo(() => (data ? getValuesPage(data) : null), [data]);
    const categories = pageData?.items ?? [];
    const totalPages = pageData?.totalPages ?? 1;
    const currentPage = pageData?.page ?? appliedFilters.page;

    const buildFilterPayload = (page = 1): PaknCategoryFilters => ({
        keyword: filterState.keyword.trim(),
        isActive:
            filterState.status === "all" ? null : filterState.status === "active",
        page,
        size: PAGE_SIZE,
    });

    const handleSearch = () => {
        const nextFilters = buildFilterPayload(1);
        const filtersChanged = JSON.stringify(nextFilters) !== JSON.stringify(appliedFilters);
        if (filtersChanged) {
            setAppliedFilters(nextFilters);
        } else {
            refetch();
        }
    };

    const handleReset = () => {
        setFilterState({ keyword: "", status: "all" });
        setAppliedFilters({ keyword: "", isActive: null, page: 1, size: PAGE_SIZE });
    };

    const handlePageChange = (page: number) => {
        setAppliedFilters((prev) => ({ ...prev, page }));
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (category: PaknCategory) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleDelete = async (category: PaknCategory) => {
        const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.categoryName}"?`);
        if (!confirmed) return;

        try {
            await deleteMutation.mutateAsync(category.id);
            addToast({ message: "Đã xóa danh mục", type: "success" });
            refetch();
        } catch (error) {
            console.error(error);
            addToast({ message: "Không thể xóa danh mục. Vui lòng thử lại", type: "error" });
        }
    };

    return (
        <div className="space-y-6">
            <PaknCategoryHeader onCreate={handleCreate} />

            <PaknCategoryFilterBar
                keyword={filterState.keyword}
                status={filterState.status}
                onKeywordChange={(value) => setFilterState((prev) => ({ ...prev, keyword: value }))}
                onStatusChange={(value) => setFilterState((prev) => ({ ...prev, status: value }))}
                onSubmit={handleSearch}
                onReset={handleReset}
                isLoading={isLoading}
            />

            <PaknCategoryTableView
                categories={categories}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <PaknCategoryPagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <PaknCategoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={selectedCategory}
                onSuccess={() => {
                    refetch();
                    setSelectedCategory(null);
                }}
            />
        </div>
    );
};

