# Frontend - React/TypeScript

Modern React frontend built with TypeScript, emphasizing type safety and developer experience.

## Tech Stack & Architecture

### Core Technologies

- **React 18** with functional components and hooks
- **React Vite** for build
- **TypeScript** in strict mode for type safety
- **Zod** for schema validation
- **Zustand** for client state management
- **Vite** for fast development and optimized builds
- **TanStack Query** for server state management
- **TanStack Router** for type-safe routing
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** for accessible component library

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base shadcn components
│   └── layout/         # Layout components
├── features/           # Feature-based modules
│   ├── auth/          # Authentication (magic links, guards)
│   ├── dashboard/     # Dashboard functionality
│   ├── payments/      # Stripe hosted checkout integration
│   └── users/         # User management
├── lib/               # Utilities and configurations
├── routes/            # TanStack Router route definitions
├── services/          # API service functions
└── stores/            # Zustand stores for client state
```

## Development Patterns

### Component Guidelines

- Use functional components with hooks exclusively
- Implement proper TypeScript interfaces for all props
- Use forwardRef for components that need ref forwarding
- Follow compound component pattern for complex UI

```typescript
// Good: Proper component structure
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserProfile = ({ userId, onUpdate }: UserProfileProps) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <ProfileSkeleton />;
  if (!user) return <UserNotFound />;

  return <div>{/* component JSX */}</div>;
};
```

### UI

#### UI Components

- Always install shadcn components with `npx shadcn@latest add <component_name>`
- When adding new UI components always consider using shadcn first and install via `npx shadcn@latest add <component_name>`
- Always use shadcn Skeletons for loading states
- Always consider whether JSX can be made into a resusable component - LIMIT DUPLICATION WHERE POSSIBLE AND APPROPRIATE

#### UI Styles and Spacing

Design values are in rems (but use pixels where appropriate, for example, border radius values).

Colors are specified in @/app/front/\_notes/design-color-system.md

Radius sizing is specified in @app/front/\_notes/design-radius-scale.md

The project is setup generally on an 8px grid. Spacing is specified in @app/front/\_notes/design-spacing-scale.md

#### UI Breakpoints

- The design is mobile first
- The design can expand in width from mobile up
- At 1024 pixel screen width the width of the design should lock
- At 1024 pixel screen width the feature text should be centre aligned.

### State Management Strategy

- **Server State**: TanStack Query for all API data
- **Client State**: React useState for local component state
- **Global Client State**: Zustand stores (use sparingly)
- **Form State**: React Hook Form with Zod validation

### Custom Hooks Pattern

```typescript
// Feature-specific hooks in feature folders
export const useAuth = () => {
  return useAuthStore(state => ({
    user: state.user,
    login: state.login,
    logout: state.logout,
  }));
};

// API hooks using TanStack Query
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getById(userId),
    enabled: !!userId,
  });
};
```

## File Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Services: `kebab-case.service.ts`
- Types: `kebab-case.types.ts`
- Utilities: `kebab-case.ts`
- Where component, class or id naming is required, use appropraite naming for the given element and the context in which it exists.

## Form Handling

### React Hook Form + Zod Pattern

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './auth.schema';

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
};
```

## Stripe Payment Integration

### Hosted Checkout Implementation

- Uses **Stripe Hosted Checkout Sessions** (not Stripe Elements)
- Backend creates checkout sessions, frontend redirects to Stripe's hosted page
- Secure payment processing handled entirely by Stripe

```typescript
// Payment service for hosted checkout
export const paymentService = {
  async createCheckoutSession(data: CreateCheckoutSessionRequest) {
    const response = await api.post('/payments/create-checkout-session', data);
    return response.data;
  },

  redirectToCheckout(url: string) {
    window.location.href = url; // Redirect to Stripe hosted page
  },
};

// Payment component
export const CheckoutButton = ({ amount, description }: CheckoutButtonProps) => {
  const { createCheckoutSession, isLoading } = useCheckout();

  const handleCheckout = async () => {
    const { url } = await createCheckoutSession({ amount, description });
    paymentService.redirectToCheckout(url);
  };

  return (
    <Button onClick={handleCheckout} disabled={isLoading}>
      Pay ${(amount / 100).toFixed(2)}
    </Button>
  );
};
```

### Payment Flow

1. User clicks payment button
2. Frontend calls backend to create Stripe checkout session
3. Backend returns hosted checkout URL
4. Frontend redirects user to Stripe's hosted payment page
5. User completes payment on Stripe's secure page
6. Stripe redirects back to success/cancel URLs
7. Webhooks handle payment confirmation

### Required Environment Variables

- `VITE_API_URL` - Backend API base URL
- No Stripe publishable key needed (hosted checkout doesn't require client-side Stripe.js)

## Testing Approach

### Testing Stack

- **Vitest** for unit and integration tests
- **React Testing Library** for component testing
- **Playwright** for end-to-end testing
- **MSW** for API mocking
- **User Event** for realistic user interactions

### Unit/Integration Testing Patterns

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestWrapper } from '@/test/test-utils';

describe('CheckoutButton', () => {
  it('creates checkout session on click', async () => {
    const user = userEvent.setup();
    render(<CheckoutButton amount={2000} />, { wrapper: TestWrapper });

    await user.click(screen.getByRole('button', { name: /pay/i }));

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith({ amount: 2000 });
  });
});
```

### End-to-End Testing with Playwright

- **Location**: `../../tests/e2e/` (project root level)
- **Target**: Full user workflows across frontend and backend
- **Browser**: Chromium (configurable for Firefox/Safari)
- **Database**: Isolated test containers via docker-compose.test.yml

```typescript
// E2E test example
import { test, expect } from '@playwright/test';

test('should complete magic link authentication flow', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Send magic link' }).click();

  await expect(page.getByText('Check your email')).toBeVisible();
});
```

### Test Organization

- **Unit Tests**: Co-locate with components (`Component.test.tsx`)
- **Complex Suites**: Use `__tests__` folders
- **E2E Tests**: Feature-based in `tests/e2e/feature/`
- **Mocking**: External dependencies (API calls, external libraries)

## Performance Optimization

### Code Splitting

```typescript
// Route-based code splitting
import { lazy } from 'react';

const Dashboard = lazy(() => import('./dashboard'));
const Profile = lazy(() => import('./profile'));
```

### React Optimization

- Use `React.memo()` for expensive components
- Optimize re-renders with `useMemo` and `useCallback`
- Implement proper loading states and error boundaries

## Development Commands

```bash
npm run dev              # Start development server (port 5173)
npm run build            # Production build
npm run preview          # Preview production build
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
npm run lint             # ESLint checking
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format with Prettier
```

## Build & Deployment

### Vite Configuration

- Environment variables must have `VITE_` prefix
- Assets automatically optimized and hashed
- Code splitting enabled by default

### Production Build

```bash
npm run build    # Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

### Deployment

- **Static Files**: Built to `dist/` folder ready for static hosting
- **CI/CD**: GitHub Actions handles build and deployment pipeline
- **Environment**: Production environment variables configured via deployment platform

### Production Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Bundle size optimized
- [ ] Environment variables configured
- [ ] Error boundaries implemented
- [ ] Loading states for all async operations
