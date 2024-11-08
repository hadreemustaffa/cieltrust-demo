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
      <Icon SvgIcon={AlertCircleIcon} isBorderless />
      <p role="alert" className="text-sm">
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
