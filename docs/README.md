# PASCS Frontend Documentation

**Public Administrative Service Consultation System** - A modern web application for streamlining administrative processes at commune and ward offices.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Git for version control

### Installation & Development
```bash
# Clone repository
git clone <repository-url>
cd fe-sep490-pacsfr

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start
```

### Environment Setup
Create `.env.local` file:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend Framework:** Next.js 15 (App Router)
- **UI Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS v4 + HeroUI components
- **State Management:** Zustand + TanStack Query
- **HTTP Client:** Custom client with interceptors
- **Development:** ESLint, TypeScript strict mode

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (client)/             # Main app routes with layout
│   │   ├── layout.tsx     # MainLayout wrapper
│   │   ├── page.tsx       # Homepage
│   ├── (auth)/          # Public routes (no layout)
│   │   ├── login/         # Authentication
│   │   └── register/      # Register
│   ├── (private)/          # Private routes (with layout)
│   │   ├── queue/         # Queue management
│   │   └── staff/         # Staff dashboard
│   ├── layout.tsx         # Root layout with providers
│
├── core/                  # Core functionality
│   ├── http/
│   │   └── client.ts      # HTTP client with interceptors
│   ├── patterns/
│   │   └── SingletonHook.ts # Global state patterns
│   └── stores/            # Global stores
│
├── modules/               # Feature modules
│   ├── auth/              # Authentication
│   │   ├── api/           # Auth API calls
│   │   ├── components/    # Auth components
│   │   ├── services/      # Auth business logic
│   │   ├── stores/        # Auth state management
│   │   ├── hooks.ts       # Combined auth hooks
│   │   └── types.ts       # Auth TypeScript types
│   └── queue/             # Queue management
│       ├── api/           # Queue API calls
│       ├── components/    # Queue components
│       ├── services/      # Queue business logic
│       ├── stores/        # Queue state
│       ├── hooks.ts       # Queue hooks
│       └── types.ts       # Queue types
│
└── shared/                # Shared resources
    ├── components/        # Reusable components
    │   ├── layout/        # Layout components
    │   │   ├── main/      # Main app layout
    │   │   ├── admin/     # Admin layout
    │   │   ├── staff/     # Staff layout
    │   │   └── citizen/   # Citizen layout
    │   ├── home/          # Homepage components
    │   └── ui/            # UI primitives
    ├── hooks/             # Shared hooks
    ├── lib/               # Utilities
    ├── const/             # Constants
    └── providers/         # React providers
```

## 🎨 UI/UX Design System

### Layout System
The application uses a centralized layout system with Next.js route groups:

#### Route Groups
- **`(app)/`**: Main application routes with header/footer layout
- **`(public)/`**: Public pages without main layout (login, signup)
- **`(private)/`**: Protected routes with authentication checks

#### Layout Hierarchy
```typescript
// Root Layout (app/layout.tsx)
<html>
  <body>
    <AppProviders>
      {children} // Route group layouts
      <GlobalToast />
    </AppProviders>
  </body>
</html>

// App Layout (app/(app)/layout.tsx)
<MainLayout>
  {children} // Individual pages
</MainLayout>

// Page Component (app/(app)/page.tsx)
<>
  <HeroSection />
  <FeaturesSection />
  <StatsSection />
</>
```

### Component Library
- **Layout Components**: Header, Footer, Container, Section
- **UI Primitives**: Button, Input, Card with variants
- **Feature Components**: Queue boards, auth forms, dashboards
- **Home Components**: Hero, Features, Stats sections

### Design Tokens
- **Colors**: Blue/Indigo primary, Gray neutrals, semantic colors
- **Typography**: Geist Sans with size scale, proper line heights
- **Spacing**: Consistent scale using Tailwind spacing
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions, hover effects, loading states

## 🔧 Development Patterns

### Module Architecture
Each feature is organized as a self-contained module:

```typescript
// Feature Module Structure
src/modules/<feature>/
├── api/              # HTTP API functions
├── components/       # Feature-specific components
├── services/         # Business logic
├── stores/           # State management
├── hooks.ts          # Combined hooks export
├── types.ts          # TypeScript definitions
└── index.ts          # Module barrel export
```

### API Integration Pattern
```typescript
// 1. Define API paths
// src/shared/const/api.path.ts
export const API_PATH = {
  QUEUE: {
    OVERVIEW: "/queue/overview",
    COUNTERS: "/queue/counters",
  },
};

// 2. Create API functions
// src/modules/queue/api/queue.api.ts
export const queueApi = {
  async getOverview() {
    return http.get<QueueOverview>(API_PATH.QUEUE.OVERVIEW);
  },
};

// 3. Business logic in services
// src/modules/queue/services/queue.service.ts
export const queueService = {
  async getOverviewWithFallback() {
    try {
      const response = await queueApi.getOverview();
      return response.data;
    } catch {
      return getMockData(); // Fallback for development
    }
  },
};

