'use client';

import { useQuery } from '@tanstack/react-query';
import { homepageApi } from '../api';
import { getValuesPage } from '@/types/rest';
import type { Faq, FaqCategory } from '../types';

const FAQ_QUERY_KEY = 'homepage-faqs';
const FAQ_CATEGORY_QUERY_KEY = 'homepage-faq-categories';

/**
 * Hook to fetch FAQ categories for homepage
 */
export function useFaqCategories() {
  return useQuery({
    queryKey: [FAQ_CATEGORY_QUERY_KEY],
    queryFn: async () => {
      const response = await homepageApi.getFaqCategories(1, 20);
      const { items } = getValuesPage(response.data);
      return items;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch FAQs for homepage
 */
export function useFaqs(categoryId?: string) {
  return useQuery({
    queryKey: [FAQ_QUERY_KEY, categoryId],
    queryFn: async () => {
      const response = await homepageApi.getFaqs(1, 50);
      const { items } = getValuesPage(response.data);
      
      // Filter by category if specified
      if (categoryId) {
        return items.filter((faq: Faq) => faq.faqCategoryId === categoryId);
      }
      
      return items;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch FAQs grouped by category
 */
export function useFaqsGrouped() {
  const { data: categories = [], isLoading: categoriesLoading } = useFaqCategories();
  const { data: faqs = [], isLoading: faqsLoading } = useFaqs();

  const grouped = (categories as FaqCategory[]).map((category) => ({
    category,
    faqs: (faqs as Faq[]).filter((faq) => faq.faqCategoryId === category.id),
  }));

  return {
    data: grouped,
    isLoading: categoriesLoading || faqsLoading,
    categories: categories as FaqCategory[],
    faqs: faqs as Faq[],
  };
}
