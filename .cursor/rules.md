# PASCS Frontend Development Guidelines

**Objective:** Standardize development practices for the Public Administrative Service Consultation System (PASCS) frontend built with Next.js 15 + TypeScript.

## Core Principles

- **Vietnamese UI Content:** Use Vietnamese for all user-facing text and documentation
- **No Hardcoded APIs:** Always define API endpoints in `src/shared/const/api.path.ts` and call through `@core/http/client` or module-specific wrappers
- **Layer Separation:** Maintain clear separation between `api` (raw HTTP calls) and `services` (business logic/utilities)
- **Minimal Component State:** Keep component state minimal; extract complex logic to services/hooks
- **Preserve Formatting:** Respect existing code formatting; avoid unnecessary reformatting

## Technology Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with shared UI components at `@shared/components`
- **Architecture:** Module-based structure: `src/modules/<feature>/{api,components,services,types}`
- **Path Aliases:** `@/*`, `@app/*`, `@core/*`, `@shared/*`, `@modules/*` (see `tsconfig.json`)

## Project Structure

```
src/
├── app/
│   ├── (client)/             # Public client routes with layout
│   │   ├── layout.tsx        # Wraps MainLayout once
│   │   ├── page.tsx          # Home page
│   │   └── about/            # About page
│   ├── (private)/            # Protected routes with layout
│   │   ├── layout.tsx        # Wraps MainLayout once
│   │   ├── queue/            # Queue management
│   │   └── staff/            # Staff dashboard
│   ├── (public)/             # Public routes (login, etc.)
│   │   └── login/
│   └── layout.tsx            # Root layout with providers
├── core/
│   ├── http/client.ts        # HTTP client with interceptors
│   ├── patterns/             # Singleton hooks, patterns
│   └── stores/               # Global stores
├── modules/
│   └── <feature>/
│       ├── api/              # HTTP API calls
│       ├── components/       # Feature components
│       ├── services/         # Business logic
│       ├── stores/           # Feature-specific stores
│       ├── hooks.ts          # Combined feature hooks
│       └── types.ts          # TypeScript definitions
└── shared/
    ├── components/
    │   ├── layout/
    │   │   ├── main/         # Main layout components
    │   │   ├── admin/        # Admin-specific layouts
    │   │   ├── staff/        # Staff-specific layouts
    │   │   └── citizen/      # Citizen-specific layouts
    │   ├── home/             # Homepage components
    │   └── ui/               # Reusable UI primitives
    ├── hooks/                # Shared hooks
    ├── lib/                  # Utilities
    ├── const/                # Constants and API paths
    └── providers/            # React context providers
```

## Layout System

### Centralized Layout Management
- **Root Layout** (`app/layout.tsx`): Contains providers and global components
- **Client Layout** (`app/(client)/layout.tsx`): Wraps MainLayout for public client routes
- **Private Layout** (`app/(private)/layout.tsx`): Wraps MainLayout for protected routes
- **Page Components**: Only contain page-specific content, no layout imports

### Route Groups
- `(client)/`: Public client routes with header/footer (home, about)
- `(private)/`: Protected routes with header/footer (queue, staff dashboard)
- `(public)/`: Public auth routes without main layout (login, signup)

## Development Best Practices

### Build System Issues
- Always clean `.next` directory when encountering build manifest errors
- Kill Node.js processes before cleaning if files are locked
- Use `pnpm` for package management consistency

### TypeScript Standards
- Enable strict mode, avoid `any` type usage
- Use proper ESLint disable comments when `any` is necessary
- Define shared types in module `types.ts`
- Leverage utility types when appropriate

### State Management
- **Local State:** React useState for simple component state
- **Feature State:** Zustand stores in module directories
- **Global State:** Singleton hooks for cross-cutting concerns
- **Server State:** TanStack Query for API data caching

## Prohibited Practices

- ❌ Hardcoding API URLs in components
- ❌ Importing MainLayout in individual pages (use route groups)
- ❌ Reformatting unrelated files
- ❌ Storing secrets in client-side code
- ❌ Mixing HTTP logic with UI components
- ❌ Creating duplicate utility functions

This guideline ensures consistent, maintainable, and scalable development for the PASCS frontend application.
