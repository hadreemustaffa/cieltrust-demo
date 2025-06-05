import AlertCircleIcon from '@/images/icons/alert-circle.svg?react';

import Icon from '@/components/icon';

export default function Tooltip({ text }: { text: string }) {
  return (
    <div id="tooltip-default" className="relative">
      <Icon SvgIcon={AlertCircleIcon} width={16} height={16} isBorderless />
      <p
        role="tooltip"
        className="invisible absolute left-1/2 top-1/2 z-20 min-w-36 rounded-xs border border-accent/10 bg-accent-hover p-1 text-xs text-background opacity-0 transition-opacity duration-300 sm:text-nowrap"
      >
        {text}
      </p>
    </div>
  );
}
