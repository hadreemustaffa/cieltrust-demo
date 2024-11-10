// components import
import LoginForm from "../../components/Forms/LoginForm";
import Testimonials from "../../components/Testimonials";

function Login() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-8">
        <div className="flex max-w-4xl flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-5xl">Login</h1>
          <p>Welcome back! Please log in to access your account</p>
        </div>

        <LoginForm />
      </div>

      <Testimonials />
    </>
  );
}

export default Login;
