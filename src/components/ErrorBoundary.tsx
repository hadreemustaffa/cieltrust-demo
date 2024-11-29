import { useRouteError } from "react-router";
import { LinkButtonPrimary } from "./Button";

// icons import
import AlertCircleIcon from "../images/icons/alert-circle.svg?react";

// components import
import Icon from "./Icon";

function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="col-start-2 flex h-[75vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-8">
      <div className="flex max-w-xl flex-col items-center gap-8">
        <div className="text-red-500">
          <Icon SvgIcon={AlertCircleIcon} isBorderless width={48} height={48} />
        </div>
        <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
        <p>There was a problem processing the request, please try again.</p>
      </div>
      <LinkButtonPrimary to="/">Back to homepage</LinkButtonPrimary>
    </div>
  );
}

export default ErrorBoundary;
