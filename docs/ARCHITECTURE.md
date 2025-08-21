# PASCS Frontend Architecture

## Overview

The PASCS (Public Administrative Service Consultation System) frontend is built using a modern, scalable architecture that emphasizes modularity, maintainability, and developer experience.

## Architecture Principles

### 1. Centralized Layout Management
- **Single Layout Import**: MainLayout is imported once at the route group level
- **Route-based Organization**: Next.js route groups separate concerns
- **No Layout Duplication**: Individual pages focus only on content

### 2. Module-based Feature Organization
- **Self-contained Modules**: Each feature has its own directory with all related files
- **Clear Boundaries**: API, components, services, and stores are separated
- **Barrel Exports**: Clean imports through index.ts files

### 3. Layer Separation
- **Presentation Layer**: React components and UI logic
- **Business Logic Layer**: Services with domain-specific logic
- **Data Layer**: API calls and state management
- **Infrastructure Layer**: HTTP client, utilities, and providers

## Directory Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (client)/                    # Main application routes
│   │   ├── layout.tsx            # Wraps MainLayout once
│   │   ├── page.tsx              # Homepage (no layout import)
│   ├── (public)/                 # Public routes (without main layout)
│   │   └── login/page.tsx        # Login page
│   ├── layout.tsx                # Root layout with providers
│
├── core/                         # Core infrastructure
│   ├── http/
│   │   └── client.ts             # HTTP client with interceptors
│   ├── patterns/
│   │   └── SingletonHook.ts      # Global state patterns
│   ├── stores/                   # Global stores
│   ├── env.ts                    # Environment configuration
│   └── logger.ts                 # Logging utilities
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication module
│   │   ├── api/auth.api.ts       # Auth API calls
│   │   ├── components/           # Auth-specific components
│   │   │   └── LoginForm.tsx
│   │   ├── services/             # Auth business logic
│   │   │   └── auth.service.ts
│   │   ├── stores/               # Auth state management
│   │   │   └── useAuthStore.ts
│   │   ├── hooks.ts              # Combined auth hooks
│   │   ├── types.ts              # Auth TypeScript types
│   │   └── index.ts              # Module exports
│   │
│   └── queue/                    # Queue management module
│       ├── api/queue.api.ts      # Queue API calls
│       ├── components/           # Queue-specific components
│       │   ├── CitizenQueueBoard.tsx
│       │   └── StaffQueuePanel.tsx
│       ├── services/             # Queue business logic
│       │   └── queue.service.ts
│       ├── stores/               # Queue state management
│       │   └── useQueueStore.ts
│       ├── hooks.ts              # Combined queue hooks
│       ├── types.ts              # Queue TypeScript types
│       └── index.ts              # Module exports
│
└── shared/                       # Shared resources
    ├── components/               # Reusable components
    │   ├── layout/               # Layout components
    │   │   ├── main/             # Main app layout
    │   │   │   ├── Main.layout.tsx
    │   │   │   └── partials/
    │   │   │       ├── Header.com.tsx
    │   │   │       └── Footer.com.tsx
    │   │   ├── admin/            # Admin-specific layouts
    │   │   ├── staff/            # Staff-specific layouts
    │   │   ├── citizen/          # Citizen-specific layouts
    │   │   └── Container.tsx     # Base container component
    │   ├── home/                 # Homepage components
    │   │   ├── HeroSection.com.tsx
    │   │   ├── FeaturesSection.com.tsx
    │   │   ├── FeatureCard.com.tsx
    │   │   └── StatsSection.com.tsx
    │   └── ui/                   # UI primitives
    │       ├── button.ui.tsx
    │       ├── input.ui.tsx
    │       └── card.ui.tsx
    ├── hooks/                    # Shared React hooks
    │   ├── useDisclosure.ts
    │   ├── useFormValidation.ts
    │   ├── useHttpLoading.tsx
    │   └── index.ts
    ├── lib/                      # Utility functions
    │   ├── utils.ts
    │   ├── cn.ts                 # className utility
    │   └── index.ts
    ├── const/                    # Constants and configurations
    │   ├── api.path.ts           # API endpoint definitions
    │   └── index.ts
    └── providers/                # React context providers
        ├── AppProviders.tsx      # Root provider wrapper
        ├── QueryProvider.tsx     # TanStack Query provider
        ├── ThemeProvider.tsx     # Theme management
        └── HeroUIProvider.tsx    # UI library provider
