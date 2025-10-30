import { useCallback } from 'react';

/**
 * Custom hook to ensure minimum loading time for better UX
 * @param minimumTime - Minimum loading time in milliseconds (default: 1500ms)
 */
export const useMinimumLoadingTime = (minimumTime: number = 1500) => {
  const withMinimumLoadingTime = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T> => {
      const startTime = Date.now();
      
      try {
        // Execute the async function
        const result = await asyncFn();
        
        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;
        
        // If elapsed time is less than minimum, wait for the remaining time
        if (elapsedTime < minimumTime) {
          await new Promise(resolve => setTimeout(resolve, minimumTime - elapsedTime));
        }
        
        return result;
      } catch (error) {
        // Even on error, ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minimumTime) {
          await new Promise(resolve => setTimeout(resolve, minimumTime - elapsedTime));
        }
        throw error;
      }
    },
    [minimumTime]
  );

  return { withMinimumLoadingTime };
};

