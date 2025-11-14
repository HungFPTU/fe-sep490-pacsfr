/**
 * Service Enums
 * 
 * Enum definitions for service module
 */

import React from 'react';
import { UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import type { ComponentType } from 'react';

/**
 * Service Type Enum
 * Represents the target audience for services
 */
export enum ServiceType {
    CITIZEN = 'Công dân',
    BUSINESS = 'Doanh nghiệp',
}

/**
 * Service Type Option Interface
 */
export interface ServiceTypeOption {
    value: ServiceType;
    label: string;
    icon: ComponentType<{ className?: string }>;
}

/**
 * Service Type Options for UI
 */
export const SERVICE_TYPE_OPTIONS: ServiceTypeOption[] = [
    { value: ServiceType.CITIZEN, label: 'Công dân', icon: UserIcon },
    { value: ServiceType.BUSINESS, label: 'Doanh nghiệp', icon: BuildingOfficeIcon },
];

/**
 * Get ServiceType label
 */
export const getServiceTypeLabel = (type: string): string => {
    if (type === ServiceType.CITIZEN) return 'Công dân';
    if (type === ServiceType.BUSINESS) return 'Doanh nghiệp';
    return type;
};

