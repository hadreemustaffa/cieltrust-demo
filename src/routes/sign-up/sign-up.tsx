import FormDisclaimerBanner from '@/components/disclaimer-banner';
import Testimonials from '@/components/testimonials';
import SignUpForm from '@/routes/sign-up/sign-up-form';

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-8">
        <FormDisclaimerBanner />
        <div className="flex max-w-4xl flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-5xl">Sign Up</h1>
          <p>Join our community today! Create an account to unlock exclusive features and personalized experiences.</p>
        </div>

        <SignUpForm />
      </div>

      <Testimonials />
    </>
  );
}
