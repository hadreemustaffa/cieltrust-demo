import AboutDesktopImg from '/images/illustrations/about-illustration-desktop.png';
import AboutMobileImg from '/images/illustrations/about-illustration-mobile.png';
import AboutLaptopImg from '/images/illustrations/about-illustration-laptop.png';

import PressReleases from '@/components/press-releases';
import Image from '@/components/image';

export default function About() {
  return (
    <>
      <div className="relative flex flex-col lg:text-left">
        <Image
          mobile={AboutMobileImg}
          laptop={AboutLaptopImg}
          desktop={AboutDesktopImg}
          alt="shot of a sunflower and a bright sky"
          className="md:max-h-[500px]"
        />

        <div className="bottom-0 left-0 flex flex-col gap-4 border border-accent/10 bg-background p-8 md:absolute xl:max-w-[85ch]">
          <h1 className="text-3xl font-medium lg:text-5xl">Building a simpler, brighter financial journey for you.</h1>
          <p>
            At CielTrust, we believe in removing barriers to financial success, offering tools and support that make
            banking easy and rewarding so you can focus on what matters most.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start lg:text-left">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:text-left">
          <h1 className="basis-1/2 text-3xl font-medium lg:text-5xl">
            <span className="text-brand">Mission & Vision</span>
          </h1>
          <p className="basis-1/2">
            We envision being a leading force in the industry, driven by innovation, integrity, and inclusivity,
            creating a brighter financial future for individuals and businesses while maintaining a strong commitment to
            customer satisfaction and community development
          </p>
        </div>
        <div className="flex w-full flex-col gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-sm border border-accent/10 p-4 shadow-sm lg:text-left">
            <h3 className="text-xl font-semibold">Mission</h3>
            <p>
              Empowering individuals to take control of their finances by providing intuitive tools and insights that
              simplify budgeting, promote savings, and foster financial well-being.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-sm border border-accent/10 p-4 shadow-sm lg:text-left">
            <h3 className="text-xl font-semibold">Vision</h3>
            <p>
              To create a world where everyone has the confidence and resources to achieve financial freedom, enabling a
              life of stability, security, and opportunity.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <PressReleases />
      </div>
    </>
  );
}
