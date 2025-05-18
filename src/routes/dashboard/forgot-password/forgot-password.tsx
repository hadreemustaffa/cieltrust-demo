import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ArrowUpIcon from '@/images/icons/arrow-up.svg?react';
import CheckCircleIcon from '@/images/icons/check-circle.svg?react';
import HomeIcon from '@/images/icons/home.svg?react';
import LockIcon from '@/images/icons/lock.svg?react';

import supabase from '@/utils/supabase';

import { ButtonPrimary, LinkButtonTertiary } from '@/components/button';
import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';

import { EMAIL_REGEX } from '@/data/constants';
import { ERROR_MSG } from '@/data/errorMessages';

interface FormData {
  email: string;
}

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const MESSAGE_TIMEOUT = 5000;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { data: userData, error: userError } = await supabase
      .rpc('get_user_by_email', {
        email_param: data.email,
      })
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError.message);
      return;
    }

    if (!userData) {
      setSuccess(true);
      setSuccessMessage(
        'If an account exists with this email address, you will receive a password reset link shortly.',
      );
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, MESSAGE_TIMEOUT);
      reset();
      return;
    }

    const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password/`,
    });

    if (resetError) {
      console.error('Error sending password reset email:', resetError.message);
      return;
    }

    if (resetData) {
      setSuccess(true);
      setSuccessMessage(
        'If an account exists with this email address, you will receive a password reset link shortly.',
      );
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, MESSAGE_TIMEOUT);
      reset();
    }
  };

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-8">
      <div className="flex max-w-md flex-col gap-4">
        <div className="flex flex-col gap-2 pb-2">
          <p className="text-2xl font-bold">Forgot your password?</p>
          <p>Enter your email address below and we&apos;ll send you a link to reset your password.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-2 md:gap-4"
          autoComplete="off"
        >
          <div className="flex w-full flex-col gap-2 text-left">
            <div className="flex flex-row justify-between">
              <label className="text-sm" htmlFor="forgotPasswordEmail">
                Email:
              </label>
            </div>
            <Input
              id="forgotPasswordEmail"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register('email', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                pattern: {
                  value: EMAIL_REGEX,
                  message: ERROR_MSG.INVALID_EMAIL,
                },
              })}
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}

            <div
              className={`w-full transition-transform duration-300 ease-in-out ${success ? 'h-fit' : 'h-0'} `}
              aria-hidden={!success}
            >
              {success && (
                <div className="flex flex-row items-center gap-2 rounded bg-green-100 p-2 text-green-900">
                  <Icon SvgIcon={CheckCircleIcon} width={16} height={16} isBorderless />
                  <p className="text-xs">{successMessage}</p>
                </div>
              )}
            </div>
          </div>

          <ButtonPrimary type="submit" className="w-full">
            Request Reset Link
          </ButtonPrimary>
        </form>

        <div className="grid grid-cols-2 items-center gap-2">
          <LinkButtonTertiary to="/" className="gap-1 text-left transition-all hover:pl-1">
            <Icon className="-rotate-90" SvgIcon={ArrowUpIcon} width={16} height={16} isBorderless />
            <Icon className="sm:hidden" SvgIcon={HomeIcon} isBorderless />
            <span className="hidden sm:inline">Back to homepage</span>
          </LinkButtonTertiary>
          <LinkButtonTertiary to="/login/" className="justify-end gap-1 transition-all hover:pr-1">
            <span className="hidden sm:inline">Login</span>
            <Icon className="sm:hidden" SvgIcon={LockIcon} isBorderless />
            <Icon className="rotate-90" SvgIcon={ArrowUpIcon} width={16} height={16} isBorderless />
          </LinkButtonTertiary>
        </div>
      </div>
    </div>
  );
}
