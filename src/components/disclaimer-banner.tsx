import AlertCircleIcon from '@/images/icons/alert-circle.svg?react';

import Icon from '@/components/icon';

export default function FormDisclaimerBanner({ disclaimerText }: { disclaimerText: string }) {
  return (
    <div className="flex h-fit w-full max-w-96 flex-col items-center gap-2 rounded-md border border-accent/10 bg-surface p-4 text-sm lg:items-start lg:text-left">
      <div className="flex flex-row items-center gap-2">
        <span className="text-red-500">
          <Icon SvgIcon={AlertCircleIcon} isBorderless />
        </span>
        <p className="font-semibold">Important Disclaimer</p>
      </div>

      <p>{disclaimerText}</p>
    </div>
  );
}
