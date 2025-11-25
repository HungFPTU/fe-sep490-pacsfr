"use client";

import type { VietnamDistrict, VietnamProvince, VietnamWard } from "../types/vietnam-address";

const INTERNAL_ENDPOINT = "/api/vietnam-address";

type ApiWard = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    district_code: number;
};

type ApiDistrict = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    province_code: number;
    wards?: ApiWard[];
};

type ApiProvince = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    phone_code?: string;
    districts?: ApiDistrict[];
};

const buildInternalUrl = (path = "", searchParams?: Record<string, string | number | undefined>) => {
    const base = path ? `${INTERNAL_ENDPOINT}${path}` : INTERNAL_ENDPOINT;

    if (!searchParams) {
        return base;
    }

    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    const queryString = params.toString();
    return queryString ? `${base}?${queryString}` : base;
};

const normalizeWard = (ward: ApiWard): VietnamWard => ({
    code: String(ward.code),
    name: ward.name,
    codename: ward.codename,
    divisionType: ward.division_type,
    districtCode: String(ward.district_code),
});

const normalizeDistrict = (district: ApiDistrict): VietnamDistrict => ({
    code: String(district.code),
    name: district.name,
    codename: district.codename,
    divisionType: district.division_type,
    provinceCode: String(district.province_code),
    wards: (district.wards ?? []).map(normalizeWard),
});

const normalizeProvince = (province: ApiProvince): VietnamProvince => ({
    code: String(province.code),
    name: province.name,
    codename: province.codename,
    divisionType: province.division_type,
    phoneCode: province.phone_code,
    districts: (province.districts ?? []).map(normalizeDistrict),
});

async function fetchJson<T>(path = "", params?: Record<string, string | number | undefined>): Promise<T> {
    const response = await fetch(buildInternalUrl(path, params), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "force-cache",
    });

    if (!response.ok) {
        throw new Error("Không thể tải dữ liệu địa chỉ Việt Nam. Vui lòng thử lại sau.");
    }

    return response.json() as Promise<T>;
}

export const vietnamAddressService = {
    async getProvincesWithDistricts(): Promise<VietnamProvince[]> {
        const data = await fetchJson<ApiProvince[]>("", { depth: 2 });
        return data.map(normalizeProvince);
    },

};

