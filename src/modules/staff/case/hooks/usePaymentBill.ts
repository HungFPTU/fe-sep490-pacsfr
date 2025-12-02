'use client';

import { useQuery } from '@tanstack/react-query';
import { paymentBillService } from '../services/payment-bill.service';

export const usePaymentBill = (caseCode: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['payment-bill', caseCode],
    queryFn: () => paymentBillService.getBillByCaseCode(caseCode!),
    enabled: !!caseCode && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
