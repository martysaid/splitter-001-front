/**
 * Centralized error message handling for user-facing error messages
 * Maps technical errors to user-friendly messages while preventing security leaks
 */

export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_TOKEN:
    'Your login link has expired.\nYou will be redirected to the login page so you can get a new one.',
  USER_NOT_FOUND: "We couldn't find an account with that email address.",
  AUTH_FAILED: 'Authentication failed. Please try again.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'You need to be logged in to access this feature.',
  VERIFICATION_FAILED:
    'Your verification link is not working. \n\nPlease try logging in again. You will be redirected shortly.',

  // Invitation errors
  INVITATION_EXPIRED:
    'This invitation has expired.\nPlease ask the house organizer for a new invitation.',
  INVITATION_ALREADY_ACCEPTED:
    'This invitation has already been accepted.\nPlease log in to access your account.',
  INVITATION_INVALID: 'This invitation link is invalid.',
  INVITATION_FAILED: 'Failed to accept invitation. Please try again.',

  // Payment errors
  PAYMENT_FAILED: 'Payment could not be processed. Please check your payment details.',
  CARD_DECLINED: 'Your card was declined. Please try a different payment method.',
  INSUFFICIENT_FUNDS: 'Insufficient funds. Please use a different payment method.',
  INVALID_PAYMENT_METHOD: 'Invalid payment method. Please check your details.',
  PAYMENT_PROCESSING: 'Payment is being processed. Please wait.',
  STRIPE_ERROR: 'Payment service is temporarily unavailable. Please try again later.',

  // Network & Server errors
  NETWORK_ERROR: 'Connection error. Please check your internet connection.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',

  // Validation errors
  VALIDATION_ERROR: 'Please check your input and try again.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',

  // Database errors
  DUPLICATE_RESOURCE: 'This item already exists. Please use different information.',
  INVALID_REFERENCE: 'The referenced item no longer exists or is invalid.',
  DATABASE_CONSTRAINT_ERROR:
    'The data provided violates system constraints. Please check your input.',

  // Generic fallbacks
  DEFAULT: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * Error patterns to match against error messages for classification
 */
const ERROR_PATTERNS = {
  // Auth patterns
  token: ['token', 'expired', 'invalid', 'jwt'],
  unauthorized: ['unauthorized', '401', 'not authorized', 'access denied'],
  auth: ['authentication', 'login', 'signin'],

  // Payment patterns
  payment: ['payment', 'charge', 'transaction'],
  card: ['card_declined', 'card declined', 'insufficient_funds', 'card_error'],
  stripe: ['stripe', 'payment_intent', 'payment_method'],

  // Network patterns
  network: ['fetch', 'network', 'connection', 'ECONNREFUSED', 'ENOTFOUND'],
  timeout: ['timeout', 'ETIMEDOUT'],
  server: ['500', 'internal server', 'server error'],

  // Validation patterns
  validation: ['validation', 'required', 'invalid', 'missing'],
} as const;

/**
 * Maps error types to user-friendly messages with security considerations
 * @param error - The error to process (Error object, string, or unknown)
 * @param fallback - Fallback message if no specific mapping found
 * @returns User-safe error message
 */
