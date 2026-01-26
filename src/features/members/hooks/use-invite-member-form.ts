import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { inviteMemberSchema, type InviteMemberFormData } from '../schemas/invite-member-schema';
import { memberService } from '@/services/member.service';
import { logError } from '@/lib/error-messages';

interface UseInviteMemberFormOptions {
  houseId: string;
}

export const useInviteMemberForm = ({ houseId }: UseInviteMemberFormOptions) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      move_in_date: '',
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

  const onSubmit = async (data: InviteMemberFormData) => {
    clearMessages();
    try {
      await memberService.inviteMember(houseId, data);
      setSuccess(`Invitation sent successfully to ${data.email}.`);
      form.reset();
    } catch (err) {
      logError('[use-invite-member-form] onSubmit', err);
      setError('Failed to send invite. Please try again.');
    }
  };

  return {
    form,
    onSubmit,
    error,
    success,
    clearMessages,
  };
};
