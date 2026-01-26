import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { userService } from '@/services/user.service';
import { logError, getErrorMessage } from '@/lib/error-messages';

const emailChangeSchema = z.object({
  newEmail: z.string().email('Please enter a valid email address'),
});

export type EmailChangeFormData = z.infer<typeof emailChangeSchema>;

export const useEmailChange = (currentEmail: string) => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        setSuccess(null);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  const form = useForm<EmailChangeFormData>({
    resolver: zodResolver(emailChangeSchema),
    mode: 'onChange',
    defaultValues: {
      newEmail: '',
    },
  });

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const onSubmit = async (data: EmailChangeFormData) => {
    if (data.newEmail === currentEmail) {
      form.setError('newEmail', {
        type: 'manual',
        message: 'New email is the same as your current email',
      });
      return;
    }

    clearMessages();
    try {
      await userService.requestEmailChange(data);
      setEmailSent(true);
      setSuccess('Please check your inbox to confirm the change.');
    } catch (err) {
      logError('[use-email-change] onSubmit', err);
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  const reset = () => {
    setEmailSent(false);
    clearMessages();
    form.reset();
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    emailSent,
    reset,
    error,
    success,
    clearMessages,
  };
};
