import AlertCircleIcon from '@/images/icons/alert-circle.svg?react';

import Icon from '@/components/icon';

type Error = {
  error: string | undefined;
};

export default function ErrorMessage({ error }: Error) {
  return (
    <div className="flex flex-row items-center gap-2 text-red-500">
      <Icon SvgIcon={AlertCircleIcon} width={16} height={16} isBorderless />
      <p role="alert" className="text-xs">
        {error}
      </p>
    </div>
  );
}
