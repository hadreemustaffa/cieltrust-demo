import FaqSection from "../../components/FaqSection";
import JobOpenings from "../../components/JobOpenings";
import OpenAccountBanner from "../../components/OpenAccountBanner";
import Testimonials from "../../components/Testimonials";

function Careers() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:text-left">
          <h1 className="basis-1/2 text-3xl font-medium lg:text-5xl">
            Challenge Yourself and <span className="text-brand">Transform</span>{" "}
            Banking
          </h1>
          <p className="basis-1/2">
            Step into a career where your talents and ambitions are truly
            valued. At Yourbank, we’re dedicated to creating meaningful
            financial experiences for our customers, and we’re looking for
            bright minds to help us lead the way. Here, you’ll grow
            professionally, gain invaluable insights, and play a key role in
            reshaping the future of banking.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <picture className="border border-accent/10">
            <source
              media="(min-width: 992px)"
              srcSet="../images/illustrations/careers-illustration-2-desktop.png"
              type="image/png"
            />
            <source
              media="(min-width: 576px)"
              srcSet="../images/illustrations/careers-illustration-2-laptop.png"
              type="image/png"
            />
            <img
              src="../images/illustrations/careers-illustration-2-mobile.png"
              className=""
              alt="A person being interviewed for a job"
              loading="lazy"
            />
          </picture>

          <picture className="border border-accent/10">
            <source
              media="(min-width: 992px)"
              srcSet="../images/illustrations/careers-illustration-desktop.png"
              type="image/png"
            />
            <source
              media="(min-width: 576px)"
              srcSet="../images/illustrations/careers-illustration-laptop.png"
              type="image/png"
            />
            <img
              src="../images/illustrations/careers-illustration-mobile.png"
              className=""
              alt="Group photo of office employees"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold">
            Our <span className="text-brand">Values</span>
          </h2>
          <p>
            At Yourbank, our values form the foundation of our organization and
            guide our actions. We believe in upholding the highest standards of
            integrity, delivering exceptional service, and embracing innovation.
            These values define our culture and shape the way we work together
            to achieve our goals.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Integrity</h3>
            <p>
              We conduct ourselves with utmost honesty, transparency, and
              ethical behavior. We believe in doing what is right for our
              customers, colleagues, and stakeholders, even when faced with
              difficult choices.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Customer Centricity</h3>
            <p>
              Our customers are at the heart of everything we do. We are
              dedicated to understanding their needs, providing personalized
              solutions, and delivering exceptional service that exceeds
              expectations.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Collaboration</h3>
            <p>
              We foster a collaborative and inclusive work environment, where
              teamwork and diversity are celebrated. By leveraging the unique
              strengths and perspectives of our employees, we drive innovation
              and achieve greater success together.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:border-l-2 lg:border-l-brand lg:pl-4 lg:text-left">
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p>
              We embrace change and constantly seek innovative solutions to meet
              the evolving needs of our customers. We encourage our employees to
              think creatively, challenge conventions, and explore new ideas to
              drive the future of banking.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold">
            Our <span className="text-brand">Benefits</span>
          </h2>
          <p>
            At Yourbank, we value our employees and are dedicated to their
            well-being and success. We offer a comprehensive range of benefits
            designed to support their personal and professional growth.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.813 2.813a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938h.938v13.125a3.75 3.75 0 0 0 3.75 3.75h1.512l-1.464 4.391a.94.94 0 0 0 .593 1.186.94.94 0 0 0 1.186-.593l.411-1.234h10.524l.411 1.234a.94.94 0 0 0 1.186.593.94.94 0 0 0 .593-1.186l-1.464-4.391H22.5a3.75 3.75 0 0 0 3.75-3.75V4.688h.938a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937H2.813zm7.551 20.625l.625-1.875h8.024l.625 1.875h-9.274zm9.324-15a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v7.5a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-7.5zm-3.75 2.813a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v4.688a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937V11.25zm-3.75 2.813a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v1.875a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-1.875z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                Competitive Compensation
              </h3>
            </div>
            <p>
              We provide a competitive salary package that recognizes the skills
              and expertise of our employees. Yourbank believes in rewarding
              exceptional performance and offering opportunities for financial
              growth.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  fill="currentColor"
                >
                  <path d="M17 1.063A11.69 11.69 0 0 0 5.313 12.75c0 4.322 2.346 8.095 5.83 10.116.971.563 1.579 1.428 1.607 2.298.015.48.35.89.818 1 .498.118 1.005.21 1.52.276.459.059.851-.308.851-.77v-6.603a9.51 9.51 0 0 1-1.327-.243c-.568-.146-.91-.726-.764-1.294s.726-.91 1.294-.764c.593.153 1.216.234 1.86.234s1.267-.081 1.86-.234c.568-.146 1.148.196 1.294.764s-.196 1.148-.764 1.294a9.51 9.51 0 0 1-1.327.243v6.603c0 .462.392.83.851.771.515-.066 1.022-.159 1.52-.276.467-.11.802-.521.818-1 .027-.87.636-1.735 1.607-2.298 3.483-2.021 5.83-5.794 5.83-10.116A11.69 11.69 0 0 0 17 1.063z" />
                  <path
                    d="M12.769 28.191c.109-.576.665-.955 1.242-.846a16.08 16.08 0 0 0 2.989.28c1.022 0 2.022-.096 2.989-.28.576-.109 1.133.269 1.242.846s-.269 1.133-.846 1.242a18.15 18.15 0 0 1-6.771 0c-.576-.109-.955-.665-.846-1.242zm1.049 3.463a1.06 1.06 0 0 1 1.167-.946 19.43 19.43 0 0 0 2.015.105c.681 0 1.353-.035 2.015-.105.584-.061 1.106.363 1.167.946s-.363 1.106-.946 1.167a21.48 21.48 0 0 1-4.471 0 1.06 1.06 0 0 1-.946-1.167z"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Health and Wellness</h3>
            </div>
            <p>
              We prioritize the health and well-being of our employees by
              providing comprehensive medical, dental, and vision insurance
              plans. We also offer wellness programs, gym memberships, and
              resources to support a healthy lifestyle.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <svg
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5454 21.1814C14.5908 21.1814 14.0316 20.644 14.0316 19.6796V18.5637C10.0221 18.2881 6.02625 17.4615 1.88037 15.877V13.6038C6.98089 15.8633 12.0951 16.6624 17.6593 16.6624C23.2372 16.6624 28.3513 15.8633 33.4518 13.6038V15.877C29.3059 17.4615 25.31 18.2881 21.3006 18.5637V19.6796C21.3006 20.644 20.7414 21.1814 19.7867 21.1814H15.5454ZM6.09444 30.3432H29.2377C32.0608 30.3432 33.4518 28.9656 33.4518 26.1412V12.7359C33.4518 9.9115 32.0608 8.53378 29.2377 8.53378H6.09444C3.28506 8.53378 1.88037 9.9115 1.88037 12.7359V26.1412C1.88037 28.9656 3.28506 30.3432 6.09444 30.3432ZM10.7449 9.7324H12.8588V7.29382C12.8588 6.24673 13.4725 5.65431 14.5362 5.65431H20.7959C21.8597 5.65431 22.4598 6.24673 22.4598 7.29382V9.70485H24.5736V7.44537C24.5736 4.85523 23.2234 3.64282 20.7551 3.64282H14.5635C12.2314 3.64282 10.7449 4.85523 10.7449 7.44537V9.7324Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Retirement Planning</h3>
            </div>
            <p>
              Yourbank is committed to helping employees plan for their future.
              We offer a retirement savings plan with a generous employer match
              to help them build a secure financial foundation for the long
              term.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4 lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <div className="flex rounded-md border border-accent/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.125 13.929v2.54c0 1.467 1.189 2.656 2.656 2.656h24.438c1.467 0 2.656-1.189 2.656-2.656v-2.54a4.25 4.25 0 0 0-1.023-2.766l-4.654-5.429a4.25 4.25 0 0 0-3.227-1.484H11.029a4.25 4.25 0 0 0-3.227 1.484l-4.654 5.429a4.25 4.25 0 0 0-1.023 2.766zm8.904-7.554c-.62 0-1.21.271-1.613.742l-3.918 4.57h4.484a4.25 4.25 0 0 1 3.536 1.893l.232.349c.394.591 1.058.946 1.768.946h2.963c.71 0 1.374-.355 1.768-.946l.232-.349a4.25 4.25 0 0 1 3.536-1.892h4.484l-3.918-4.57c-.404-.471-.993-.742-1.613-.742H11.029z"
                  />
                  <path d="M3.984 21.25a1.86 1.86 0 0 0-1.859 1.859V25.5a4.25 4.25 0 0 0 4.25 4.25h21.25a4.25 4.25 0 0 0 4.25-4.25v-2.391a1.86 1.86 0 0 0-1.859-1.859h-5.997a4.25 4.25 0 0 0-3.536 1.892l-.232.349c-.394.591-1.058.946-1.768.946h-2.963c-.71 0-1.374-.355-1.768-.946l-.232-.349a4.25 4.25 0 0 0-3.536-1.892H3.984z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Work-Life Balance</h3>
            </div>
            <p>
              We understand the importance of maintaining a healthy work-life
              balance. Yourbank offers flexible work arrangements, paid time
              off, parental leave, and other programs that support employees in
              managing their personal and professional commitments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <JobOpenings />
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <FaqSection />
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <Testimonials />
      </div>

      <OpenAccountBanner />
    </>
  );
}

export default Careers;
