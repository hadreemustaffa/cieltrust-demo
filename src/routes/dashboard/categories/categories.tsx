import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckIcon from '@/images/icons/check.svg?react';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import XIcon from '@/images/icons/x.svg?react';

import { cn } from '@/utils/cn';

import useOutsideClick from '@/hooks/use-outside-click';
import { useAppSelector } from '@/hooks/use-redux';

import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';
import { useAddNewCategoryMutation } from '@/routes/dashboard/api.slice';
import { CategoriesProps } from '@/routes/dashboard/categories/categories.types';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';

function Categories({ children, selectedCategories }: CategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);

  const dashboardId = useAppSelector(getDashboardId);
  const [addNewCategory, { isLoading, isSuccess }] = useAddNewCategoryMutation();

  const {
    register,
    setFocus,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ newCategoryName: string }>();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setIsNewCategoryOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsNewCategoryOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClose);

  const handleNewCategoryOpen = () => {
    setIsNewCategoryOpen(true);
    // focus on the input after state is properly updated
    setTimeout(() => {
      setFocus('newCategoryName');
    }, 0);
  };

  const onSubmit: SubmitHandler<{ newCategoryName: string }> = async (data) => {
    try {
      await addNewCategory({
        dashboardId: dashboardId,
        name: data.newCategoryName,
      }).unwrap();
    } catch (error) {
      console.error('Failed to add new category:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIsNewCategoryOpen(false);
    }
  }, [isSuccess, reset]);

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <p className="text-sm">Categories</p>
      <button
        id="budgetCategories"
        type="button"
        onClick={handleButtonClick}
        className="border-accent/10 flex w-full flex-row items-center justify-between gap-2 rounded-md border bg-transparent p-2 text-nowrap hover:cursor-pointer"
      >
        {selectedCategories.length > 0 ? (
          <span>{selectedCategories.length} selected</span>
        ) : (
          <span>Select Categories</span>
        )}

        <Icon SvgIcon={ChevronDownIcon} isBorderless />
      </button>

      <ul
        className={`border-accent/10 bg-card absolute top-full left-0 z-50 flex max-h-32 w-full flex-col gap-2 overflow-y-auto rounded-md border p-4 text-sm shadow-md ${isOpen ? '' : 'invisible'}`}
      >
        {children}

        {isNewCategoryOpen && (
          <>
            <div className="flex w-full flex-row gap-2">
              <input
                type="text"
                placeholder="Category name"
                className="border-accent/10 w-full rounded-md border px-2 py-1 text-sm disabled:opacity-50"
                disabled={isLoading}
                {...register('newCategoryName', {
                  required: {
                    value: true,
                    message: 'Please enter a category name',
                  },
                })}
              />
              <div className="flex flex-row justify-end gap-2">
                <button
                  type="submit"
                  name="new-category-submit"
                  className="text-copy/80 hover:text-copy text-sm underline hover:cursor-pointer disabled:opacity-50"
                  disabled={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  <Icon SvgIcon={CheckIcon} width={16} height={16} isBorderless />
                </button>
                <button
                  type="button"
                  className="text-copy/80 hover:text-copy text-sm underline hover:cursor-pointer disabled:opacity-50"
                  disabled={isLoading}
                  onClick={() => setIsNewCategoryOpen(false)}
                >
                  <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
                </button>
              </div>
            </div>
            {errors.newCategoryName && <ErrorMessage error={errors.newCategoryName.message} />}
          </>
        )}

        <div className="border-accent/10 flex flex-wrap gap-2 rounded-md border p-2 text-xs">
          <p>{`Can't find the category you're looking for?`}</p>
          <button type="button" className="hover:text-copy-secondary underline" onClick={handleNewCategoryOpen}>
            Create a new one
          </button>
        </div>
      </ul>
    </div>
  );
}

export default React.memo(Categories);
