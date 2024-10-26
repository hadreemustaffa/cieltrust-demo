import Tabs from "./Tabs";
import { ButtonSecondary, ButtonTertiary } from "./Button";

export default function Testimonials() {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">
            Our <span className="text-brand">Testimonials</span>
          </h2>
          <p>
            Discover how Yourbank has transformed lives with innovative digital
            solutions and personalized customer service. See why our clients
            trust us for a secure and prosperous financial journey
          </p>
        </div>

        <Tabs isColumn>
          <ButtonSecondary
            role="tab"
            aria-selected="true"
            tabIndex="0"
            isFullWidth
          >
            For Individuals
          </ButtonSecondary>
          <ButtonTertiary role="tab" isFullWidth>
            For Businesses
          </ButtonTertiary>
        </Tabs>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 text-center">
          <p className="text-lg font-medium">Sara T</p>
          <p>
            Yourbank has been my trusted financial partner for years. Their
            personalized service and innovative digital banking solutions have
            made managing my finances a breeze.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 text-center">
          <p className="text-lg font-medium">John D</p>
          <p>
            I recently started my own business, and Yourbank has been
            instrumental in helping me set up my business accounts and secure
            the financing I needed. Their expert guidance and tailored solutions
            have been invaluable.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 text-center">
          <p className="text-lg font-medium">Emily G</p>
          <p>
            I love the convenience of Yourbank&apos;s mobile banking app. It
            allows me to stay on top of my finances and make transactions on the
            go. The app is user-friendly and secure, giving me peace of mind.
          </p>
        </div>

        <div className="flex flex-row justify-center gap-8">
          <ButtonSecondary>
            {/* arrow-small-icon  */}
            <svg
              style={{ transform: "rotate(180deg)" }}
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.50016 17H26.2085M26.2085 17L17.7085 8.5M26.2085 17L17.7085 25.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonSecondary>

          <ButtonSecondary>
            {/* arrow-small-icon  */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.50016 17H26.2085M26.2085 17L17.7085 8.5M26.2085 17L17.7085 25.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
