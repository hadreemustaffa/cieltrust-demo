import { SubmitHandler, useForm } from 'react-hook-form';
import { redirect } from 'react-router';

import { deleteUser } from '@/actions/delete';
import { logout } from '@/actions/logout';
import { ButtonDelete, ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@/components/button';
import { Input } from '@/components/forms/custom_form';
import Icon from '@/components/icon';
import { useSession } from '@/hooks/use-session';
import AlertTriangleIcon from '@/images/icons/alert-triangle.svg?react';
import XIcon from '@/images/icons/x.svg?react';
import supabase from '@/utils/supabase';

interface SettingsProps {
  firstName: string;
  lastName: string;
  handleClose: () => void;
}

export default function Settings({ firstName, lastName, handleClose }: SettingsProps) {
  const { session } = useSession();

  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SettingsProps>();

  const onSubmit: SubmitHandler<SettingsProps> = async () => {
    if (firstName === getValues('firstName') && lastName === getValues('lastName')) {
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: getValues('firstName'),
        last_name: getValues('lastName'),
      },
    });

    if (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleDeleteAccount = async () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.',
    );

    if (!userConfirmed) return;

    const verificationText = prompt("Please type 'DELETE' to confirm account deletion:");
    if (verificationText?.toUpperCase() !== 'DELETE') {
      if (verificationText) {
        alert(`Please enter the correct verification text.\nAccount deletion cancelled.`);
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 overflow-y-auto p-4">
        <div className="space-y-4 text-left text-sm">
          {session?.user.email && <p className="text-left text-sm text-copy/70">{session?.user.email}</p>}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstNameSettings" className="text-sm">
              First Name
            </label>

            <Input
              id="firstNameSettings"
              type="text"
              placeholder="Enter first name"
              defaultValue={firstName}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              {...register('firstName')}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastNameSettings" className="text-sm">
              Last Name
            </label>

            <Input
              id="lastNameSettings"
              type="text"
              placeholder="Enter last name"
              defaultValue={lastName}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              {...register('lastName')}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
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
    </>
  );
}
