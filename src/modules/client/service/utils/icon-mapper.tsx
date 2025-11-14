/**
 * Icon Mapper Utility
 * Maps service names/types to Hero Icons
 */

import React from 'react';
import {
    UserIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    HomeIcon,
    HeartIcon,
    BoltIcon,
    BuildingOfficeIcon,
    TruckIcon,
    UserGroupIcon,
    ScaleIcon,
    RocketLaunchIcon,
    CurrencyDollarIcon,
    BuildingStorefrontIcon,
    LightBulbIcon,
    BuildingOffice2Icon,
    DocumentTextIcon,
    ArrowPathIcon,
    PauseCircleIcon,
} from '@heroicons/react/24/outline';
import { ServiceType } from '../enums';

type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * Get Hero Icon component based on service name and type
 */
export const getServiceIcon = (
    serviceName: string,
    serviceType: ServiceType
): IconComponent => {
    const name = serviceName.toLowerCase();

    // Công dân icons (teal theme)
    if (serviceType === ServiceType.CITIZEN) {
        if (name.includes('con') || name.includes('trẻ') || name.includes('trẻ em')) {
            return UserIcon; // Child/Baby
        }
        if (name.includes('học') || name.includes('giáo dục') || name.includes('học tập')) {
            return AcademicCapIcon; // Education
        }
        if (name.includes('việc') || name.includes('lao động') || name.includes('việc làm')) {
            return BriefcaseIcon; // Employment
        }
        if (
            name.includes('cư trú') ||
            name.includes('giấy tờ') ||
            name.includes('căn cước') ||
            name.includes('hộ khẩu')
        ) {
            return HomeIcon; // Residence/Documents
        }
        if (name.includes('hôn nhân') || name.includes('gia đình')) {
            return HeartIcon; // Marriage/Family
        }
        if (name.includes('điện') || name.includes('nhà ở') || name.includes('đất')) {
            return BoltIcon; // Electricity/Housing/Land
        }
        if (name.includes('sức khỏe') || name.includes('y tế')) {
            return BuildingOfficeIcon; // Health/Medical
        }
        if (name.includes('phương tiện') || name.includes('xe') || name.includes('lái')) {
            return TruckIcon; // Vehicles/Drivers
        }
        if (name.includes('hưu trí') || name.includes('nghỉ hưu')) {
            return UserGroupIcon; // Retirement
        }
        if (name.includes('qua đời') || name.includes('khai tử')) {
            return HeartIcon; // Deceased
        }
        if (name.includes('khiếu') || name.includes('kiện')) {
            return ScaleIcon; // Complaints
        }
    }

    // Doanh nghiệp icons (red theme)
    if (serviceType === ServiceType.BUSINESS) {
        if (name.includes('khởi sự') || name.includes('thành lập') || name.includes('kinh doanh')) {
            return RocketLaunchIcon; // Business startup
        }
        if (name.includes('lao động') || name.includes('bảo hiểm')) {
            return UserGroupIcon; // Labor/Social insurance
        }
        if (name.includes('tài chính') || name.includes('thuế')) {
            return CurrencyDollarIcon; // Business finance
        }
        if (name.includes('điện') || name.includes('đất') || name.includes('xây dựng')) {
            return BuildingOffice2Icon; // Electricity/Land/Construction
        }
        if (name.includes('thương mại') || name.includes('quảng cáo')) {
            return BuildingStorefrontIcon; // Trade/Advertising
        }
        if (name.includes('sở hữu') || name.includes('trí tuệ') || name.includes('tài sản')) {
            return LightBulbIcon; // Intellectual property/Asset registration
        }
        if (name.includes('chi nhánh') || name.includes('văn phòng')) {
            return BuildingOffice2Icon; // Branches/Representative offices
        }
        if (name.includes('đấu thầu') || name.includes('mua sắm')) {
            return DocumentTextIcon; // Bidding/Public procurement
        }
        if (name.includes('tái cấu trúc') || name.includes('tổ chức lại')) {
            return ArrowPathIcon; // Business restructuring
        }
        if (name.includes('tranh chấp') || name.includes('hợp đồng')) {
            return ScaleIcon; // Contract dispute resolution
        }
        if (name.includes('tạm dừng') || name.includes('chấm dứt')) {
            return PauseCircleIcon; // Suspension/Termination
        }
    }

    // Default icon
    return DocumentTextIcon;
};

/**
 * Get Hero Icon component for service group based on group name and type
 */
export const getServiceGroupIcon = (
    groupName: string,
    serviceType: ServiceType
): IconComponent => {
    const name = groupName.toLowerCase();

    // Công dân icons
    if (serviceType === ServiceType.CITIZEN) {
        if (name.includes('hành chính') || name.includes('giấy tờ')) {
            return DocumentTextIcon;
        }
        if (name.includes('môi trường')) {
            return BoltIcon; // Environment
        }
        if (name.includes('xây dựng') || name.includes('đất')) {
            return BuildingOffice2Icon;
        }
        if (name.includes('tư pháp')) {
            return ScaleIcon;
        }
    }

    // Doanh nghiệp icons
    if (serviceType === ServiceType.BUSINESS) {
        if (name.includes('hành chính')) {
            return BuildingOfficeIcon;
        }
        if (name.includes('môi trường')) {
            return BoltIcon;
        }
        if (name.includes('xây dựng')) {
            return BuildingOffice2Icon;
        }
        if (name.includes('tư pháp')) {
            return ScaleIcon;
        }
    }

    // Default icon
    return BuildingOfficeIcon;
};