// 4. React hooks integration
// src/modules/queue/hooks.ts
export function useQueueOverview() {
  const query = useQuery({
    queryKey: ["queue", "overview"],
    queryFn: () => queueService.getOverviewWithFallback(),
    refetchInterval: 5000, // 5s polling
  });
  
  return query;
}
```

### State Management Strategy
- **Local State**: React useState for component-specific state
- **Feature State**: Zustand stores for module-level state
- **Server State**: TanStack Query for API data with caching
- **Global State**: Singleton hooks for cross-cutting concerns

### Component Patterns
```typescript
// Reusable component with variants
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const classes = cn(
    "font-medium rounded-lg transition-all duration-200",
    variants[variant],
    sizes[size]
  );
  
  return <button className={classes} {...props} />;
}

// Feature component with hooks
export function QueueOverview() {
  const { data: overview, isLoading } = useQueueOverview();
  const { counters } = useQueueStore();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <Container>
      <StatsGrid stats={overview?.totals} />
      <CountersList counters={counters} />
    </Container>
  );
}
```

## 🔒 Security & Performance

### Security Measures
- Environment variable separation (public vs server)
- HTTP client with request/response interceptors
- Authentication token management
- Input validation and sanitization
- CORS and CSP headers

### Performance Optimizations
- Next.js App Router with automatic code splitting
- TanStack Query for efficient data caching
- Image optimization with Next.js Image component
- Lazy loading for route-based components
- Bundle analysis and optimization

### Monitoring & Analytics
- Error boundary implementation
- Performance monitoring hooks
- User interaction tracking
- API response time monitoring
- Build-time bundle analysis

## 🚦 Key Features

### Queue Management System
- **Real-time Updates**: 5-second polling for live queue status
- **Multi-counter Support**: Independent queue management per service counter
- **Smart Notifications**: Automated alerts and status updates
- **Performance Analytics**: KPI tracking and reporting

### Staff Dashboard
- **Queue Control**: Call next, complete, skip queue items
- **Performance Metrics**: Individual and team performance tracking
- **Auto-management**: 120-second auto-skip for inactive items
- **Service Assignment**: Dynamic service type management

### Citizen Portal
- **Queue Status**: Real-time queue position and wait times
- **Service Information**: Available services and requirements
- **Digital Ticketing**: QR code-based queue tickets
- **Feedback System**: Service quality rating and feedback

### Administrative Tools
- **User Management**: Role-based access control
- **System Configuration**: Queue settings and service definitions
- **Reporting**: Comprehensive analytics and reports
- **Integration APIs**: External system connectivity

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile devices
- **Tablet**: md breakpoint (768px+) for tablet layouts
- **Desktop**: lg breakpoint (1024px+) for desktop features
- **Large Screens**: xl breakpoint (1280px+) for enhanced layouts

### Component Responsiveness
- Fluid typography with clamp() functions
- Responsive grid layouts with CSS Grid
- Adaptive navigation (mobile hamburger → desktop nav)
- Touch-friendly interactions on mobile devices

## 🧪 Testing Strategy

### Testing Tools
- **Unit Tests**: Jest with React Testing Library
- **Integration Tests**: API route testing with MSW
- **E2E Tests**: Playwright for critical user flows
- **Type Checking**: TypeScript strict mode validation

### Testing Patterns
```typescript
// Component testing
describe("QueueOverview", () => {
  it("displays loading state initially", () => {
    render(<QueueOverview />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  
  it("renders queue data when loaded", async () => {
    const mockData = createMockQueueData();
    mockQueueApi.getOverview.mockResolvedValue(mockData);
    
    render(<QueueOverview />);
    
    await waitFor(() => {
      expect(screen.getByText("Total Waiting: 12")).toBeInTheDocument();
    });
  });
});

// Hook testing
describe("useQueueOverview", () => {
  it("fetches queue data on mount", async () => {
    const { result } = renderHook(() => useQueueOverview());
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
```

## 🚀 Deployment

### Build Process
```bash
# Development build
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

### Environment Configuration
- **Development**: Local development with mock APIs
- **Staging**: Pre-production testing environment
- **Production**: Live system with full API integration

### Deployment Targets
- **Vercel**: Recommended for Next.js applications
- **Docker**: Containerized deployment option
- **Static Export**: For CDN deployment if needed

## 📚 Additional Resources

### Documentation Links
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [Zustand State Management](https://github.com/pmndrs/zustand)

### Project Conventions
- [Cursor Rules](.cursor/rules.md) - Development guidelines
- [Component Structure](docs/COMPONENT_STRUCTURE.md) - UI architecture
- [API Patterns](docs/API_PATTERNS.md) - Backend integration
- [Deployment Guide](docs/DEPLOYMENT.md) - Production setup

---

**PASCS Frontend** - Built with modern web technologies for efficient public service delivery.
