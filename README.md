# PASCS Frontend

**Public Administrative Service Consultation System** - A modern, scalable web application for streamlining administrative processes at commune and ward administrative offices.

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run production server
bun start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Technology Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Package Manager**: Bun 1.1.0
- **Styling**: Tailwind CSS v4 + HeroUI components
- **State Management**: Zustand + TanStack Query
- **Form Management**: TanStack Form
- **HTTP Client**: Custom Axios client with interceptors
- **File Upload**: AWS S3 integration
- **Development**: ESLint, TypeScript, Bun

## Architecture

### Layered Architecture Pattern

The application follows a strict layered architecture ensuring clean separation of concerns:

```
API Layer → Service Layer → Hooks Layer → Components → Pages
```

Each module follows this flow:
1. **API Layer** (`api/`): Raw HTTP calls to backend
2. **Service Layer** (`services/`): Business logic and data transformation
3. **Hooks Layer** (`hooks/`): React Query hooks for data fetching
4. **Components** (`components/`): UI components and views
5. **Pages** (`view/`): Page components that compose everything

### Module Structure

Each feature module is self-contained and follows a consistent structure:

```
modules/<feature>/
├── api/                    # HTTP API calls
│   └── <feature>.api.ts
├── services/               # Business logic
│   └── <feature>.service.ts
├── hooks/                  # React Query hooks
│   ├── index.ts           # Data fetching hooks
│   └── use<Feature>Form.ts # Form management hooks
├── types/                  # TypeScript definitions
│   ├── request.ts         # Request types (Create, Update, Filters)
│   ├── response.ts        # Response types (Entity types)
│   └── index.ts           # Barrel export
├── components/             # UI Components
│   ├── view/              # Page components
│   │   └── <Feature>ListPage.ui.tsx
│   └── ui/                # Reusable UI components
│       ├── header/        # Header components
│       ├── filter/        # Filter components
│       ├── table/         # Table components
│       ├── modal/         # Modal components
│       ├── detail/        # Detail view components
│       ├── pagination/    # Pagination components
│       └── index.ts       # Barrel export
├── constants/             # Feature constants
│   └── index.ts
├── enums/                 # Feature enums
│   └── index.ts
├── utils/                 # Feature utilities (optional)
│   └── index.ts
└── index.ts               # Module barrel export
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (client)/                 # Public client routes
│   │   ├── layout.tsx            # Client layout
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── faq/                  # FAQ page
│   │   ├── guide/                # Guide page
│   │   ├── lookup/                # Lookup service
│   │   ├── news/                 # News page
│   │   ├── search/               # Search page
│   │   ├── search-questions/     # Question search
│   │   ├── survey/               # Survey page
│   │   └── thu-tuc-hanh-chinh/   # Administrative procedures
│   ├── (auth)/                   # Authentication routes
│   │   └── login/                # Login page
│   ├── (private)/                # Protected routes
│   │   ├── manager/              # Manager dashboard
│   │   │   ├── layout.tsx         # Manager layout
│   │   │   ├── page.tsx           # Manager dashboard
│   │   │   ├── ca-lam-viec/      # Work shift management
│   │   │   ├── co-quan/          # Organization unit management
│   │   │   ├── dich-vu/          # Service management
│   │   │   ├── nhom-dich-vu/     # Service group management
│   │   │   ├── phong-ban/        # Department management
│   │   │   ├── quan-ly-nhan-vien/# Staff management
│   │   │   ├── queue/            # Queue management
│   │   │   └── van-ban-phap-luat/# Legal document management
│   │   └── staff/                 # Staff dashboard
│   │       ├── layout.tsx         # Staff layout
│   │       ├── dashboard/         # Staff dashboard
│   │       ├── create-case/      # Case creation
│   │       ├── queue/             # Staff queue
│   │       └── workshift/        # Work shift
│   ├── (chatbot)/                # Chatbot routes
│   │   ├── layout.tsx            # Chatbot layout
│   │   └── chatBot/              # Chatbot interface
│   ├── api/                      # Next.js API routes
│   │   ├── chat/                 # Chat API
│   │   ├── FileUpload/           # File upload API
│   │   └── upload/               # Upload API
│   ├── layout.tsx                # Root layout with providers
│   └── globals.css               # Global styles
│
├── core/                         # Core infrastructure
│   ├── config/                   # Configuration
│   │   ├── api.path.ts          # Centralized API endpoints
│   │   ├── aws.config.ts        # AWS S3 configuration
│   │   ├── constants.ts         # Global constants
│   │   ├── env.ts               # Environment variables
│   │   └── public.path.ts       # Public API paths
│   ├── http/                     # HTTP client
│   │   └── client.ts            # Axios instance with interceptors
│   ├── hooks/                    # Core hooks
│   │   ├── useFileUpload.ts     # File upload hook
│   │   └── useImageUpload.ts    # Image upload hook
│   ├── patterns/                  # Design patterns
│   │   └── SingletonHook.ts     # Singleton pattern (Toast, etc.)
│   ├── services/                 # Core services
│   │   ├── file-upload.service.ts
│   │   ├── image-upload.service.ts
│   │   └── upload.service.ts
│   ├── utils/                    # Core utilities
│   │   ├── date.ts              # Date utilities
│   │   ├── route-classifier.ts  # Route classification
│   │   ├── storage.ts           # Storage utilities
│   │   └── validation.ts        # Validation utilities
│   └── logger.ts                 # Logging utility
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication module
│   │   ├── api/                  # Auth API calls
│   │   ├── components/           # Auth components
│   │   ├── hooks/                # Auth hooks
│   │   ├── services/             # Auth business logic
│   │   ├── stores/               # Auth state management
│   │   └── utils/                # Auth utilities
│   ├── client/                   # Client-facing modules
│   │   ├── legal-basis/          # Legal basis lookup
│   │   ├── services/             # Service browsing
│   │   └── services-group/       # Service group browsing
│   ├── manager/                  # Manager modules
│   │   ├── counter/              # Counter management
│   │   ├── dashboard/            # Manager dashboard
│   │   ├── department/           # Department management
│   │   ├── legal-document/       # Legal document management
│   │   ├── org-unit/             # Organization unit management
│   │   ├── queue/                # Queue management
│   │   ├── service/              # Service management
│   │   ├── service-group/        # Service group management
│   │   ├── staff/                # Staff management
│   │   └── workshift/            # Work shift management
│   ├── queue/                    # Queue module
│   │   ├── api/                  # Queue API
│   │   ├── components/           # Queue components
│   │   ├── hooks.ts              # Queue hooks
│   │   ├── services/             # Queue service
│   │   └── stores/               # Queue state
│   └── staff/                    # Staff modules
│       ├── case/                 # Case management
│       ├── dashboard/             # Staff dashboard
│       └── workshift/            # Staff work shift
│
└── shared/                       # Shared resources
    ├── components/               # Shared components
    │   ├── common/               # Common UI components
    │   ├── forms/               # Form components
    │   ├── home/                # Homepage components
    │   ├── layout/               # Layout components
    │   │   ├── admin/            # Admin layout
    │   │   ├── citizen/          # Citizen layout
    │   │   ├── main/             # Main layout
    │   │   └── manager/          # Manager layout
    │   ├── manager/              # Manager-specific components
    │   │   ├── core/             # Core manager components
    │   │   ├── features/         # Feature components
    │   │   └── ui/               # Manager UI primitives
    │   ├── search/               # Search components
    │   └── ui/                   # Base UI primitives
    ├── hooks/                    # Shared hooks
    ├── lib/                      # Utilities & helpers
    ├── providers/                # React context providers
    │   ├── AppProviders.tsx     # Main app providers
    │   ├── AuthProvider.tsx      # Auth provider
    │   ├── HeroUIProvider.tsx    # HeroUI provider
    │   ├── QueryProvider.tsx    # React Query provider
    │   └── ThemeProvider.tsx     # Theme provider
    └── types/                    # Shared TypeScript types
```

