import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { redirect } from 'react-router';

import AlertTriangleIcon from '@/images/icons/alert-triangle.svg?react';
import XIcon from '@/images/icons/x.svg?react';

import supabase from '@/utils/supabase';

import { useSession } from '@/hooks/use-session';

import { ButtonDelete, ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import { PasswordInput } from '@/components/password';


import { deleteUser } from '@/actions/delete';
import { logout } from '@/actions/logout';

interface SettingsProps {
  firstName: string;
  lastName: string;
  password?: string;
  confirmPassword?: string;
  handleClose: () => void;
}

export default function Settings({ firstName, lastName, handleClose }: SettingsProps) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { session } = useSession();

  const methods = useForm<SettingsProps>();

  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit: SubmitHandler<SettingsProps> = async () => {
    const updatedData: { data: { first_name: string; last_name: string }; password?: string } = {
      data: {
        first_name: getValues('firstName'),
        last_name: getValues('lastName'),
      },
    };

    if (getValues('password') !== '') {
      updatedData.password = getValues('password');
    }

    if (firstName === updatedData.data.first_name && lastName === updatedData.data.last_name && !updatedData.password) {
      handleClose();
      return;
    }

    const { error } = await supabase.auth.updateUser(updatedData);

    if (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
    } else {
      setIsError(false);
      setErrorMessage('');
      handleClose();
    }
  };

  const handleDeleteAccount = async () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.',
    );

    if (!userConfirmed) return;

    const confirmationText = prompt("Please type 'DELETE' to confirm account deletion:");
    if (confirmationText?.toUpperCase() !== 'DELETE') {
      if (confirmationText || confirmationText === '') {
        alert(`Please enter the correct confirmation text.\nAccount deletion cancelled.`);
      }
      return;
    }

    try {
      await deleteUser();
      await logout();

      redirect('/login/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 p-4 pb-0">
        <h2 className="text-lg font-medium">Settings</h2>
        <ButtonTertiary onClick={handleClose}>
          <Icon SvgIcon={XIcon} isBorderless />
        </ButtonTertiary>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 overflow-y-auto p-4">
          <div className="space-y-4 text-left">
            {session?.user.email && <p className="text-left text-copy/70">{session?.user.email}</p>}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstNameSettings" className="text-sm">
                First Name:
              </label>

              <Input
                id="firstNameSettings"
                type="text"
                placeholder="Enter first name"
                defaultValue={firstName}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                {...register('firstName')}
              />
              {errors.firstName && <ErrorMessage error={errors.firstName.message} />}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastNameSettings" className="text-sm">
                Last Name:
              </label>

              <Input
                id="lastNameSettings"
                type="text"
                placeholder="Enter last name"
                defaultValue={lastName}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                {...register('lastName')}
              />
              {errors.lastName && <ErrorMessage error={errors.lastName.message} />}
            </div>

            <PasswordInput label={'New Password'} id={'password'} />

            <PasswordInput label={'Confirm New Password'} id={'confirmPassword'} />

            {isError && <ErrorMessage error={errorMessage} />}
          </div>
          <div className="flex flex-col gap-4 border-y border-y-accent/10 py-6">
            <div className="rounded-md bg-red-100 p-3 text-left">
              <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-2">
                  <Icon SvgIcon={AlertTriangleIcon} isBorderless className="text-red-500" />
                  <h3 className="text-sm font-medium text-red-800">Warning: Account Deletion</h3>
                </div>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Your account will be permanently deleted</li>
                    <li>All records will be cleared from our database</li>
                    <li>This data cannot be recovered once deleted</li>
                  </ul>
                </div>
              </div>
            </div>

            <ButtonDelete onClick={handleDeleteAccount}>Delete Account</ButtonDelete>
          </div>
          <div className="flex justify-end space-x-3">
            <ButtonSecondary type="button" onClick={handleClose}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary type="submit" disabled={isSubmitting}>
              Save
            </ButtonPrimary>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
