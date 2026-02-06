import { useState } from 'react';
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
  const [inviteSent, setInviteSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const form = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      move_in_date: '',
    },
  });

  const clearMessages = () => {
    setError(null);
  };

  const resetInviteSent = () => {
    setInviteSent(false);
    setSentEmail('');
    clearMessages();
  };

  const onSubmit = async (data: InviteMemberFormData) => {
    clearMessages();
    try {
      await memberService.inviteMember(houseId, data);
      setSentEmail(data.email);
      setInviteSent(true);
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
    clearMessages,
    inviteSent,
    sentEmail,
    resetInviteSent,
  };
};
