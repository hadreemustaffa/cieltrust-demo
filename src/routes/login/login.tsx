import LoginForm from '@/routes/login/login-form';

export default function Login() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-4">
      <div className="flex w-full max-w-96 flex-col gap-4 md:w-96">
        <div className="flex flex-col gap-2 pb-4">
          <h1 className="text-3xl font-medium">Welcome back</h1>
          <p>Log in to your account</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
