import { Link } from 'react-router-dom';

import Testimonials from '@/components/testimonials';
import SignUpForm from '@/routes/sign-up/sign-up-form';

export default function SignUp() {
  return (
    <>
      <div className="flex h-[80vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-8">
        <div className="flex w-full max-w-96 flex-col gap-8 md:w-96">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium">Create your account</h1>
            <p className="mx-auto text-sm text-copy/50">
              Already have an account?{' '}
              <Link to="/login/" className="text-link underline transition-colors duration-300 hover:text-link-hover">
                Login
              </Link>
            </p>
          </div>

          <SignUpForm />
        </div>
      </div>

      <Testimonials />
    </>
  );
}
