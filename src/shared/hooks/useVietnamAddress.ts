"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { vietnamAddressService } from "../services/vietnam-address.service";
import { CACHE_TIME, STALE_TIME } from "../constants/react-query";
import type { VietnamDistrict, VietnamProvince } from "../types/vietnam-address";

const VIETNAM_ADDRESS_QUERY_KEYS = {
    PROVINCES: ["vietnam-address", "v2", "provinces"] as const,
} as const;

type SelectOption = {
    value: string;
    label: string;
};

export const useVietnamAddress = () => {
    const { data, isPending, isError, error, refetch } = useQuery<VietnamProvince[]>({
        queryKey: VIETNAM_ADDRESS_QUERY_KEYS.PROVINCES,
        queryFn: () => vietnamAddressService.getProvincesWithDistricts(),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
    });

    const provinces = data ?? [];

    const provinceOptions: SelectOption[] = useMemo(
        () =>
            provinces.map((province) => ({
                value: province.code,
                label: province.name,
            })),
        [provinces],
    );

    const districtMap = useMemo(() => {
        const map: Record<string, VietnamDistrict[]> = {};
        provinces.forEach((province) => {
            map[province.code] = province.districts ?? [];
        });
        return map;
    }, [provinces]);

    const getDistrictsByProvince = useCallback(
        (provinceCode?: string | null) => {
            if (!provinceCode) return [];
            return districtMap[provinceCode] ?? [];
        },
        [districtMap],
    );

    const getDistrictOptions = useCallback(
        (provinceCode?: string | null): SelectOption[] => {
            return getDistrictsByProvince(provinceCode).map((district) => ({
                value: district.code,
                label: district.name,
            }));
        },
        [getDistrictsByProvince],
    );

    return {
        provinces,
        provinceOptions,
        getDistrictsByProvince,
        getDistrictOptions,
        isLoading: isPending,
        isError,
        error,
        refetch,
    };
};