```

## Layout System Architecture

### Route Group Strategy

The application uses Next.js route groups to organize pages by layout requirements:

#### `(client)/` Route Group
- **Purpose**: Main application routes that require header and footer
- **Layout**: Automatically wraps all pages with MainLayout
- **Pages**: Home, About, Queue, Login, Registration, Password Reset
- **Benefits**: Zero layout imports in individual pages

#### `(private)/` Route Group  
- **Purpose**: Private pages with main navigation
- **Layout**: Custom layouts per page (e.g., centered login form)
- **Pages**: Queue, Staff Dashboard
- **Benefits**: Clean, focused user experience for auth flows

### Layout Hierarchy

```tsx
// Root Layout (app/layout.tsx)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children} // Route group layouts render here
          <GlobalToast />
        </AppProviders>
      </body>
    </html>
  );
}

// App Layout (app/(app)/layout.tsx)
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

// Page Component (app/(app)/page.tsx) - No layout import needed!
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
}
```

## Module Architecture

### Feature Module Pattern

Each feature is organized as a self-contained module following this structure:

```typescript
// Module Structure
src/modules/<feature>/
├── api/              # HTTP API calls
├── components/       # Feature-specific React components
├── services/         # Business logic and data processing
├── stores/           # State management (Zustand stores)
├── hooks.ts          # Combined hooks for the feature
├── types.ts          # TypeScript type definitions
└── index.ts          # Barrel export for clean imports
```

### API Layer Pattern

```typescript
// api/<feature>.api.ts - Raw HTTP calls
export const queueApi = {
  async getOverview(): Promise<HttpResponse<QueueOverview>> {
    return http.get<QueueOverview>(API_PATH.QUEUE.OVERVIEW);
  },
  
  async updateCounter(id: string, data: CounterUpdate): Promise<HttpResponse<Counter>> {
    return http.put<Counter, CounterUpdate>(`${API_PATH.QUEUE.COUNTERS}/${id}`, data);
  },
};
```

### Service Layer Pattern

```typescript
// services/<feature>.service.ts - Business logic
export const queueService = {
  async getOverviewWithFallback(): Promise<QueueOverview> {
    try {
      const response = await queueApi.getOverview();
      return this.processOverviewData(response.data);
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return this.getMockOverview();
    }
  },
  
  processOverviewData(data: QueueOverview): QueueOverview {
    // Business logic, data transformation, validation
    return {
      ...data,
      counters: data.counters.map(counter => ({
        ...counter,
        waitTime: this.calculateWaitTime(counter),
      })),
    };
  },
  
  private calculateWaitTime(counter: Counter): number {
    // Complex business logic
    return counter.queueLength * 5; // 5 minutes per person
  },
};
```

### Store Layer Pattern

```typescript
// stores/use<Feature>Store.ts - Client state management
interface QueueState {
  selectedCounter: string | null;
  filters: QueueFilters;
  viewMode: 'grid' | 'list';
}

interface QueueActions {
  setSelectedCounter: (id: string | null) => void;
  updateFilters: (filters: Partial<QueueFilters>) => void;
  toggleViewMode: () => void;
}

export const useQueueStore = create<QueueState & QueueActions>((set) => ({
  // State
  selectedCounter: null,
  filters: { status: 'all', serviceType: 'all' },
  viewMode: 'grid',
  
  // Actions
  setSelectedCounter: (id) => set({ selectedCounter: id }),
  updateFilters: (filters) => set((state) => ({ 
    filters: { ...state.filters, ...filters } 
  })),
  toggleViewMode: () => set((state) => ({ 
    viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
  })),
}));
```

### Combined Hooks Pattern

```typescript
// hooks.ts - Feature's public API
export function useQueue() {
  const store = useQueueStore();
  
  // Server state with TanStack Query
  const overviewQuery = useQuery({
    queryKey: ['queue', 'overview'],
    queryFn: () => queueService.getOverviewWithFallback(),
    refetchInterval: 5000,
  });
  
  // Mutations
  const updateCounterMutation = useMutation({
    mutationFn: (data: { id: string; update: CounterUpdate }) =>
      queueService.updateCounter(data.id, data.update),
    onSuccess: () => {
      queryClient.invalidateQueries(['queue', 'overview']);
    },
  });
  
  return {
    // Server state
    overview: overviewQuery.data,
    isLoading: overviewQuery.isLoading,
    error: overviewQuery.error,
    
    // Client state
    selectedCounter: store.selectedCounter,
    filters: store.filters,
    viewMode: store.viewMode,
    
    // Actions
    setSelectedCounter: store.setSelectedCounter,
    updateFilters: store.updateFilters,
    toggleViewMode: store.toggleViewMode,
    updateCounter: updateCounterMutation.mutate,
    
    // Computed values
    filteredCounters: computed(() => 
      filterCounters(overviewQuery.data?.counters || [], store.filters)
    ),
  };
}

