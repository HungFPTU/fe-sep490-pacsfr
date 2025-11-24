/**
 * Vietnam address data
 * This contains basic province and district information
 * In production, this should be fetched from an API
 */

export interface Province {
    id: string;
    name: string;
    code: string;
}

export interface District {
    id: string;
    provinceId: string;
    name: string;
    code: string;
}

export interface Ward {
    id: string;
    districtId: string;
    name: string;
    code: string;
}

// Sample Vietnam provinces (Tỉnh/Thành phố)
export const VIETNAM_PROVINCES: Province[] = [
    { id: '01', name: 'Hà Nội', code: 'HN' },
    { id: '02', name: 'Hồ Chí Minh', code: 'HCM' },
    { id: '03', name: 'Đà Nẵng', code: 'DN' },
    { id: '04', name: 'Hải Phòng', code: 'HP' },
    { id: '05', name: 'Cần Thơ', code: 'CT' },
    { id: '06', name: 'An Giang', code: 'AG' },
    { id: '07', name: 'Bà Rịa - Vũng Tàu', code: 'BRVT' },
    { id: '08', name: 'Bắc Giang', code: 'BG' },
    { id: '09', name: 'Bắc Kạn', code: 'BK' },
    { id: '10', name: 'Bạc Liêu', code: 'BL' },
    { id: '11', name: 'Bắc Ninh', code: 'BN' },
    { id: '12', name: 'Bến Tre', code: 'BT' },
    { id: '13', name: 'Bình Dương', code: 'BD' },
    { id: '14', name: 'Bình Phước', code: 'BP' },
    { id: '15', name: 'Bình Thuận', code: 'BThu' },
    { id: '16', name: 'Cà Mau', code: 'CM' },
    { id: '17', name: 'Cao Bằng', code: 'CB' },
    { id: '18', name: 'Đắk Lắk', code: 'DL' },
    { id: '19', name: 'Đắk Nông', code: 'DN2' },
    { id: '20', name: 'Điện Biên', code: 'DB' },
    { id: '21', name: 'Đồng Nai', code: 'DNai' },
    { id: '22', name: 'Đồng Tháp', code: 'DT' },
    { id: '23', name: 'Gia Lai', code: 'GL' },
    { id: '24', name: 'Hà Giang', code: 'HG' },
    { id: '25', name: 'Hà Nam', code: 'HNam' },
    { id: '26', name: 'Hà Tĩnh', code: 'HT' },
    { id: '27', name: 'Hải Dương', code: 'HD' },
    { id: '28', name: 'Hậu Giang', code: 'HG2' },
    { id: '29', name: 'Hòa Bình', code: 'HB' },
    { id: '30', name: 'Hưng Yên', code: 'HY' },
    { id: '31', name: 'Khánh Hòa', code: 'KH' },
    { id: '32', name: 'Kiên Giang', code: 'KG' },
    { id: '33', name: 'Kon Tum', code: 'KT' },
    { id: '34', name: 'Lai Châu', code: 'LC' },
    { id: '35', name: 'Lâm Đồng', code: 'LD' },
    { id: '36', name: 'Lạng Sơn', code: 'LS' },
    { id: '37', name: 'Lào Cai', code: 'LCai' },
    { id: '38', name: 'Long An', code: 'LA' },
    { id: '39', name: 'Nam Định', code: 'ND' },
    { id: '40', name: 'Nghệ An', code: 'NA' },
    { id: '41', name: 'Ninh Bình', code: 'NB' },
    { id: '42', name: 'Ninh Thuận', code: 'NT' },
    { id: '43', name: 'Phú Thọ', code: 'PT' },
    { id: '44', name: 'Phú Yên', code: 'PY' },
    { id: '45', name: 'Quảng Bình', code: 'QB' },
    { id: '46', name: 'Quảng Nam', code: 'QNam' },
    { id: '47', name: 'Quảng Ngãi', code: 'QNgai' },
    { id: '48', name: 'Quảng Ninh', code: 'QN' },
    { id: '49', name: 'Quảng Trị', code: 'QT' },
    { id: '50', name: 'Sóc Trăng', code: 'ST' },
    { id: '51', name: 'Sơn La', code: 'SL' },
    { id: '52', name: 'Tây Ninh', code: 'TN' },
    { id: '53', name: 'Thái Bình', code: 'TB' },
    { id: '54', name: 'Thái Nguyên', code: 'TNG' },
    { id: '55', name: 'Thanh Hóa', code: 'TH' },
    { id: '56', name: 'Thừa Thiên Huế', code: 'TTH' },
    { id: '57', name: 'Tiền Giang', code: 'TG' },
    { id: '58', name: 'Trà Vinh', code: 'TV' },
    { id: '59', name: 'Tuyên Quang', code: 'TQ' },
    { id: '60', name: 'Vĩnh Long', code: 'VL' },
    { id: '61', name: 'Vĩnh Phúc', code: 'VP' },
    { id: '62', name: 'Yên Bái', code: 'YB' },
];

