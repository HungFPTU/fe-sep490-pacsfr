import { useQuery } from '@tanstack/react-query';
import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';

export type SubmissionMethod = {
    $id?: string;
    id: string;
    submissionMethodName: string;
    processingTime: string;
    fee: number;
    description?: string;
};

type GetServiceSubmissionMethodsResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data: {
        $id?: string;
        $values: SubmissionMethod[];
    };
    timestamp?: string;
};

const getServiceSubmissionMethods = async (serviceId: string): Promise<SubmissionMethod[]> => {
    try {
        const response = await http.get<GetServiceSubmissionMethodsResponse>(
            API_PATH.STAFF.DASHBOARD.GET_SERVICE_SUBMISSION_METHODS(serviceId)
        );
        
        if (response.data.success && response.data.data?.$values) {
            return response.data.data.$values;
        }
        return [];
    } catch (error) {
        console.error('Error fetching service submission methods:', error);
        return [];
    }
};

export const useServiceSubmissionMethods = (serviceId: string | undefined) => {
    return useQuery<SubmissionMethod[]>({
        queryKey: ['service-submission-methods', serviceId],
        queryFn: async () => {
            if (!serviceId) {
                return [];
            }
            return getServiceSubmissionMethods(serviceId);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!serviceId, // Only run query if serviceId is provided
    });
};

