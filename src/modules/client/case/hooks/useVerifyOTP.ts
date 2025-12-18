import { useMutation } from '@tanstack/react-query';
import { caseClientApi } from '@modules/client/case/api/case.api';

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (payload: { caseCode: string; otpCode: string }) =>
      caseClientApi.verifyOTP(payload),
  });
};
