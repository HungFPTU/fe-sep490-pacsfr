import { useMutation } from '@tanstack/react-query';
import { paknApi } from '../api/pakn.api';

export const usePaknVerifyOTP = () => {
    return useMutation({
        mutationFn: (payload: { paknCode: string; otpCode: string }) => paknApi.verifyOTP(payload),
    });
};