// Specialized hooks for different user types
export function useStaffQueue(counterId: string) {
  const baseQueue = useQueue();
  
  return {
    ...baseQueue,
    currentCounter: baseQueue.overview?.counters.find(c => c.id === counterId),
    // Staff-specific methods
    callNext: () => queueService.callNext(counterId),
    markComplete: () => queueService.markComplete(counterId),
    skipCurrent: () => queueService.skipCurrent(counterId),
  };
}

export function useCitizenQueue() {
  const baseQueue = useQueue();
  
  return {
    ...baseQueue,
    // Citizen-specific computed values
    estimatedWaitTime: computed(() => 
      calculateEstimatedWait(baseQueue.overview?.counters || [])
    ),
    // Citizen-specific methods
    joinQueue: (serviceType: string) => queueService.joinQueue(serviceType),
  };
}
```

## State Management Architecture

### State Distribution Strategy

1. **Local Component State**: `useState` for simple UI state
2. **Feature State**: Zustand stores for module-specific state
3. **Server State**: TanStack Query for API data with caching
4. **Global State**: Singleton hooks for cross-cutting concerns

### Data Flow Pattern

```
User Action → Component → Hook → Service → API → Server
                ↓          ↓        ↓       ↓
              UI State → Store → Cache → HTTP Client
```

### Error Handling Strategy

```typescript
// Layered error handling
try {
  // API Layer
  const response = await queueApi.getOverview();
  return response.data;
} catch (apiError) {
  // Service Layer - Fallback strategies
  if (apiError.status === 404) {
    return await this.getMockData();
  }
  
  // Log error for monitoring
  logger.error('Queue API failed', apiError);
  
  // Re-throw for hook layer to handle
  throw new QueueServiceError('Failed to load queue data', apiError);
}

// Hook Layer - User-friendly error states
const { data, error, isError } = useQuery({
  queryKey: ['queue', 'overview'],
  queryFn: () => queueService.getOverview(),
  retry: 3,
  retryDelay: 1000,
});

// Component Layer - Error UI
if (isError) {
  return <ErrorBoundary error={error} retry={refetch} />;
}
```

## Performance Optimization

### Code Splitting Strategy
- **Route-level**: Automatic with Next.js App Router
- **Component-level**: React.lazy for heavy components
- **Module-level**: Dynamic imports for optional features

### Caching Strategy
- **API Responses**: TanStack Query with intelligent cache invalidation
- **Static Assets**: Next.js automatic optimization
- **Computed Values**: React useMemo for expensive calculations

### Bundle Optimization
- **Tree Shaking**: ES modules and proper imports
- **Code Analysis**: Bundle analyzer for size monitoring
- **Asset Optimization**: Next.js Image component for images

## Security Architecture

### Authentication Flow
```
User Login → Auth API → JWT Token → HTTP Client → Interceptors
                                        ↓
                                   Automatic Headers
                                        ↓
                                  Protected Requests
```

### Authorization Pattern
- **Route Protection**: Higher-order components for route guards
- **Component Protection**: Conditional rendering based on permissions
- **API Protection**: Token-based authentication headers

## Development Workflow

### Adding New Features

1. **Create Module Structure**
```bash
mkdir src/modules/new-feature
mkdir src/modules/new-feature/{api,components,services,stores}
touch src/modules/new-feature/{hooks.ts,types.ts,index.ts}
```

2. **Define Types**
```typescript
// types.ts
export interface NewFeature {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface NewFeatureFilters {
  status: 'all' | 'active' | 'inactive';
}
```

3. **Implement API Layer**
```typescript
// api/new-feature.api.ts
export const newFeatureApi = {
  async list() {
    return http.get<NewFeature[]>(API_PATH.NEW_FEATURE.LIST);
  },
};
```

4. **Add Business Logic**
```typescript
// services/new-feature.service.ts
export const newFeatureService = {
  async getFilteredFeatures(filters: NewFeatureFilters) {
    const response = await newFeatureApi.list();
    return this.applyFilters(response.data, filters);
  },
};
```

5. **Create Store**
```typescript
// stores/useNewFeatureStore.ts
export const useNewFeatureStore = create<State & Actions>((set) => ({
  // Implementation
}));
```

6. **Combine in Hooks**
```typescript
// hooks.ts
export function useNewFeature() {
  // Combine server state, client state, and actions
}
```

7. **Export from Module**
```typescript
// index.ts
export * from './hooks';
export * from './types';
export * from './components';
```

This architecture ensures scalability, maintainability, and developer productivity while following Next.js and React best practices.
