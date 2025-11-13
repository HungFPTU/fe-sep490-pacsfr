/**
 * Color Utilities
 * 
 * Service type and status color mappings for UI components.
 */

// Service type colors
export const SERVICE_TYPE_COLORS = {
    "Trực tuyến": "bg-green-100 text-green-800 border-green-200",
    "Trực tiếp": "bg-blue-100 text-blue-800 border-blue-200",
    "Hành chính": "bg-blue-100 text-blue-800 border-blue-200",
} as const;

// Service type chip colors for HeroUI
export const SERVICE_TYPE_CHIP_COLORS = {
    "Trực tuyến": "success",
    "Trực tiếp": "primary",
    "Hành chính": "primary",
} as const;

/**
 * Get service type color class
 */
export const getServiceTypeColor = (type: string): string => {
    return SERVICE_TYPE_COLORS[type as keyof typeof SERVICE_TYPE_COLORS] || "bg-gray-100 text-gray-800 border-gray-200";
};

/**
 * Get service type chip color for HeroUI
 */
export const getServiceTypeChipColor = (type: string): "success" | "primary" | "default" => {
    return SERVICE_TYPE_CHIP_COLORS[type as keyof typeof SERVICE_TYPE_CHIP_COLORS] || "default";
};

