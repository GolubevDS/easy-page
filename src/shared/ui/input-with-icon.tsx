import React from 'react';
import { Input } from './input';
import type { InputProps } from './input';
import { cn } from '../lib/utils';

export interface InputWithIconProps extends InputProps {
  icon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, className, ...props }, ref) => (
    <div className={cn(className, 'relative')}>
      {icon ? (
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white'>
          {icon}
        </div>
      ) : null}
      <Input ref={ref} className='pl-10' {...props} />
    </div>
  )
);

InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };
