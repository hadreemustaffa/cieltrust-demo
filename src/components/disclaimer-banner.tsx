import Icon from '@/components/icon';
import AlertCircleIcon from '@/images/icons/alert-circle.svg?react';

export default function FormDisclaimerBanner() {
  return (
    <div className="flex max-w-4xl flex-col items-center gap-2 rounded-md border border-accent/10 bg-surface p-4 text-sm lg:items-start lg:text-left">
      <div className="flex flex-row items-center gap-2">
        <span className="text-red-500">
          <Icon SvgIcon={AlertCircleIcon} isBorderless />
        </span>
        <p className="font-semibold">Important Disclaimer</p>
      </div>

      <p>
        This is a demo website intended for testing and exploration purposes only.{' '}
        <span className="font-medium">Please do not enter real or sensitive credentials</span>. We strongly recommend
        using fake or disposable credentials to explore this demo. For your convenience,{' '}
        <span className="font-medium">a demo login is provided</span>. By continuing, you acknowledge that any data
        entered here is for demonstration only and may not be secure.
      </p>
    </div>
  );
}
