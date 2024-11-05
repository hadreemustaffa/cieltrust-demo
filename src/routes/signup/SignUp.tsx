import Testimonials from "../../components/Testimonials";
import { ButtonPrimary } from "../../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const FIELD_IS_REQUIRED = "This field is required";
  const MAX_LENGTH_EXCEEDED = "Max length exceeded";

  return (
    <>
      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-8">
        <div className="flex max-w-4xl flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-5xl">Sign Up</h1>
          <p>
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
        </div>

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
              <div className="relative flex w-full flex-col gap-2 text-left">
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

                <Link
                  to="/yourbank/signup/password-reset/"
                  className="absolute right-0 top-0 text-sm text-brand/80 hover:text-link-hover hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </div>
        </form>
      </div>

      <Testimonials />
    </>
  );
}

const ErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <p role="alert" className="text-sm text-red-500">
      {error}
    </p>
  );
};

export default SignUp;
