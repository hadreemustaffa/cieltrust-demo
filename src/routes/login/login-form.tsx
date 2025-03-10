import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { login, loginAnonymously } from '@/actions/login';
import { ButtonPrimary, LinkButtonTertiary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { EMAIL_REGEX } from '@/data/constants';
import { ERROR_MSG } from '@/data/errorMessages';
import EyeOffIcon from '@/images/icons/eye-off.svg?react';
import EyeIcon from '@/images/icons/eye.svg?react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await loginAnonymously();

      setIsLoading(false);

      if (result?.error) {
        setIsError(true);
        setErrorMessage(result.error.message);
      } else {
        navigate('/dashboard/');
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage('An unexpected error occurred');
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<LoginFormData> = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await login({
        email: getValues('email'),
        password: getValues('password'),
      });

      setIsLoading(false);

      if (result?.error) {
        setIsError(true);
        setErrorMessage(result.error.message || ERROR_MSG.INVALID_CREDENTIALS);
      } else {
        navigate('/dashboard/');
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage('An unexpected error occurred');
      console.log(error);
    }
  };

  return (
    <>
      <ButtonPrimary onClick={handleAnonymousLogin} disabled={isLoading}>
        Continue as guest
      </ButtonPrimary>

      <div className="flex w-full max-w-4xl flex-row items-center gap-4">
        <div className="h-[1px] w-full bg-accent/10"></div>
        <p className="text-sm text-accent/10">or</p>
        <div className="h-[1px] w-full bg-accent/10"></div>
      </div>

      <form
        className="flex w-full max-w-4xl flex-col items-center gap-8 lg:items-start"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-2 text-left">
            <div className="flex flex-row justify-between">
              <label className="text-sm" htmlFor="email">
                Email:
              </label>
            </div>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              disabled={isLoading}
              {...register('email', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                pattern: {
                  value: EMAIL_REGEX,
                  message: ERROR_MSG.INVALID_EMAIL,
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
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  disabled={isLoading}
                  {...register('password', {
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
                  disabled={isLoading}
                >
                  {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {errors.password && <ErrorMessage error={errors.password.message} />}
            </div>
          </div>
        </div>

        {isError && <ErrorMessage error={errorMessage || ERROR_MSG.INVALID_CREDENTIALS} />}

        <div className="flex w-full justify-end gap-8">
          <LinkButtonTertiary to="/signup/">Create account</LinkButtonTertiary>
          <ButtonPrimary type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </ButtonPrimary>
        </div>
      </form>
    </>
  );
}
