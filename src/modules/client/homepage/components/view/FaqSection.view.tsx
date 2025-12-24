'use client';

import { useState, useEffect } from 'react';
import { useFaqsGrouped } from '../../hooks';
import { FaqAccordion } from '../ui';
import { QuestionMarkCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { Faq, FaqCategory } from '../../types';

/**
 * FAQ Section View Component
 * Displays FAQ categories as tabs with expandable questions
 */
export function FaqSectionView() {
  const { data: groupedFaqs, isLoading, categories } = useFaqsGrouped();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Set first category as active when data loads
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const activeFaqs = groupedFaqs.find(
    (g) => g.category.id === activeCategory
  )?.faqs ?? [];

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show section even when empty, with helpful message
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <QuestionMarkCircleIcon className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Câu hỏi thường gặp
            </h2>
          </div>
          <Link
            href="/cau-hoi-thuong-gap"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Xem tất cả
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Chưa có danh mục câu hỏi nào
          </p>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
              {categories.slice(0, 5).map((category: FaqCategory) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.categoryName}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activeFaqs.length > 0 ? (
                activeFaqs.slice(0, 6).map((faq: Faq) => (
                  <FaqAccordion
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Chưa có câu hỏi nào trong danh mục này
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
