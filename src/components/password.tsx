import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';

import EyeOffIcon from '../images/icons/eye-off.svg?react';
import EyeIcon from '../images/icons/eye.svg?react';

import { ERROR_MSG } from '@/data/errorMessages';

export interface PasswordInputProps {
  label: string;
  id: 'password' | 'confirmPassword';
  isRequired?: boolean;
}

interface FormData {
  [key: string]: string;
}

export const PasswordInput = ({ label, id, isRequired }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormData>();

  const isPassword = id === 'password';
  const isPasswordError = isPassword ? errors.password : errors.confirmPassword;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-2 text-left">
        <label className="text-sm" htmlFor={id}>
          {label}:
        </label>

        <div className="relative">
          <Input
            id={id}
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={isPasswordError ? 'true' : 'false'}
            {...register(id, {
              required: {
                value: isRequired ?? false,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
              minLength: {
                value: 8,
                message: ERROR_MSG.PASSWORD_TOO_SHORT,
              },
              validate: (value) => {
                if (id === 'confirmPassword' && value !== getValues('password')) {
                  return 'Passwords do not match';
                }
              },
            })}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-sm text-accent/20 transition-colors duration-300 hover:text-accent-hover"
            aria-controls={id}
            aria-label="toggle password visibility"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {isPasswordError && <ErrorMessage error={isPasswordError.message} />}
      </div>
    </div>
  );
};
