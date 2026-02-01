# Frontend - React/TypeScript

Modern React frontend application built with TypeScript, following bulletproof-react architecture patterns.

> **Note**: This is part of a monorepo. See the [root README](../../README.md) for project setup and monorepo commands.

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for build tooling and development server
- **TanStack Query** for server state management
- **TanStack Router** for type-safe routing
- **Tailwind CSS** for styling
- **Shadcn/ui** for accessible, customizable components
- **Zustand** for client state management
- **Zod** for runtime type validation
- **React Hook Form** for form handling

## Development

All commands are run from the **project root** unless otherwise noted.

### Running the Dev Server

```bash
# From project root
npm run dev:front
```

The frontend runs at http://localhost:5173

### Other Commands (from project root)

```bash
npm run build:front      # Production build
npm run test --workspace=app/front    # Run tests
npm run lint --workspace=app/front    # Lint code
```

### Commands from app/front directory

If working directly in the frontend directory:

```bash
cd app/front

npm run dev              # Start dev server
npm test                 # Run tests
npm run test:ui          # Tests with UI
npm run test:coverage    # Coverage report
npm run lint             # Lint
npm run type-check       # TypeScript check
npm run format           # Format with Prettier
npm run build            # Production build
npm run preview          # Preview production build
```

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── ui/             # Shadcn base components
│   ├── layout/         # Layout components (wrappers, navigation)
│   └── landing/        # Landing page components
├── features/           # Feature-based modules
│   ├── auth/           # Authentication (magic link, guards)
│   ├── dashboard/      # Main dashboard
│   ├── houses/         # House management
│   ├── expenses/       # Expense tracking
│   ├── members/        # Member management
│   ├── member-dashboard/  # Individual member views
│   ├── invitations/    # Invitation handling
│   └── users/          # User profile
├── routes/             # TanStack Router route definitions
├── services/           # API service layer
├── lib/                # Utility functions and shared hooks
├── config/             # Environment configuration
├── types/              # Global TypeScript definitions
├── test/               # Test utilities and setup
└── mocks/              # MSW mock handlers for testing
```

### Feature Module Structure

Each feature follows a consistent pattern:

```
features/[feature-name]/
├── components/         # Feature-specific components
├── hooks/              # Feature-specific hooks
├── schemas/            # Zod validation schemas
├── services/           # Feature-specific API calls
├── types/              # Feature-specific types
└── constants/          # Feature constants
```

## Environment Variables

Create a `.env.local` file in `app/front/`:

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Features

### Authentication
- Magic link authentication
- JWT token management
- Protected routes with auth guards
- Automatic token refresh

### Houses & Expenses
- Create and manage houses
- Track shared expenses
- Member management with invitations
- Expense splitting

### UI Components
- Accessible components via Radix UI primitives
- Consistent design system
- Responsive design
- Form validation with visual feedback

## Architecture

This frontend follows **bulletproof-react** patterns:

- **Feature-based organization** - Code organized by domain features, not file types
- **Absolute imports** - Clean imports using `@/` prefix
- **Type safety** - TypeScript strict mode with Zod runtime validation
- **Component composition** - Reusable, composable UI components
- **Colocation** - Related code lives together within features
- **Service layer** - API calls abstracted into services

## Testing

Uses Vitest with React Testing Library:

```bash
# From project root
npm run test --workspace=app/front

# From app/front directory
npm test                 # Run tests
npm run test:ui          # Interactive UI
npm run test:coverage    # With coverage
```

## Deployment

Configured for **Cloudflare Pages** via `wrangler.toml` and GitHub Actions.

### Automatic Deployment (CI/CD)

On push to `main`, the GitHub Actions workflow will:
1. Run tests, linting, and type-checking
2. Build the application
3. Deploy to Cloudflare Pages

### Required GitHub Secrets

Configure these in your GitHub repo: **Settings → Secrets and variables → Actions**

| Secret | Description | How to obtain |
|--------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | API token with Pages permissions | Cloudflare Dashboard → My Profile → API Tokens → Create Token → Use "Edit Cloudflare Workers" template or create custom with "Cloudflare Pages:Edit" permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Cloudflare Dashboard → Overview → Copy Account ID from right sidebar |
| `VITE_API_URL` | Backend API URL | e.g., `https://your-backend.up.railway.app/api/v1` |

### Manual Deployment

```bash
npm run build
npx wrangler pages deploy dist --project-name=splitter-frontend
```

The built files output to `dist/` directory.
