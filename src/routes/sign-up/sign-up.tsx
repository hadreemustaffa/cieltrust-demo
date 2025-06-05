import { Link } from 'react-router-dom';

import Testimonials from '@/components/testimonials';
import SignUpForm from '@/routes/sign-up/sign-up-form';

export default function SignUp() {
  return (
    <>
      <div className="border-accent/10 flex h-[80vh] flex-col items-center justify-center gap-8 rounded-md border p-8">
        <div className="flex w-full max-w-96 flex-col gap-8 md:w-96">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium">Create your account</h1>
            <p className="text-copy/50 mx-auto text-sm">
              Already have an account?{' '}
              <Link to="/login/" className="text-link hover:text-link-hover underline transition-colors duration-300">
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
