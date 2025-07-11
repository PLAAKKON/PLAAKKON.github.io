'use client';

import * as React from 'react';

type RadioGroupProps = {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
};

export function RadioGroup({ children, onValueChange }: RadioGroupProps) {
  return (
    <div onChange={(e) => {
      const target = e.target as HTMLInputElement;
      if (onValueChange) onValueChange(target.value);
    }}>
      {children}
    </div>
  );
}

type RadioGroupItemProps = {
  id: string;
  value: string;
};

export function RadioGroupItem({ id, value }: RadioGroupItemProps) {
  return (
    <input type="radio" name={id.split('_')[0]} id={id} value={value} className="mr-2" />
  );
}
