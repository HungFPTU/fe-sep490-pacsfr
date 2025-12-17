import { useMutation } from '@tanstack/react-query';
import { caseClientApi } from '../api/case.api';

export const useResendOTP = () => {
  return useMutation({
    mutationFn: (payload: { caseCode: string }) =>
      caseClientApi.resendOTP(payload),
  });
};
