// icons import
import AlertCircleIcon from "../images/icons/alert-circle.svg?react";

// components import
import Icon from "./Icon";

type Error = {
  error: string | undefined;
};

const ErrorMessage: React.FC<Error> = ({ error }) => {
  return (
    <div className="flex flex-row items-center gap-2 text-red-500">
      <Icon SvgIcon={AlertCircleIcon} width={16} height={16} isBorderless />
      <p role="alert" className="text-xs">
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