## Key Features

### Manager Dashboard
- **Service Group Management**: CRUD operations for service groups
- **Service Management**: Administrative service management
- **Department Management**: Organizational structure management
- **Staff Management**: Employee management with work shift assignment
- **Legal Document Management**: Legal document CRUD with file upload
- **Organization Unit Management**: Organizational unit hierarchy
- **Work Shift Management**: Shift scheduling and assignment
- **Queue Management**: Queue system administration
- **Counter Management**: Service counter configuration

### Staff Dashboard
- **Case Management**: Create and manage administrative cases
- **Queue Management**: Handle citizen queue at counters
- **Work Shift View**: View assigned work shifts
- **Dashboard Analytics**: Performance metrics and KPIs

### Client Portal
- **Service Browsing**: Browse available administrative services
- **Service Search**: Advanced search with filters
- **Legal Basis Lookup**: Search legal documents
- **Administrative Procedures**: View procedure details
- **Queue Lookup**: Check queue status
- **News & Updates**: System announcements

### Authentication & Authorization
- **Role-based Access Control**: Manager, Staff, Citizen roles
- **Permission-based Guards**: Route and component protection
- **Session Management**: Token-based authentication
- **Auto-redirect**: Smart redirect after login

## Development Patterns

### API Integration Flow

The application follows a strict flow from API to UI:

