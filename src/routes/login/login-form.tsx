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
        <div className="bg-accent/10 h-px w-full"></div>
        <p className="text-accent/10 text-sm">or</p>
        <div className="bg-accent/10 h-px w-full"></div>
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
                className="text-link hover:text-link-hover absolute top-0 right-0 text-sm transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            {isError && <ErrorMessage error={errorMessage || ERROR_MSG.INVALID_CREDENTIALS} />}
          </div>

          <ButtonPrimary
            type="submit"
            className={`w-full ${isSubmitting ? 'bg-brand-hover animate-pulse' : ''}`}
            disabled={isSubmitting}
          >
            Login
          </ButtonPrimary>

          <p className="text-copy/50 mx-auto text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup/" className="text-link hover:text-link-hover underline transition-colors duration-300">
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </>
  );
}
