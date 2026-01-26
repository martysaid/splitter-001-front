import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { userService } from '@/services/user.service';
import { useAuthStore } from '@/features/auth/hooks/use-auth';
import { logError } from '@/lib/error-messages';
import { User } from '@/features/auth/types/auth.types';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const useProfileForm = (user: User | null) => {
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
    },
  });

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        setSuccess(null);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const onSubmit = async (data: ProfileFormData) => {
    clearMessages();
    try {
      const response = await userService.updateProfile(data);
      setUser(response.data.user);
      setSuccess('Your profile has been updated successfully.');
    } catch (err) {
      logError('[use-profile-form] onSubmit', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    error,
    success,
    clearMessages,
  };
};
