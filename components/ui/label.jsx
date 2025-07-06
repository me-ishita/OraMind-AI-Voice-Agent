import * as React from 'react';
import { cn } from '@/lib/utils'; // If you have a utility file for classNames

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('block text-sm font-medium text-gray-700', className)}
    {...props}
  />
));

Label.displayName = 'Label';

export { Label };
