/**
 * Manager Components
 * 
 * Clean Architecture structure for manager interface components
 * 
 * Structure:
 * - core/          Core business components (layout, navigation, widgets)
 * - features/      Feature-specific components (form, modal, table)
 * - ui/            UI primitives (shadcn/ui based)
 */

// ============================================================================
// CORE COMPONENTS
// ============================================================================

// Layout Components
export { ManagerHeader, ManagerBreadcrumb } from './core/layout';

// Navigation Components
export { AppSidebar, NavMain, NavUser, NavProjects } from './core/navigation';

// Widget Components
export { UserMenu, NotificationsMenu } from './core/widgets';

// ============================================================================
// FEATURE COMPONENTS
// ============================================================================

// Form Components
export * from './features/form';

// Modal Components
export { BaseModal } from './features/modal';
export type { ModalProps, ModalSize } from './features/modal';

// Table Components
export { DataTable } from './features/table';

// ============================================================================
// UI PRIMITIVES
// ============================================================================

// Sidebar
export { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';

// Other UI components available via './ui' import
// Example: import { Button } from '@/shared/components/manager/ui/button';

