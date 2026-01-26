import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, type SignupFormData } from '../schemas/signup-schema';
import { authService } from '@/services/auth.service';
import { getAuthErrorMessage, logError } from '@/lib/error-messages';

export const useSignupForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await authService.signup(data);
      setEmailSent(true);
    } catch (error) {
      logError('signup', error);
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
