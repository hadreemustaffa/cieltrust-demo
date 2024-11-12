import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { LoginFormProps } from "../../types/forms";
import { ERROR_MSG } from "../../data/errorMessages";
import { EMAIL_REGEX, LOCAL_STORAGE_KEY } from "../../data/constants";

// icons import
import EyeIcon from "../../images/icons/eye.svg?react";
import EyeOffIcon from "../../images/icons/eye-off.svg?react";

// components import
import ErrorMessage from "../ErrorMessage";
import { ButtonPrimary, LinkButtonTertiary } from "../Button";

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = () =>
    alert("Successflly logged in");

  let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");

  const isExistingUser = (value: string) => {
    const user = users.find((user: LoginFormProps) => {
      return user.email === value;
    });

    return user;
  };

  const isPasswordCorrect = (value: string) => {
    const user = users.find((user: LoginFormProps) => {
      return user.email === getValues("email");
    });

    return user.password === value;
  };

  return (
    <form
      className="flex w-full max-w-xl flex-col items-center gap-4"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2 text-left">
          <label className="text-sm" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              pattern: { value: EMAIL_REGEX, message: ERROR_MSG.INVALID_EMAIL },
              validate: (value) => {
                return isExistingUser(value) || ERROR_MSG.USER_NOT_FOUND;
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <ErrorMessage error={errors.email.message} />
          )}
          {errors.email && errors.email.type === "pattern" && (
            <ErrorMessage error={errors.email.message} />
          )}
          {errors.email && errors.email.type === "validate" && (
            <ErrorMessage error={errors.email.message} />
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-2 text-left">
            <div className="flex flex-row justify-between">
              <label className="text-sm" htmlFor="password">
                Password:
              </label>
              <Link
                to="/forgot-password/"
                className="text-sm text-link transition-colors duration-300 hover:text-link-hover"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: {
                    value: true,
                    message: ERROR_MSG.FIELD_IS_REQUIRED,
                  },
                  minLength: {
                    value: 8,
                    message: ERROR_MSG.PASSWORD_TOO_SHORT,
                  },
                  validate: (value) => {
                    return (
                      isPasswordCorrect(value) || ERROR_MSG.INCORRECT_PASSWORD
                    );
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-sm text-accent/20 transition-colors duration-300 hover:text-accent-hover"
                aria-controls="password"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && errors.password.type === "required" && (
              <ErrorMessage error={errors.password.message} />
            )}
            {errors.password && errors.password.type === "minLength" && (
              <ErrorMessage error={errors.password.message} />
            )}
            {errors.password && errors.password.type === "validate" && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-8">
        <LinkButtonTertiary to="/signup/" isPaddingless>
          Create account
        </LinkButtonTertiary>
        <ButtonPrimary type="submit">Log In</ButtonPrimary>
      </div>
    </form>
  );
}

export default LoginForm;
