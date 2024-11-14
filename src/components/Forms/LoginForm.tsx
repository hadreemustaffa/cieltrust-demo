import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { LoginFormProps } from "../../types/forms";
import { ERROR_MSG } from "../../data/errorMessages";
import {
  DEMO_ACCOUNT,
  EMAIL_REGEX,
  LOCAL_STORAGE_KEY,
} from "../../data/constants";

// icons import
import EyeIcon from "../../images/icons/eye.svg?react";
import EyeOffIcon from "../../images/icons/eye-off.svg?react";

// components import
import ErrorMessage from "../ErrorMessage";
import { ButtonPrimary, LinkButtonTertiary } from "../Button";
import { useAuth } from "../../context/AuthProvider";

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDemoAccountChecked, setIsDemoAccountChecked] = useState(false);
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormProps>();

  // const isAuthenticatedUser = (email: string, password: string) => {
  //   if (
  //     email === DEMO_ACCOUNT.email &&
  //     password === DEMO_ACCOUNT.password
  //   ) {
  //     return true;
  //   }

  //   // Check if user exists and password matches for registered users
  //   const user = users.find((user: LoginFormProps) => user.email === email);
  //   return user ? user.password === password : false;
  // };

  const handleDemoAccount = () => {
    setIsDemoAccountChecked(!isDemoAccountChecked);

    if (!isDemoAccountChecked) {
      setValue("email", DEMO_ACCOUNT.email);
      clearErrors("email");
      setValue("password", DEMO_ACCOUNT.password);
      clearErrors("password");
    } else {
      setValue("email", "");
      setValue("password", "");
    }
  };

  const onSubmit: SubmitHandler<LoginFormProps> = () => {
    auth.login({
      email: getValues("email"),
      password: getValues("password"),
    });
  };

  return (
    <form
      className="flex w-full max-w-4xl flex-col items-center gap-4 lg:items-start"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2 text-left">
          <div className="flex flex-row justify-between">
            <label className="text-sm" htmlFor="email">
              Email:
            </label>
            <div className="flex flex-row-reverse gap-2 text-sm text-link transition-colors duration-300 hover:text-link-hover">
              <label htmlFor="demo-checkbox">Use demo account?</label>
              <input
                id="demo-checkbox"
                type="checkbox"
                checked={isDemoAccountChecked}
                onChange={() => handleDemoAccount()}
              />
            </div>
          </div>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              pattern: { value: EMAIL_REGEX, message: ERROR_MSG.INVALID_EMAIL },
              validate: {
                isRegisteredUser: (value) => {
                  const users = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]",
                  );

                  if (value === DEMO_ACCOUNT.email) {
                    return true;
                  }

                  const user = users.find(
                    (user: LoginFormProps) => user.email === value,
                  );
                  return user || ERROR_MSG.USER_NOT_FOUND;
                },
              },
            })}
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
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
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
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
                })}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-sm text-accent/20 transition-colors duration-300 hover:text-accent-hover"
                aria-controls="password"
                aria-label="toggle password visibility"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>
        </div>
      </div>

      {auth.errorMessage && (
        <ErrorMessage error={ERROR_MSG.INVALID_CREDENTIALS} />
      )}

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
