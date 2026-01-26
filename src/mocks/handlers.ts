import { http, HttpResponse } from 'msw';

import { mockMemberDashboardData } from '@/features/member-dashboard/mocks/member-dashboard.mock';
import { createMockDevUser } from '@/features/auth/utils/dev-mock-user';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const handlers = [
  // Authentication - POST /api/v1/auth/magic-link
  http.post(`${API_BASE_URL}/auth/magic-link`, async () => {
    return HttpResponse.json(
      {
        status: 'success',
        message: 'Magic link sent to your email',
      },
      {
        status: 200,
      }
    );
  }),

  // Authentication - POST /api/v1/auth/verify
  http.post(`${API_BASE_URL}/auth/verify`, async ({ request }) => {
    const body = (await request.json()) as { token: string };
    const mockUser = createMockDevUser();

    // Log for debugging
    console.log('[MSW] Verify token request received:', { token: body.token });

    // Accept any token in development mode
    return HttpResponse.json(
      {
        status: 'success',
        message: 'Authentication successful',
        data: {
          user: mockUser,
          token: 'mock-jwt-token-dev-12345',
          isNewOrganizer: false,
        },
      },
      {
        status: 200,
      }
    );
  }),

  // Authentication - POST /api/v1/auth/logout
  http.post(`${API_BASE_URL}/auth/logout`, async () => {
    return HttpResponse.json(
      {
        status: 'success',
        message: 'Logged out successfully',
      },
      {
        status: 200,
      }
    );
  }),

  // User - GET /api/v1/users/me
  http.get(`${API_BASE_URL}/users/me`, async () => {
    const mockUser = createMockDevUser();

    return HttpResponse.json(
      {
        status: 'success',
        user: mockUser,
      },
      {
        status: 200,
      }
    );
  }),

  // Member Dashboard - GET /api/v1/houses/:id/tenant-dashboard
  http.get(`${API_BASE_URL}/houses/:id/tenant-dashboard`, () => {
    console.log('member dashboard');

    // Simulate network delay for realistic testing
    return HttpResponse.json(
      {
        status: 'success',
        data: mockMemberDashboardData,
      },
      {
        status: 200,
      }
    );
  }),

  // Mark Payment as Paid - POST /expense-payments/:paymentId/mark-paid
  http.post(`${API_BASE_URL}/expense-payments/:paymentId/mark-paid`, async ({ params }) => {
    const { paymentId } = params;

    // Simulate successful payment marking
    return HttpResponse.json(
      {
        status: 'success',
        message: 'Payment marked as paid successfully',
        data: {
          paymentId,
          paymentStatus: 'paid',
          paymentDate: new Date().toISOString(),
          paymentMethod: 'bank_transfer',
        },
      },
      {
        status: 200,
      }
    );
  }),

  // House Members - GET /api/v1/houses/:id/members
  http.get(`${API_BASE_URL}/houses/:id/members`, () => {
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          members: [
            {
              id: '27c2d3ff-fd99-4767-bed2-db02736e949f',
              house_id: 'd2e5f460-301e-46eb-bd16-d96611c8810e',
              user_id: '86f6958b-ba9e-420f-b4f3-8d88ff48d932',
              is_active: true,
              move_in_date: '2023-12-31T14:00:00.000Z',
              move_out_date: null,
              bank_account_name: 'John Smith',
              bank_bsb: '063-000',
              bank_account_number: '12345678',
              payment_reference: 'JOHN-SMITH',
              joined_at: '2025-10-31T10:54:30.417Z',
              created_at: '2025-10-31T10:54:30.386Z',
              updated_at: '2025-10-31T10:54:30.386Z',
              user: {
                id: '86f6958b-ba9e-420f-b4f3-8d88ff48d932',
                first_name: 'John',
                last_name: 'Smith',
                email: 'john.smith@example.com',
              },
            },
            {
              id: '3f2742d7-56cf-4911-a989-89d918bd0943',
              house_id: 'd2e5f460-301e-46eb-bd16-d96611c8810e',
              user_id: 'bdc19771-abe5-4094-9b1f-bf3128d66fe2',
              is_active: true,
              move_in_date: '2023-12-31T14:00:00.000Z',
              move_out_date: null,
              bank_account_name: 'Emma Wilson',
              bank_bsb: '063-000',
              bank_account_number: '23456789',
              payment_reference: 'EMMA-WILSON',
              joined_at: '2025-10-31T10:54:30.420Z',
              created_at: '2025-10-31T10:54:30.386Z',
              updated_at: '2025-10-31T10:54:30.386Z',
              user: {
                id: 'bdc19771-abe5-4094-9b1f-bf3128d66fe2',
                first_name: 'Emma',
                last_name: 'Wilson',
                email: 'emma.wilson@example.com',
              },
            },
            {
              id: '11b1227c-a022-4c53-8171-62f73f655a10',
              house_id: 'd2e5f460-301e-46eb-bd16-d96611c8810e',
              user_id: '2dbc3c22-771e-4ca1-8edb-f269db1824d6',
              is_active: true,
              move_in_date: '2024-01-31T14:00:00.000Z',
              move_out_date: null,
              bank_account_name: 'Michael Brown',
              bank_bsb: '063-000',
              bank_account_number: '34567890',
              payment_reference: 'MICHAEL-BROWN',
              joined_at: '2025-10-31T10:54:30.421Z',
              created_at: '2025-10-31T10:54:30.386Z',
              updated_at: '2025-10-31T10:54:30.386Z',
              user: {
                id: '2dbc3c22-771e-4ca1-8edb-f269db1824d6',
                first_name: 'Michael',
                last_name: 'Brown',
                email: 'michael.brown@example.com',
              },
            },
          ],
        },
      },
      {
        status: 200,
      }
    );
  }),
];
