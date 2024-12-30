import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { signup } from '@/actions/signup';
import { ButtonPrimary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { EMAIL_REGEX } from '@/data/constants';
import { ERROR_MSG } from '@/data/errorMessages';
import EyeOffIcon from '@/images/icons/eye-off.svg?react';
import EyeIcon from '@/images/icons/eye.svg?react';

interface SignUpFormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
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
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await signup({
        firstName: getValues('firstName'),
        lastName: getValues('lastName'),
        email: getValues('email'),
        password: getValues('password'),
      });

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

  return (
    <form
      className="flex w-full max-w-4xl flex-col items-center gap-4 lg:items-start"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-2 text-left">
          <label htmlFor="firstName" className="text-sm">
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
            autoComplete="given-name"
            aria-invalid={errors.firstName ? 'true' : 'false'}
            disabled={isLoading}
            {...register('firstName', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              maxLength: { value: 30, message: ERROR_MSG.MAX_LENGTH_EXCEEDED },
            })}
          />
          {errors.firstName && <ErrorMessage error={errors.firstName.message} />}
        </div>

        <div className="flex w-full flex-col gap-2 text-left">
          <label htmlFor="lastName" className="text-sm">
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
            autoComplete="family-name"
            aria-invalid={errors.lastName ? 'true' : 'false'}
            disabled={isLoading}
            {...register('lastName', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              maxLength: { value: 30, message: ERROR_MSG.MAX_LENGTH_EXCEEDED },
            })}
          />
          {errors.lastName && <ErrorMessage error={errors.lastName.message} />}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-2 text-left">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={isLoading}
            {...register('email', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              pattern: { value: EMAIL_REGEX, message: ERROR_MSG.INVALID_EMAIL },
            })}
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-2 text-left">
            <label className="text-sm" htmlFor="password">
              Password:
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                className="w-full rounded-md border border-accent/10 bg-transparent px-4 py-2"
                autoComplete="new-password"
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

      <div className="flex w-full justify-end">
        <ButtonPrimary type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </ButtonPrimary>
      </div>
    </form>
  );
}