```typescript
// 1. Types - Define request and response types
// types/request.ts
export type CreateServiceGroupRequest = {
  groupCode: string;
  groupName: string;
  description: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
};

// types/response.ts
export type ServiceGroup = {
  id: string;
  groupCode: string;
  groupName: string;
  description: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string | Date;
  modifiedAt?: string | Date;
};

// 2. API Layer - Raw HTTP calls
// api/service-group.api.ts
import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

export const serviceGroupApi = {
  getList: (filters: ServiceGroupFilters) => {
    return http.get<RestPaged<ServiceGroup>>(
      API_PATH.MANAGER.SERVICE_GROUP.GET_ALL(
        filters.keyword || '',
        filters.isActive ?? true,
        filters.page,
        filters.size
      )
    );
  },
  create: (data: CreateServiceGroupRequest) => {
    return http.post<RestResponse<ServiceGroup>>(
      API_PATH.MANAGER.SERVICE_GROUP.POST,
      data
    );
  },
};

// 3. Service Layer - Business logic
// services/service-group.service.ts
import { serviceGroupApi } from '../api/service-group.api';
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

export const serviceGroupService = {
  async getServiceGroups(filters: ServiceGroupFilters): Promise<RestPaged<ServiceGroup>> {
    const response = await serviceGroupApi.getList(filters);
    return response.data;
  },
  async createServiceGroup(data: CreateServiceGroupRequest): Promise<ServiceGroup> {
    const response = await serviceGroupApi.create(data);
    if (!response.data?.success || !response.data?.data) {
      throw new Error('Failed to create service group');
    }
    return response.data.data as ServiceGroup;
  },
};

// 4. Hooks Layer - React Query integration
// hooks/index.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceGroupService } from '../services/service-group.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

export const useServiceGroups = (filters: ServiceGroupFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICE_GROUP_LIST(filters),
    queryFn: () => serviceGroupService.getServiceGroups(filters),
    gcTime: CACHE_TIME.LONG,
    staleTime: STALE_TIME.MEDIUM,
  });
};

export const useCreateServiceGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceGroupRequest) =>
      serviceGroupService.createServiceGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SERVICE_GROUP_ALL(),
      });
    },
  });
};

// 5. Components - UI implementation
// components/view/ServiceGroupListPage.ui.tsx
'use client';

import { useState } from 'react';
import { useServiceGroups, useDeleteServiceGroup } from '../../hooks';
import { ServiceGroupTable, ServiceGroupFilter } from '../ui';
import { getValuesPage } from '@/types/rest';

export const ServiceGroupListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data, isLoading } = useServiceGroups({
    keyword,
    isActive: true,
    page,
    size: 10,
  });

  const pageResult = data ? getValuesPage(data) : null;
  const items = pageResult?.items || [];

  return (
    <div className="p-6">
      <ServiceGroupFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
      />
      <ServiceGroupTable
        items={items}
        isLoading={isLoading}
      />
    </div>
  );
};
```

