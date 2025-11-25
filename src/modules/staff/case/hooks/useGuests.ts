import { useQuery } from '@tanstack/react-query';
import { guestApi, type GuestItem } from '../api/guest.api';

export const useGuests = (keyword?: string) => {
  return useQuery<GuestItem[]>({
    queryKey: ['guests', keyword],
    queryFn: async () => {
      try {
        const response = await guestApi.getGuests(keyword);
        console.log('Guest API Response:', response);

        // Check both structures: items.$values or direct $values
        const items = response.data?.items?.$values || response.data?.$values;

        if (response.success && items && Array.isArray(items)) {
          const mapped = items.map((item: any) => ({
            id: item.id,
            fullName: item.fullName,
            idNumber: item.idNumber,
            phoneNumber: item.phoneNumber,
            email: item.email,
          })) as GuestItem[];
          console.log('Mapped Guests:', mapped);
          return mapped;
        }
        console.warn('No guests found or response not success');
        return [];
      } catch (error) {
        console.error('Error fetching guests:', error);
        return [];
      }
    },
    enabled: !!keyword, // Only fetch when keyword is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
