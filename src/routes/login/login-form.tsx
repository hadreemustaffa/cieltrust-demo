import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ButtonPrimary } from '@/components/button';
import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import { PasswordInput } from '@/components/password';

import { login, loginAnonymously } from '@/actions/login';
import { EMAIL_REGEX } from '@/data/constants';
import { ERROR_MSG } from '@/data/errorMessages';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const methods = useForm<LoginFormData>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const handleAnonymousLogin = async () => {
    setIsError(false);

    try {
      const result = await loginAnonymously();

      if (result?.error) {
        setIsError(true);
        setErrorMessage(result.error.message);
      } else {
        navigate('/dashboard/');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('An unexpected error occurred');
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<LoginFormData> = async () => {
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await login({
        email: getValues('email'),
        password: getValues('password'),
      });

      if (result?.error) {
        setIsError(true);
        setErrorMessage(result.error.message || ERROR_MSG.INVALID_CREDENTIALS);
      } else {
        navigate('/dashboard/');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('An unexpected error occurred');
      console.log(error);
    }
  };

  return (
    <>
      <ButtonPrimary onClick={handleAnonymousLogin} disabled={isSubmitting}>
        Continue as guest
      </ButtonPrimary>

      <div className="flex w-full max-w-4xl flex-row items-center gap-4">
        <div className="h-px w-full bg-accent/10"></div>
        <p className="text-sm text-accent/10">or</p>
        <div className="h-px w-full bg-accent/10"></div>
      </div>

      <FormProvider {...methods}>
        <form
          className="flex w-full max-w-4xl flex-col items-center gap-8 lg:items-start"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-2 text-left">
              <div className="flex flex-row justify-between">
                <label className="text-sm" htmlFor="email">
                  Email:
                </label>
              </div>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
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

            <div className="relative">
              <PasswordInput id="password" label="Password" isRequired />
              <Link
                to="/forgot-password/"
                className="absolute right-0 top-0 text-sm text-link transition-colors duration-300 hover:text-link-hover"
              >
                Forgot password?
              </Link>
            </div>

            {isError && <ErrorMessage error={errorMessage || ERROR_MSG.INVALID_CREDENTIALS} />}
          </div>

          <ButtonPrimary
            type="submit"
            className={`w-full ${isSubmitting ? 'animate-pulse bg-brand-hover' : ''}`}
            disabled={isSubmitting}
          >
            Login
          </ButtonPrimary>

          <p className="mx-auto text-sm text-copy/50">
            Don&apos;t have an account?{' '}
            <Link to="/signup/" className="text-link underline transition-colors duration-300 hover:text-link-hover">
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </>
  );
}
