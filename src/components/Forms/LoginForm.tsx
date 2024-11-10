import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// components import
import ErrorMessage from "../ErrorMessage";
import { ButtonPrimary } from "../Button";

type Inputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const FIELD_IS_REQUIRED = "This field is required";
  return (
    <form
      className="flex w-full max-w-xl flex-col items-center gap-4"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2 text-left">
          <label className="text-sm" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <ErrorMessage error={FIELD_IS_REQUIRED} />
          )}
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="relative flex w-full flex-col gap-2 text-left">
            <label className="text-sm" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-accent/10 bg-transparent p-2"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type === "required" && (
              <ErrorMessage error={FIELD_IS_REQUIRED} />
            )}

            <Link
              to="/signup/password-reset/"
              className="absolute right-0 top-0 text-sm text-brand/80 hover:text-link-hover hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <ButtonPrimary type="submit">Log In</ButtonPrimary>
      </div>
    </form>
  );
}

export default LoginForm;
