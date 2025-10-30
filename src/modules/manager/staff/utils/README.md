# Staff Utils

Utility functions for the Staff management module.

## Overview

This module provides reusable utility functions for staff-related operations, including styling, formatting, validation, and configuration.

## Structure

```
utils/
├── helper.ts          # Main utility functions
├── index.ts           # Export all utilities
└── README.md          # This documentation
```

## Available Functions

### Color & Styling Functions

#### Role Type Styling
- `getRoleTypeColor(roleType: string): string` - Returns HeroUI Chip color for role type
- `getRoleTypeStyle(roleType: string): string` - Returns Tailwind CSS classes for role type

#### Status Styling
- `getStatusColor(isActive: boolean): string` - Returns HeroUI Chip color for status
- `getStatusStyle(isActive: boolean): string` - Returns Tailwind CSS classes for status

#### Position Styling
- `getPositionColor(position: string): string` - Returns HeroUI Chip color for position
- `getPositionStyle(position: string): string` - Returns Tailwind CSS classes for position

#### Common Styling
- `getBadgeStyle(): string` - Returns common badge CSS classes
- `getChipStyle(): string` - Returns common chip CSS classes
- `getActionButtonColors()` - Returns action button color configurations

### Label Functions

- `getStatusLabel(isActive: boolean): string` - Returns status label text
- `getRoleTypeLabel(roleType: string): string` - Returns role type label text
- `getPositionLabel(position: string): string` - Returns position label text

### Formatting Functions

- `formatStaffCode(staffCode: string, username?: string): string` - Formats staff code display
- `formatOrgUnitName(orgUnitName?: string): string` - Formats organization unit name
- `formatPhoneNumber(phone: string): string` - Formats phone number
- `formatEmail(email: string): string` - Formats email address

### Validation Functions

- `isValidRoleType(roleType: string): boolean` - Validates role type
- `isValidStaffStatus(status: string): boolean` - Validates staff status
- `isValidPosition(position: string): boolean` - Validates position

### Configuration Functions

- `getTableConfig()` - Returns table configuration object
- `getTableColumns()` - Returns table column definitions
- `getFilterOptions()` - Returns filter dropdown options

## Usage Examples

### In Table Components

```tsx
import { 
    getRoleTypeColor, 
    getStatusColor, 
    getStatusLabel, 
    getRoleTypeLabel,
    getActionButtonColors 
} from '../../../utils';

// Role type chip
<Chip
    size="sm"
    variant="flat"
    color={getRoleTypeColor(staff.roleType)}
>
    {getRoleTypeLabel(staff.roleType)}
</Chip>

// Status chip
<Chip size="sm" variant="flat" color={getStatusColor(staff.isActive)}>
    {getStatusLabel(staff.isActive)}
</Chip>

// Action buttons
const actionColors = getActionButtonColors();
<button className={`p-2 rounded-lg transition-colors ${actionColors.view}`}>
    <Eye className="w-4 h-4" />
</button>
```

### In Filter Components

```tsx
import { getFilterOptions } from '../../../utils';

const filterOptions = getFilterOptions();

// Status filter
<select>
    {filterOptions.status.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
</select>

// Role type filter
<select>
    {filterOptions.roleType.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
</select>
```

### In Form Components

```tsx
import { 
    formatStaffCode, 
    formatOrgUnitName, 
    formatPhoneNumber,
    isValidRoleType 
} from '../../../utils';

// Display staff code
<span>{formatStaffCode(staff.staffCode, staff.username)}</span>

// Display organization unit
<span>{formatOrgUnitName(staff.orgUnitName)}</span>

// Format phone number
<input value={formatPhoneNumber(staff.phone)} />

// Validate role type
if (isValidRoleType(formData.roleType)) {
    // Process valid role type
}
```

### Custom Styling

```tsx
import { getRoleTypeStyle, getBadgeStyle } from '../../../utils';

// Custom badge with role type styling
<span className={`${getBadgeStyle()} ${getRoleTypeStyle(roleType)}`}>
    {roleTypeLabel}
</span>
```

## Benefits

- ✅ **Consistent Styling** - Unified color scheme across all components
- ✅ **Reusable Logic** - Common functions used throughout the module
- ✅ **Type Safety** - Full TypeScript support with proper typing
- ✅ **Maintainable** - Centralized styling and logic management
- ✅ **Extensible** - Easy to add new utility functions
- ✅ **Performance** - Optimized functions with minimal overhead

## Adding New Utilities

To add new utility functions:

1. Add the function to `helper.ts`
2. Export it in `index.ts`
3. Update this README with documentation
4. Add usage examples

Example:

```typescript
// In helper.ts
export const getNewUtility = (param: string): string => {
    // Implementation
    return result;
};

// In index.ts
export * from './helper'; // Already exports all functions
```

## Dependencies

- `@heroui/react` - For Chip component colors
- `../enums` - For enum values and validation
- `../types` - For TypeScript type definitions
