import { SubmitHandler, useForm } from "react-hook-form";

// components import
import ErrorMessage from "../ErrorMessage";
import { ButtonPrimary } from "../Button";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const FIELD_IS_REQUIRED = "This field is required";
  const MAX_LENGTH_EXCEEDED = "Max length exceeded";

  return (
    <form
      className="flex w-full max-w-4xl flex-col items-center gap-4"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-2 text-left">
          <label className="text-sm" htmlFor="firstName">
            First Name:
          </label>
          <input
            id="firstName"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            {...register("firstName", {
              required: true,
              maxLength: 30,
            })}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.firstName?.type === "required" && (
            <ErrorMessage error={FIELD_IS_REQUIRED} />
          )}
          {errors.firstName?.type === "maxLength" && (
            <ErrorMessage error={MAX_LENGTH_EXCEEDED} />
          )}
        </div>

        <div className="flex w-full flex-col gap-2 text-left">
          <label className="text-sm" htmlFor="lastName">
            Last Name:
          </label>
          <input
            id="lastName"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            {...register("lastName", { required: true, maxLength: 30 })}
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          {errors.lastName?.type === "required" && (
            <ErrorMessage error={FIELD_IS_REQUIRED} />
          )}
          {errors.lastName?.type === "maxLength" && (
            <ErrorMessage error={MAX_LENGTH_EXCEEDED} />
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-2 text-left">
          <label className="text-sm" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            {...register("email", { required: true })}
          />
          {errors.lastName?.type === "required" && (
            <ErrorMessage error={FIELD_IS_REQUIRED} />
          )}
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-2 text-left">
            <label className="text-sm" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-accent/10 bg-transparent p-2"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Please enter at least 8 characters",
                },
              })}
            />
            {errors.password?.type === "required" && (
              <ErrorMessage error={FIELD_IS_REQUIRED} />
            )}
            {errors.password?.type === "minLength" && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
      </div>
    </form>
  );
}

export default SignUpForm;
