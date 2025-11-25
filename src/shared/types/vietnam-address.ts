"use client";

export type VietnamWard = {
    code: string;
    name: string;
    codename: string;
    divisionType: string;
    districtCode: string;
};

export type VietnamDistrict = {
    code: string;
    name: string;
    codename: string;
    divisionType: string;
    provinceCode: string;
    wards?: VietnamWard[];
};

export type VietnamProvince = {
    code: string;
    name: string;
    codename: string;
    divisionType: string;
    phoneCode?: string;
    districts: VietnamDistrict[];
};