## Development Guidelines

### Code Organization Rules

**Types Separation**
- Separate request types (`request.ts`) and response types (`response.ts`)
- Use barrel exports in `types/index.ts`

**API Layer**
- Only raw HTTP calls, no business logic
- Use centralized `API_PATH` configuration
- Proper TypeScript typing with `RestResponse` and `RestPaged`

**Service Layer**
- Business logic and data transformation
- Error handling and validation
- Return clean data types, not raw API responses

**Hooks Layer**
- React Query hooks for data fetching
- Custom form hooks for complex forms
- Query invalidation on mutations

**Components**
- UI components in `components/ui/`
- Page components in `components/view/`
- Use `.ui.tsx` suffix for component files

### Naming Conventions

- **Files**: kebab-case (`service-group.api.ts`)
- **Components**: PascalCase (`ServiceGroupTable.ui.tsx`)
- **Functions**: camelCase (`getServiceGroups`)
- **Constants**: SCREAMING_SNAKE_CASE (`QUERY_KEYS`)
- **Types**: PascalCase (`ServiceGroup`, `CreateServiceGroupRequest`)

### Import Organization

```typescript
// 1. External dependencies
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Core infrastructure
import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';

// 3. Shared resources
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';

// 4. Module types
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest } from '../types/request';

// 5. Module services/hooks
import { serviceGroupService } from '../services/service-group.service';
import { useServiceGroups } from '../hooks';
```

## Environment Setup

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# AWS S3 Configuration
NEXT_PUBLIC_AWS_REGION=ap-southeast-1
NEXT_PUBLIC_AWS_S3_BUCKET=your-bucket-name
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-access-key
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-secret-key

# Application Configuration
NEXT_PUBLIC_APP_NAME=PASCS
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Development Commands

```bash
# Development
bun dev                    # Start dev server
bun dev:turbo              # Start with Turbo mode
bun dev:restart            # Restart dev server

# Build & Production
bun build                  # Build for production
bun build:vercel           # Build for Vercel
bun start                  # Start production server
bun preview                # Build and start preview

# Code Quality
bun lint                   # Run ESLint
bun type-check             # TypeScript type checking

# Utilities
bun clean                  # Clean build artifacts
bun analyze                # Analyze bundle size
```

## Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - Detailed system architecture
- **[Development Rules](.cursor/rules/cursor-rules.mdc)** - Coding standards and conventions
- **[AWS S3 Setup](docs/AWS_S3_SETUP.md)** - File upload configuration

## Security & Performance

### Security Features
- Environment variable separation (client vs server)
- HTTP interceptors for request/response handling
- Token-based authentication with automatic refresh
- Role-based access control (RBAC)
- Permission-based route guards
- Input validation and sanitization

### Performance Optimizations
- Automatic code splitting with Next.js App Router
- Intelligent data caching with TanStack Query
- Image optimization with Next.js Image component
- Lazy loading for heavy components
- Bundle analysis and optimization

## Project Statistics

- **Framework**: Next.js 15 with App Router
- **Components**: 100+ reusable UI components
- **Modules**: 15+ feature modules
- **Routes**: 30+ application routes
- **Type Safety**: 100% TypeScript coverage
- **Package Manager**: Bun for fast installs and execution

## License

Private project - All rights reserved

---

**PASCS Frontend** - Building the future of public administrative services with modern web technologies.
