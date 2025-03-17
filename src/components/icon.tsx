import React from 'react';

type IconProps = {
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isBorderless?: boolean;
  width?: number;
  height?: number;
};

export default function Icon({ SvgIcon, isBorderless, width = 24, height = 24, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex rounded-md ${isBorderless ? '' : 'border border-accent/10 p-2'}`}
      {...props}
    >
      <SvgIcon width={width} height={height} />
    </span>
  );
}