export function getErrorMessage(error: unknown, fallback: string = ERROR_MESSAGES.DEFAULT): string {
  // Handle direct error code strings
  if (typeof error === 'string') {
    const errorCode = error.toUpperCase() as keyof typeof ERROR_MESSAGES;
    return ERROR_MESSAGES[errorCode] || fallback;
  }

  // Handle Error objects
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Log technical details in development only
    if (import.meta.env.DEV) {
      console.group('🐛 Error Details (Development Only)');
      console.error('Original error:', error.message);
      console.error('Stack:', error.stack);
      console.groupEnd();
    }

    // Match against known patterns
    for (const [category, patterns] of Object.entries(ERROR_PATTERNS)) {
      if (patterns.some(pattern => message.includes(pattern))) {
        switch (category) {
          case 'token':
            return ERROR_MESSAGES.INVALID_TOKEN;
          case 'unauthorized':
            return ERROR_MESSAGES.UNAUTHORIZED;
          case 'auth':
            return ERROR_MESSAGES.AUTH_FAILED;
          case 'card':
            if (message.includes('declined')) return ERROR_MESSAGES.CARD_DECLINED;
            if (message.includes('insufficient')) return ERROR_MESSAGES.INSUFFICIENT_FUNDS;
            return ERROR_MESSAGES.PAYMENT_FAILED;
          case 'stripe':
          case 'payment':
            return ERROR_MESSAGES.PAYMENT_FAILED;
          case 'network':
            return ERROR_MESSAGES.NETWORK_ERROR;
          case 'timeout':
            return ERROR_MESSAGES.TIMEOUT_ERROR;
          case 'server':
            return ERROR_MESSAGES.SERVER_ERROR;
          case 'validation':
            return ERROR_MESSAGES.VALIDATION_ERROR;
        }
      }
    }

    // Special handling for common API response patterns
    if (message.includes('404')) return ERROR_MESSAGES.USER_NOT_FOUND;
    if (message.includes('403')) return ERROR_MESSAGES.UNAUTHORIZED;
    if (message.includes('500')) return ERROR_MESSAGES.SERVER_ERROR;
    if (message.includes('503')) return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
  }

  // Handle structured error responses from API
  if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorObj = error as any;

    // Handle our new structured error format
    if (errorObj.response?.data) {
      const responseData = errorObj.response.data;

      // Use backend error codes for consistent mapping
      if (responseData.code) {
        const code = String(responseData.code);
        switch (code) {
          case 'VALIDATION_ERROR':
            return ERROR_MESSAGES.VALIDATION_ERROR;
          case 'AUTHENTICATION_ERROR':
            return ERROR_MESSAGES.UNAUTHORIZED;
          case 'AUTHORIZATION_ERROR':
            return ERROR_MESSAGES.UNAUTHORIZED;
          case 'NOT_FOUND':
            return ERROR_MESSAGES.USER_NOT_FOUND;
          case 'RATE_LIMIT_EXCEEDED':
            return 'Too many requests. Please wait and try again.';
          case 'INTERNAL_SERVER_ERROR':
            return ERROR_MESSAGES.SERVER_ERROR;
          case 'SERVICE_UNAVAILABLE':
            return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
          case 'DUPLICATE_RESOURCE':
            return ERROR_MESSAGES.DUPLICATE_RESOURCE;
          case 'INVALID_REFERENCE':
            return ERROR_MESSAGES.INVALID_REFERENCE;
          case 'DATABASE_CONSTRAINT_ERROR':
            return ERROR_MESSAGES.DATABASE_CONSTRAINT_ERROR;
          default:
            // For unrecognized error codes, fall back to backend message if available
            if (responseData.message && typeof responseData.message === 'string') {
              return responseData.message;
            }
        }
      }
    }

    // Handle HTTP status codes directly
    if (errorObj.status || errorObj.statusCode) {
      const status = errorObj.status || errorObj.statusCode;
      switch (status) {
        case 401:
          return ERROR_MESSAGES.UNAUTHORIZED;
        case 403:
          return ERROR_MESSAGES.UNAUTHORIZED;
        case 404:
          return ERROR_MESSAGES.USER_NOT_FOUND;
        case 422:
          return ERROR_MESSAGES.VALIDATION_ERROR;
        case 500:
          return ERROR_MESSAGES.SERVER_ERROR;
        case 503:
          return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
      }
    }
  }

  return fallback;
}

/**
 * Specialized error handler for authentication errors
 */
export function getAuthErrorMessage(error: unknown): string {
  return getErrorMessage(error, ERROR_MESSAGES.AUTH_FAILED);
}

/**
 * Specialized error handler for payment errors
 */
export function getPaymentErrorMessage(error: unknown): string {
  return getErrorMessage(error, ERROR_MESSAGES.PAYMENT_FAILED);
}

/**
 * Specialized error handler for invitation errors
 * Uses error codes from the backend for reliable matching in production
 */
export function getInvitationErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorObj = error as any;
    const code = errorObj.response?.data?.code;

    switch (code) {
      case 'INVITATION_INVALID':
        return ERROR_MESSAGES.INVITATION_INVALID;
      case 'INVITATION_EXPIRED':
        return ERROR_MESSAGES.INVITATION_EXPIRED;
      case 'INVITATION_ALREADY_ACCEPTED':
        return ERROR_MESSAGES.INVITATION_ALREADY_ACCEPTED;
    }
  }

  return getErrorMessage(error, ERROR_MESSAGES.INVITATION_FAILED);
}

/**
 * Creates a consistent error logging function for debugging
 * Only logs in development environment
 */
export function logError(context: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.group(`🚨 Error in ${context}`);
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    console.groupEnd();
  }
}
