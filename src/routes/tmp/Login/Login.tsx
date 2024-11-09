import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// components import
import Testimonials from "../../../components/Testimonials";
import { ButtonPrimary } from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const FIELD_IS_REQUIRED = "This field is required";

  return (
    <>
      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-8">
        <div className="flex max-w-4xl flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-5xl">Login</h1>
          <p>Welcome back! Please log in to access your account</p>
        </div>

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
                  to="/yourbank/signup/password-reset/"
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
      </div>

      <Testimonials />
    </>
  );
}

export default Login;
