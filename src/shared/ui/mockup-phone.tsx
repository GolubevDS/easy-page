import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import '@/shared/styles/ui/mockup-phone.css';

const mockupPhoneVariants = {
  default: 'mockup-phone',
};

export interface MockupPhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof mockupPhoneVariants;
}

const MockupPhone = React.forwardRef<HTMLDivElement, MockupPhoneProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div className={cn(mockupPhoneVariants[variant], className)} ref={ref} {...props}>
        <div className='camera'></div>
        <div className='display h-full'>{props.children}</div>
      </div>
    );
  }
);

MockupPhone.displayName = 'MockupPhone';

export { MockupPhone };