// Sample districts for Hà Nội (id: '01')
export const VIETNAM_DISTRICTS: District[] = [
    // Hà Nội
    { id: '0101', provinceId: '01', name: 'Hoàn Kiếm', code: 'HK' },
    { id: '0102', provinceId: '01', name: 'Chương Mỹ', code: 'CM' },
    { id: '0103', provinceId: '01', name: 'Mỹ Đức', code: 'MD' },
    { id: '0104', provinceId: '01', name: 'Thanh Oai', code: 'TO' },
    { id: '0105', provinceId: '01', name: 'Quốc Oai', code: 'QO' },
    { id: '0106', provinceId: '01', name: 'Ba Vì', code: 'BV' },
    { id: '0107', provinceId: '01', name: 'Phúc Thọ', code: 'PT' },
    { id: '0108', provinceId: '01', name: 'Mê Linh', code: 'ML' },
    { id: '0109', provinceId: '01', name: 'Sóc Sơn', code: 'SS' },
    { id: '0110', provinceId: '01', name: 'Đông Anh', code: 'DA' },
    { id: '0111', provinceId: '01', name: 'Gia Lâm', code: 'GL' },
    { id: '0112', provinceId: '01', name: 'Thanh Trì', code: 'TT' },
    { id: '0113', provinceId: '01', name: 'Hà Đông', code: 'HD' },
    { id: '0114', provinceId: '01', name: 'Long Biên', code: 'LB' },
    { id: '0115', provinceId: '01', name: 'Hai Bà Trưng', code: 'HBT' },
    { id: '0116', provinceId: '01', name: 'Hoàng Mai', code: 'HM' },
    { id: '0117', provinceId: '01', name: 'Thanh Xuân', code: 'TX' },
    { id: '0118', provinceId: '01', name: 'Cầu Giấy', code: 'CG' },
    { id: '0119', provinceId: '01', name: 'Tây Hồ', code: 'TH' },
    { id: '0120', provinceId: '01', name: 'Ba Đình', code: 'BD' },
    // Hồ Chí Minh
    { id: '0201', provinceId: '02', name: 'Quận 1', code: 'Q1' },
    { id: '0202', provinceId: '02', name: 'Quận 2', code: 'Q2' },
    { id: '0203', provinceId: '02', name: 'Quận 3', code: 'Q3' },
    { id: '0204', provinceId: '02', name: 'Quận 4', code: 'Q4' },
    { id: '0205', provinceId: '02', name: 'Quận 5', code: 'Q5' },
    { id: '0206', provinceId: '02', name: 'Quận 6', code: 'Q6' },
    { id: '0207', provinceId: '02', name: 'Quận 7', code: 'Q7' },
    { id: '0208', provinceId: '02', name: 'Quận 8', code: 'Q8' },
    { id: '0209', provinceId: '02', name: 'Quận 9', code: 'Q9' },
    { id: '0210', provinceId: '02', name: 'Quận 10', code: 'Q10' },
    { id: '0211', provinceId: '02', name: 'Quận 11', code: 'Q11' },
    { id: '0212', provinceId: '02', name: 'Quận 12', code: 'Q12' },
    { id: '0213', provinceId: '02', name: 'Bình Tân', code: 'BT' },
    { id: '0214', provinceId: '02', name: 'Bình Thạnh', code: 'BTh' },
    { id: '0215', provinceId: '02', name: 'Gò Vấp', code: 'GV' },
    { id: '0216', provinceId: '02', name: 'Phú Nhuận', code: 'PN' },
    { id: '0217', provinceId: '02', name: 'Tân Bình', code: 'TBi' },
    { id: '0218', provinceId: '02', name: 'Tân Phú', code: 'TP' },
    { id: '0219', provinceId: '02', name: 'Thủ Đức', code: 'TD' },
    // Đà Nẵng
    { id: '0301', provinceId: '03', name: 'Hải Châu', code: 'HC' },
    { id: '0302', provinceId: '03', name: 'Thanh Khê', code: 'TK' },
    { id: '0303', provinceId: '03', name: 'Sơn Trà', code: 'ST' },
    { id: '0304', provinceId: '03', name: 'Ngũ Hành Sơn', code: 'NHS' },
    { id: '0305', provinceId: '03', name: 'Liên Chiểu', code: 'LC' },
    { id: '0306', provinceId: '03', name: 'Cẩm Lệ', code: 'CL' },
];

