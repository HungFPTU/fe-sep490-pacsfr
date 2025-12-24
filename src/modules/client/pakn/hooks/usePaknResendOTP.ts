import { useMutation } from '@tanstack/react-query';
import { paknApi } from '../api/pakn.api';

export const usePaknResendOTP = () => {
    return useMutation({
        mutationFn: (payload: { paknCode: string }) => paknApi.resendOTP(payload),
    });
};
