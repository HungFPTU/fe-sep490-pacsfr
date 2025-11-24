import { useMemo } from "react";
import type { Service } from "../types";
import type { OptionItem } from "../types/filter.types";
import { formatField, formatExecutionLevel, formatServiceType } from "../formatters";

const DEFAULT_SERVICE_TYPES: OptionItem[] = [
    { id: "CITIZEN", name: "Công dân" },
    { id: "BUSINESS", name: "Doanh nghiệp" },
];

const DEFAULT_EXECUTION_LEVELS: OptionItem[] = [
    { id: "NATIONAL", name: "Cấp Quốc gia" },
    { id: "PROVINCIAL", name: "Cấp Tỉnh" },
    { id: "DISTRICT", name: "Cấp Huyện" },
    { id: "WARD", name: "Cấp Xã" },
];

export const useDerivedFilterOptions = (services: Service[] = []) => {
    return useMemo(() => {
        const serviceTypeMap = new Map<string, string>();
        const fieldMap = new Map<string, string>();
        const executionLevelMap = new Map<string, string>();

        services.forEach((service) => {
            if (service.serviceType) {
                serviceTypeMap.set(service.serviceType, formatServiceType(service.serviceType) || service.serviceType);
            }
            if (service.field) {
                fieldMap.set(service.field, formatField(service.field) || service.field);
            }
            if (service.executionLevel) {
                executionLevelMap.set(
                    service.executionLevel,
                    formatExecutionLevel(service.executionLevel) || service.executionLevel
                );
            }
        });

        const toOptions = (map: Map<string, string>, fallback: OptionItem[] = []) => {
            if (map.size === 0) return fallback;
            return Array.from(map.entries())
                .map(([id, name]) => ({ id, name }))
                .sort((a, b) => a.name.localeCompare(b.name, "vi"));
        };

        return {
            serviceTypes: toOptions(serviceTypeMap, DEFAULT_SERVICE_TYPES),
            fields: toOptions(fieldMap),
            executionLevels: toOptions(executionLevelMap, DEFAULT_EXECUTION_LEVELS),
        };
    }, [services]);
};


