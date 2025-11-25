import {
    VIETNAM_PROVINCES,
    VIETNAM_DISTRICTS,
    VIETNAM_WARDS,
} from "@/modules/staff/case/constants/vietnam-address";

export const VIETNAM_ADDRESS_REMOTE_BASE = "https://provinces.open-api.vn/api/v2";

export type RemoteWard = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    district_code: number;
};

export type RemoteDistrict = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    province_code: number;
    wards?: RemoteWard[];
};

export type RemoteProvince = {
    code: number;
    name: string;
    codename: string;
    division_type: string;
    phone_code?: string;
    districts?: RemoteDistrict[];
};

const fallbackProvinces: RemoteProvince[] = VIETNAM_PROVINCES.map((province) => {
    const districts = VIETNAM_DISTRICTS.filter((district) => district.provinceId === province.id).map((district) => {
        const wards = VIETNAM_WARDS.filter((ward) => ward.districtId === district.id).map<RemoteWard>((ward) => ({
            code: Number(ward.id),
            name: ward.name,
            codename: ward.code,
            division_type: "ward",
            district_code: Number(ward.districtId),
        }));

        return {
            code: Number(district.id),
            name: district.name,
            codename: district.code,
            division_type: "district",
            province_code: Number(district.provinceId),
            wards,
        } satisfies RemoteDistrict;
    });

    return {
        code: Number(province.id),
        name: province.name,
        codename: province.code,
        division_type: "province",
        phone_code: "",
        districts,
    } satisfies RemoteProvince;
});

const fallbackWards: RemoteWard[] = VIETNAM_WARDS.map((ward) => ({
    code: Number(ward.id),
    name: ward.name,
    codename: ward.code,
    division_type: "ward",
    district_code: Number(ward.districtId),
}));

export const getFallbackProvinces = (): RemoteProvince[] => fallbackProvinces;

export const getFallbackProvinceByCode = (code: string | number): RemoteProvince | undefined => {
    const normalized = Number(code);
    return fallbackProvinces.find((province) => province.code === normalized);
};

export const getFallbackWards = (districtCode?: string | number): RemoteWard[] => {
    if (!districtCode) {
        return fallbackWards;
    }
    const normalized = Number(districtCode);
    return fallbackWards.filter((ward) => ward.district_code === normalized);
};

export const getFallbackWardByCode = (code: string | number): RemoteWard | undefined => {
    const normalized = Number(code);
    return fallbackWards.find((ward) => ward.code === normalized);
};

export const buildErrorResponse = (message: string, status = 500) => {
    return new Response(JSON.stringify({ message }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
};

