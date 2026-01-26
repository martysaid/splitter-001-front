import React from 'react';

export default function FormMultiFieldWrapper({ children }: { children: React.ReactElement }) {
  return <div className="flex w-full flex-col gap-4">{children}</div>;
}
