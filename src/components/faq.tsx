import { useState } from 'react';

import { ButtonSecondary } from '@/components/button';

export default function FaqSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:text-left">
        <h2 className="text-2xl font-semibold">
          <span className="text-brand">Frequently</span> Asked Questions
        </h2>
        <p>Still you have any questions? Contact our Team via support@cieltrust.com</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div
          className={`${isExpanded ? 'max-h-full' : 'border-b-accent/20 max-h-[400px] border-b'} flex flex-col gap-4 overflow-y-hidden lg:grid lg:grid-cols-2`}
        >
          <div className="border-accent/10 flex flex-col gap-4 rounded-md border p-4 text-left">
            <h3 className="text-lg font-medium">How do I open an account with Cieltrust?</h3>
            <div className="bg-accent/10 h-px w-full"></div>
            <p>
              Opening an account with Cieltrust is easy. Simply visit our website and click on the &quot;Open an
              Account&quot; button. Follow the prompts, provide the required information, and complete the application
              process. If you have any questions or need assistance, our customer support team is available to help.
            </p>
          </div>
          <div className="border-accent/10 flex flex-col gap-4 rounded-md border p-4 text-left">
            <h3 className="text-lg font-medium">What documents do I need to provide to apply for a loan?</h3>
            <div className="bg-accent/10 h-px w-full"></div>

            <p>
              The documents required for a loan application may vary depending on the type of loan you are applying for.
              Generally, you will need to provide identification documents (such as a passport or driver&apos;s
              license), proof of income (such as pay stubs or tax returns), and information about the collateral (if
              applicable). Our loan officers will guide you through the specific requirements during the application
              process.
            </p>
          </div>
          <div className="border-accent/10 flex flex-col gap-4 rounded-md border p-4 text-left">
            <h3 className="text-lg font-medium">How can I access my accounts online?</h3>
            <div className="bg-accent/10 h-px w-full"></div>

            <p>
              Accessing your accounts online is simple and secure. Visit our website and click on the &quot;Login&quot;
              button. Enter your username and password to access your accounts. If you haven&apos;t registered for
              online banking, click on the &quot;Enroll Now&quot; button and follow the registration process. If you
              need assistance, our customer support team is available to guide you.
            </p>
          </div>
          <div className="border-accent/10 flex flex-col gap-4 rounded-md border p-4 text-left">
            <h3 className="text-lg font-medium">Are my transactions and personal information secure?</h3>
            <div className="bg-accent/10 h-px w-full"></div>

            <p>
              At Cieltrust, we prioritize the security of your transactions and personal information. We employ
              industry-leading encryption and multi-factor authentication to ensure that your data is protected.
              Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank
              with confidence knowing that we have robust security systems in place.
            </p>
          </div>
          <div className="border-accent/10 flex flex-col gap-4 rounded-md border p-4 text-left">
            <h3 className="text-lg font-medium">What should I do if I forget my password?</h3>
            <div className="bg-accent/10 h-px w-full"></div>

            <p>
              If you forget your password, simply click on the &quot;Forgot Password&quot; link on the login page. You
              will be prompted to enter your registered email address or phone number. Follow the instructions sent to
              your contact method to reset your password securely. If you encounter any issues, our customer support
              team is available 24/7 to assist you.
            </p>
          </div>
        </div>

        <ButtonSecondary onClick={handleExpand}>
          Load All FAQs
          <svg
            className={`${isExpanded ? 'rotate-180' : ''}`}
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.5 8.75L11 14.25L5.5 8.75" stroke="currentColor" strokeWidth="2" />
          </svg>
        </ButtonSecondary>
      </div>
    </>
  );
}
