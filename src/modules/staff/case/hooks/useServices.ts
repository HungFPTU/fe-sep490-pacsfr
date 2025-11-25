import { useQuery } from '@tanstack/react-query';
import { serviceApi, type ServiceItem } from '../api/service.api';

export const useServices = () => {
  return useQuery<ServiceItem[]>({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const response = await serviceApi.getServices();
        console.log('Service API Response:', response);
        
        // Check both structures: items.$values or direct $values
        const items = response.data?.items?.$values || response.data?.$values;
        
        if (response.success && items && Array.isArray(items)) {
          const mapped = items.map((item: any) => ({
            id: item.id,
            serviceCode: item.serviceCode,
            serviceName: item.serviceName,
            description: item.description,
            isActive: item.isActive,
          })) as ServiceItem[];
          console.log('Mapped Services:', mapped);
          return mapped;
        }
        console.warn('No services found or response not success');
        return [];
      } catch (error) {
        console.error('Error fetching services:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
