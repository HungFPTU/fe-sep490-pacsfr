import { useMemo } from 'react';
import { getProvinces, getDistricts, getWards, Province, District, Ward } from '../constants/vietnam-address';

/**
 * Hook to fetch all provinces
 */
export const useProvinces = () => {
    const data = useMemo(() => getProvinces(), []);
    return {
        data,
        isLoading: false,
        error: null,
    };
};

/**
 * Hook to fetch districts by province
 * @param provinceId - Province ID
 */
export const useDistricts = (provinceId?: string) => {
    const data = useMemo(() => {
        if (!provinceId) return [];
        return getDistricts(provinceId);
    }, [provinceId]);

    return {
        data,
        isLoading: false,
        error: null,
    };
};

/**
 * Hook to fetch wards by district
 * @param districtId - District ID
 */
export const useWards = (districtId?: string) => {
    const data = useMemo(() => {
        if (!districtId) return [];
        return getWards(districtId);
    }, [districtId]);

    return {
        data,
        isLoading: false,
        error: null,
    };
};
