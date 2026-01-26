import type { HouseMember } from '../types/expense.types';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/currency';
import { cn } from '@/lib/utils';

interface MemberSplitInputProps {
  member: HouseMember;
  splitType: 'equal' | 'custom_percentage' | 'custom_dollar';
  calculatedAmount: number;
  value?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
}

export function MemberSplitInput({
  member,
  splitType,
  calculatedAmount,
  value,
  onChange,
  onFocus,
}: MemberSplitInputProps) {
  const memberName =
    member.user?.first_name && member.user?.last_name
      ? `${member.user.first_name} ${member.user.last_name}`
      : member.bank_account_name;

  const isReadOnly = splitType === 'equal';

  const displayValue = isReadOnly
    ? formatCurrency(calculatedAmount)
    : splitType === 'custom_percentage'
      ? `${value || 0}%`
      : formatCurrency(value || 0);

  return (
    <div
      className={cn('flex items-center justify-between gap-4', splitType === 'equal' ? 'py-4' : '')}
    >
      <span className="text-base font-normal md:text-2xl">{memberName}</span>
      {isReadOnly ? (
        <span className="pr-6 text-base font-normal text-foreground md:text-2xl">
          {displayValue}
        </span>
      ) : (
        <div className="relative inline-flex items-center justify-between gap-4">
          <span className="absolute left-4 text-base text-foreground md:text-2xl">
            {splitType === 'custom_percentage' ? '%' : '$'}
          </span>
          <Input
            type="number"
            variant={'split'}
            step={splitType === 'custom_percentage' ? '0.1' : '0.01'}
            min="0"
            value={value || ''}
            onChange={e => onChange?.(parseFloat(e.target.value) || 0)}
            onFocus={onFocus}
            className="max-w-56 rounded-full pl-6 text-right text-foreground"
            placeholder="0.00"
          />
        </div>
      )}
    </div>
  );
}
