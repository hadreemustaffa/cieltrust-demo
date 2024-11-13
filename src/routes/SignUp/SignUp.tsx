// components import
import Testimonials from "../../components/Testimonials";
import SignUpForm from "../../components/Forms/SignUpForm";
import FormDisclaimerBanner from "../../components/Forms/FormDisclaimerBanner";

function SignUp() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 rounded-md border border-accent/10 p-8">
        <FormDisclaimerBanner />
        <div className="flex max-w-4xl flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-5xl">Sign Up</h1>
          <p>
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
        </div>

        <SignUpForm />
      </div>

      <Testimonials />
    </>
  );
}

export default SignUp;
