import React from 'react';
import { create } from 'zustand';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

interface ToastState {
  toasts: ToasterToast[];
}

interface ToastActions {
  addToast: (toast: Omit<ToasterToast, 'id'>) => string;
  dismissToast: (toastId?: string) => void;
  removeToast: (toastId: string) => void;
  updateToast: (toastId: string, toast: Partial<ToasterToast>) => void;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000; // 5 seconds

let toastCount = 0;

function generateId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

export const useToastStore = create<ToastState & ToastActions>((set, get) => ({
  toasts: [],

  addToast: toast => {
    const id = generateId();
    const newToast: ToasterToast = {
      ...toast,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) {
          get().dismissToast(id);
        }
      },
    };

    set(state => ({
      toasts: [newToast, ...state.toasts].slice(0, TOAST_LIMIT),
    }));

    // Auto-dismiss after delay
    setTimeout(() => {
      get().removeToast(id);
    }, TOAST_REMOVE_DELAY);

    return id;
  },

  dismissToast: toastId => {
    set(state => ({
      toasts: state.toasts.map(toast =>
        toast.id === toastId || toastId === undefined ? { ...toast, open: false } : toast
      ),
    }));

    // Remove from state after animation completes
    setTimeout(() => {
      if (toastId) {
        get().removeToast(toastId);
      } else {
        set({ toasts: [] });
      }
    }, 100);
  },

  removeToast: toastId => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== toastId),
    }));
  },

  updateToast: (toastId, updatedToast) => {
    set(state => ({
      toasts: state.toasts.map(toast =>
        toast.id === toastId ? { ...toast, ...updatedToast } : toast
      ),
    }));
  },
}));

// Standalone toast function for use outside React components (services, utilities)
export function toast(props: Omit<ToasterToast, 'id'>) {
  const { addToast, dismissToast, updateToast } = useToastStore.getState();

  const id = addToast(props);

  return {
    id,
    dismiss: () => dismissToast(id),
    update: (newProps: Partial<ToasterToast>) => updateToast(id, newProps),
  };
}

// Hook for react components that need to access toast state and actions
export function useToast() {
  const { toasts } = useToastStore();

  return {
    toasts,
  };
}
