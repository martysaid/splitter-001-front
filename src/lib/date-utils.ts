export function calculateDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function formatDaysUntilDue(dueDate: string): string {
  const days = calculateDaysUntilDue(dueDate);

  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return `${days} days`;
}