// Sample wards for Hoàn Kiếm district (id: '0101')
export const VIETNAM_WARDS: Ward[] = [
    // Hoàn Kiếm, Hà Nội
    { id: '010101', districtId: '0101', name: 'Hàng Bái', code: 'HB' },
    { id: '010102', districtId: '0101', name: 'Tây Hồ', code: 'TH' },
    { id: '010103', districtId: '0101', name: 'Trúc Bạch', code: 'TB' },
    { id: '010104', districtId: '0101', name: 'Hàng Gai', code: 'HG' },
    { id: '010105', districtId: '0101', name: 'Hàng Bông', code: 'HBo' },
    { id: '010106', districtId: '0101', name: 'Đống Mỹ Tú', code: 'DMT' },
    { id: '010107', districtId: '0101', name: 'Phố Huế', code: 'PH' },
    { id: '010108', districtId: '0101', name: 'Cửa Đông', code: 'CD' },
    { id: '010109', districtId: '0101', name: 'Cửa Nam', code: 'CN' },
    { id: '010110', districtId: '0101', name: 'Cửa Bắc', code: 'CB' },
    // Chương Mỹ, Hà Nội
    { id: '010201', districtId: '0102', name: 'Chương Mỹ', code: 'CM' },
    { id: '010202', districtId: '0102', name: 'Tân Dân', code: 'TD' },
    { id: '010203', districtId: '0102', name: 'Cử Đông', code: 'CD' },
    { id: '010204', districtId: '0102', name: 'Phù Liễu', code: 'PL' },
    // Quận 1, Hồ Chí Minh
    { id: '020101', districtId: '0201', name: 'Bến Nghé', code: 'BN' },
    { id: '020102', districtId: '0201', name: 'Cầu Ông Lãnh', code: 'COL' },
    { id: '020103', districtId: '0201', name: 'Nguyễn Huệ', code: 'NH' },
    { id: '020104', districtId: '0201', name: 'Tân Định', code: 'TD' },
    { id: '020105', districtId: '0201', name: 'Đa Kao', code: 'DK' },
    // Quận 2, Hồ Chí Minh
    { id: '020201', districtId: '0202', name: 'Thảo Điền', code: 'TD' },
    { id: '020202', districtId: '0202', name: 'Thạnh Mỹ Lợi', code: 'TML' },
    { id: '020203', districtId: '0202', name: 'Bình Khánh', code: 'BK' },
];

/**
 * Get all provinces
 */
export const getProvinces = (): Province[] => {
    return VIETNAM_PROVINCES;
};

/**
 * Get districts by province ID
 */
export const getDistricts = (provinceId: string): District[] => {
    return VIETNAM_DISTRICTS.filter((d) => d.provinceId === provinceId);
};

/**
 * Get wards by district ID
 */
export const getWards = (districtId: string): Ward[] => {
    return VIETNAM_WARDS.filter((w) => w.districtId === districtId);
};

/**
 * Get province by ID
 */
export const getProvinceById = (id: string): Province | undefined => {
    return VIETNAM_PROVINCES.find((p) => p.id === id);
};

/**
 * Get district by ID
 */
export const getDistrictById = (id: string): District | undefined => {
    return VIETNAM_DISTRICTS.find((d) => d.id === id);
};

/**
 * Get ward by ID
 */
export const getWardById = (id: string): Ward | undefined => {
    return VIETNAM_WARDS.find((w) => w.id === id);
};
