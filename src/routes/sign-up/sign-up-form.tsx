import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonPrimary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/forms/custom-form';
import { PasswordInput } from '@/components/password';

import { signup } from '@/actions/signup';
import { EMAIL_REGEX } from '@/data/constants';
import { ERROR_MSG } from '@/data/errorMessages';

interface SignUpFormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const methods = useForm<SignUpFormData>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<SignUpFormData> = async () => {
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await signup({
        firstName: getValues('firstName'),
        lastName: getValues('lastName'),
        email: getValues('email'),
        password: getValues('password'),
      });

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

  return (
    <FormProvider {...methods}>
      <form
        className="flex w-full flex-col items-center gap-8 lg:items-start"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-2 text-left">
            <label htmlFor="firstName" className="text-sm">
              First Name:
            </label>
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={errors.firstName ? 'true' : 'false'}
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
            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              aria-invalid={errors.lastName ? 'true' : 'false'}
              {...register('lastName', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                maxLength: { value: 30, message: ERROR_MSG.MAX_LENGTH_EXCEEDED },
              })}
            />
            {errors.lastName && <ErrorMessage error={errors.lastName.message} />}
          </div>

          <div className="flex w-full flex-col gap-2 text-left">
            <label htmlFor="email" className="text-sm">
              Email:
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                pattern: { value: EMAIL_REGEX, message: ERROR_MSG.INVALID_EMAIL },
              })}
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}
          </div>

          <PasswordInput id="password" label="Password" isRequired />

          {isError && <ErrorMessage error={errorMessage} />}
        </div>

        <ButtonPrimary
          type="submit"
          className={`w-full ${isSubmitting ? 'animate-pulse bg-brand-hover' : ''} `}
          disabled={isSubmitting}
        >
          Sign Up
        </ButtonPrimary>
      </form>
    </FormProvider>
  );
}
