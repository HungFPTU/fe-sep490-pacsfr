import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';

export const useDashboardForm = () => {
  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {},
  });

  return {
    form,
    isLoading: false,
    handleSubmit: () => form.handleSubmit(),
  };
};

