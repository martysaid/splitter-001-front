import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createHouseSchema, type CreateHouseFormData } from '../schemas/create-house-schema';
import { houseService } from '@/services/house.service';
import { DEFAULT_PAYMENT_DUE_DAYS } from '../constants/house-constants';
import { logError } from '@/lib/error-messages';

export const useCreateHouseForm = () => {
  const [houseCreated, setHouseCreated] = useState(false);
  const [createdHouseId, setCreatedHouseId] = useState<string | null>(null);

  const form = useForm<CreateHouseFormData>({
    resolver: zodResolver(createHouseSchema),
    defaultValues: {
      name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postcode: '',
      default_payment_due_days: DEFAULT_PAYMENT_DUE_DAYS,
    },
  });

  const onSubmit = async (data: CreateHouseFormData) => {
    try {
      const cleanedData = {
        ...data,
        address_line1: data.address_line1 || undefined,
        address_line2: data.address_line2 || undefined,
        city: data.city || undefined,
        state: data.state || undefined,
        postcode: data.postcode || undefined,
        country: 'AU',
      };

      const response = await houseService.createHouse(cleanedData);
      setCreatedHouseId(response.data.house.id);
      setHouseCreated(true);
    } catch (error) {
      logError('create-house', error);
      form.setError('root', {
        type: 'manual',
        message: 'Failed to create house. Please try again.',
      });
    }
  };

  return {
    form,
    houseCreated,
    createdHouseId,
    onSubmit,
  };
};
