import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import AlertTriangleIcon from '@/images/icons/alert-triangle.svg?react';
import ArrowUpIcon from '@/images/icons/arrow-up.svg?react';
import HomeIcon from '@/images/icons/home.svg?react';

import supabase from '@/utils/supabase';

import { ButtonPrimary, LinkButtonTertiary } from '@/components/button';
import Icon from '@/components/icon';
import { PasswordInput } from '@/components/password';

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const methods = useForm<FormData>();

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { data: resetData, error: resetError } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (resetError) {
      console.error('Error updating password:', resetError.message);
      setError(true);
      setErrorMessage('Password reset failed. Please use the reset link sent to your email to complete this process.');
      reset();
      return;
    }
    if (resetData) {
      setError(false);
      setErrorMessage('');
      reset();
      navigate('/dashboard/');
    }
  };

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-8">
      <div className="flex max-w-md flex-col gap-4">
        <div className="flex flex-col gap-2 pb-2">
          <p className="text-2xl font-bold">Reset account password</p>
          <p>
            Please create a new secure password for your account. Your password should be at least 8 characters long.
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
            autoComplete="off"
          >
            <PasswordInput isRequired label={'New Password'} id={'password'} />

            <PasswordInput isRequired label={'Confirm New Password'} id={'confirmPassword'} />

            {error && (
              <div className="flex flex-row items-center gap-2 rounded-sm bg-red-100 p-2 text-left text-red-900">
                <Icon SvgIcon={AlertTriangleIcon} width={16} height={16} isBorderless />
                <p className="text-xs">{errorMessage}</p>
              </div>
            )}

            <ButtonPrimary type="submit" className="w-full">
              Reset Password
            </ButtonPrimary>
          </form>
        </FormProvider>

        <LinkButtonTertiary to="/" className="w-fit gap-1 text-left transition-all hover:pl-1">
          <Icon className="-rotate-90" SvgIcon={ArrowUpIcon} width={16} height={16} isBorderless />
          <Icon className="sm:hidden" SvgIcon={HomeIcon} isBorderless />
          <span className="hidden sm:inline">Back to homepage</span>
        </LinkButtonTertiary>
      </div>
    </div>
  );
}
