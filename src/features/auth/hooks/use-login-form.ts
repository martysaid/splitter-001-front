import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginFormData } from '../schemas/login-schema';
import { authService } from '@/services/auth.service';
import { getAuthErrorMessage, logError } from '@/lib/error-messages';

export const useLoginForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.requestMagicLink({ email: data.email });
      setEmailSent(true);
    } catch (error) {
      logError('login', error);
      form.setError('root', {
        type: 'manual',
        message: getAuthErrorMessage(error),
      });
    }
  };

  return {
    form,
    emailSent,
    onSubmit,
  };
};
