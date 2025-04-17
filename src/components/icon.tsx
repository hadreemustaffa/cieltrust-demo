import React from 'react';

import { cn } from '@/utils/cn';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isBorderless?: boolean;
  width?: number;
  height?: number;
}

export default function Icon({ SvgIcon, isBorderless, width = 24, height = 24, className, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(`flex rounded-md ${isBorderless ? '' : 'border border-accent/10 p-2'}`, className)}
      {...props}
    >
      <SvgIcon width={width} height={height} />
    </span>
  );
}
